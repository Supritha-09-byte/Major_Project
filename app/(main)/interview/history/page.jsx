"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MyHistoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  return (
    <div className="container max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>My Interview History</span>
            <Button onClick={fetchHistory} disabled={loading}>{loading ? "Loading..." : "Refresh"}</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.length === 0 && <p className="text-sm text-muted-foreground">No history found.</p>}
          {items.map((h) => (
            <div key={h.id} className="text-sm border rounded p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{h.topic}</span>
                <span>{new Date(h.createdAt).toLocaleString()}</span>
              </div>
              <p className="mt-1">Q: {h.question}</p>
              <p className="mt-1">Your Answer: {h.answer}</p>
              <p className="mt-1">Feedback: {h.feedback}</p>
              <p className="mt-1">Score: {h.rating}/10</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
