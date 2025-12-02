"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const topics = ["React", "JavaScript", "Next.js", "Node.js", "Behavioral", "System Design"];

export default function InterviewAgent() {
  const [topic, setTopic] = useState("React");
  const [mode, setMode] = useState("single"); // single | session
  const [question, setQuestion] = useState(null);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  // Gamification: streaks, points, level, badges
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const s = Number(localStorage.getItem("ga-streak") || 0);
      const p = Number(localStorage.getItem("ga-points") || 0);
      const l = Number(localStorage.getItem("ga-level") || 1);
      const b = JSON.parse(localStorage.getItem("ga-badges") || "[]");
      setStreak(s);
      setPoints(p);
      setLevel(l);
      setBadges(Array.isArray(b) ? b : []);
    } catch {}
  }, []);

  const handleGenerateQuestion = async () => {
    setIsLoadingQuestion(true);
    if (mode === "single") {
      setQuestion(null);
      setSessionQuestions([]);
      setCurrentIndex(0);
    }
    setAnswer("");
    setEvaluation(null);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate-question", topic }),
      });
      const data = await response.json();
      if (response.ok) {
        if (mode === "single") {
          setQuestion(data);
        } else {
          setSessionQuestions((prev) => {
            const next = [...prev, data];
            setCurrentIndex(next.length - 1);
            setQuestion(next[next.length - 1]);
            return next;
          });
        }
        if (data?.fallback) {
          setNotice(
            "OpenAI rate limit hit: showing a curated fallback question. Try again shortly for a fresh AI question."
          );
        }
      } else {
        setError(data?.error || "Failed to generate question.");
        setNotice(null);
      }
    } catch (error) {
      console.error("Error generating question:", error);
      setError("Network or server error while generating question.");
      setNotice(null);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const handleEvaluateAnswer = async () => {
    if (!question || !answer) return;
    setIsEvaluating(true);
    setEvaluation(null);
    setError(null);
    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "evaluate-answer", question: question.question, answer }),
      });
      const data = await response.json();
      if (response.ok) {
        setEvaluation(data);
        if (data?.fallback) {
          setNotice(
            "OpenAI rate limit hit: providing heuristic feedback until your quota resets."
          );
        } else if (!question?.fallback) {
          setNotice(null);
        }
        // Save history (non-blocking)
        try {
          fetch("/api/history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              topic: question.topic,
              question: question.question,
              answer,
              feedback: data.feedback,
              rating: data.rating,
            }),
          });
        } catch {}
        // Gamification updates
        const rating = Number(data?.rating || 0);
        const newPoints = points + rating;
        const newLevel = Math.floor(newPoints / 50) + 1;
        setPoints(newPoints);
        setLevel(newLevel);

        // Day-based streak
        try {
          const todayStr = new Date().toISOString().split("T")[0];
          const lastPractice = localStorage.getItem("ga-last-practice");
          if (lastPractice) {
            const d1 = new Date(lastPractice);
            const d2 = new Date(todayStr);
            const diffDays = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) setStreak((s) => s + 1);
            else if (diffDays !== 0) setStreak(1);
          } else {
            setStreak(1);
          }
          localStorage.setItem("ga-last-practice", todayStr);
        } catch {}

        // Badges
        setBadges((prev) => {
          const setB = new Set(prev);
          if (rating >= 9) setB.add("Top Answer");
          if (newPoints >= 100) setB.add("Century Points");
          if (streak >= 3) setB.add("3-Day Streak");
          const arr = Array.from(setB);
          try { localStorage.setItem("ga-badges", JSON.stringify(arr)); } catch {}
          return arr;
        });

        // Persist locally
        try {
          localStorage.setItem("ga-streak", String(streak));
          localStorage.setItem("ga-points", String(newPoints));
          localStorage.setItem("ga-level", String(newLevel));
        } catch {}
      } else {
        setError(data?.error || "Failed to evaluate answer.");
        setNotice(null);
      }
    } catch (error) {
      console.error("Error evaluating answer:", error);
      setError("Network or server error while evaluating answer.");
      setNotice(null);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Interview Agent</span>
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/30">Level {level}</span>
            <span className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/30">Points {points}</span>
            <span className="px-2 py-1 rounded bg-green-500/10 border border-green-500/30">Streak {streak}🔥</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Label htmlFor="topic-select">Select a topic:</Label>
          <Select onValueChange={setTopic} defaultValue={topic}>
            <SelectTrigger id="topic-select" className="w-[180px]">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label htmlFor="mode-select">Mode:</Label>
          <Select onValueChange={setMode} defaultValue={mode}>
            <SelectTrigger id="mode-select" className="w-[160px]">
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="session">Session</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateQuestion} disabled={isLoadingQuestion}>
            {isLoadingQuestion ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Question
          </Button>
        </div>

        {question && (
          <Card>
            <CardContent className="pt-6">
              <p className="font-semibold">{question.topic} Question {mode === "session" ? `(${currentIndex + 1}/${Math.max(sessionQuestions.length, 1)})` : ""}:</p>
              <p>{question.question}</p>
              {question.fallback ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  
                </p>
              ) : null}
              {mode === "session" && (
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAnswer("");
                      setEvaluation(null);
                      handleGenerateQuestion();
                    }}
                  >
                    Next Question
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSessionQuestions([]);
                      setCurrentIndex(0);
                      setQuestion(null);
                      setAnswer("");
                      setEvaluation(null);
                    }}
                  >
                    End Session
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {question && (
          <div className="space-y-2">
            <Label htmlFor="answer">Your Answer:</Label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={5}
            />
            <Button onClick={handleEvaluateAnswer} disabled={isEvaluating || !answer.trim()}>
              {isEvaluating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Evaluate Answer
            </Button>
          </div>
        )}

        {evaluation && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Evaluation</span>
                {badges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {badges.map((b) => (
                      <span key={b} className="text-xs px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30">🏅 {b}</span>
                    ))}
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">Feedback:</p>
              <p>{evaluation.feedback}</p>
              <p className="font-semibold mt-4">Rating:</p>
              <p>{evaluation.rating} / 10</p>
            </CardContent>
          </Card>
        )}

        {notice && (
          <Card className="border-yellow-500/60 bg-yellow-500/5">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-yellow-600">Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-yellow-700">{notice}</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-red-500">
            <CardHeader>
              <CardTitle className="text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
