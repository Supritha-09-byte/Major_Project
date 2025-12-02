import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export const runtime = "edge";

const evaluationParameters = {
  type: "object",
  properties: {
    feedback: {
      type: "string",
      description: "Constructive feedback on the user's answer.",
    },
    rating: {
      type: "number",
      minimum: 1,
      maximum: 10,
      description: "A rating of the answer on a scale of 1 to 10.",
    },
  },
  required: ["feedback", "rating"],
};

const fallbackQuestions = {
  "React": "Explain the difference between controlled and uncontrolled components in React. When would you use each?",
  "JavaScript": "What is the event loop in JavaScript? Describe how it handles asynchronous tasks.",
  "Next.js": "How do Server Components differ from Client Components in Next.js? Give a practical example.",
  "Node.js": "Describe how you would implement streaming in Node.js with backpressure handling.",
  "Behavioral": "Tell me about a time you resolved a conflict within a team. What did you learn?",
  "System Design": "Design a URL shortener. Discuss data model, scaling, and handling high read/write traffic.",
  "default": "Walk me through a recent project you are proud of. What was the problem, how did you solve it, and what was the impact?",
};

export async function POST(req) {
  try {
    const { action, topic, question, answer } = await req.json();

    if (action === "generate-question") {
      const questionData = await generateQuestion(topic);
      return jsonResponse(questionData);
    }

    if (action === "evaluate-answer") {
      if (!question || !answer) {
        return jsonResponse(
          { error: "Question and answer are required for evaluation." },
          400
        );
      }
      const evaluationData = await evaluateAnswer(question, answer);
      return jsonResponse(evaluationData);
    }

    return jsonResponse({ error: "Invalid action." }, 400);
  } catch (error) {
    console.error(error);
    if (isRateLimitError(error)) {
      return jsonResponse(
        {
          error: "OpenAI rate limit reached. Showing fallback content.",
          fallback: true,
          fallbackReason: "rate-limit",
        },
        200
      );
    }
    const status =
      error?.status ?? error?.response?.status ?? error?.cause?.response?.status ?? 500;
    const message = error?.message || "An error occurred.";
    return jsonResponse({ error: message }, status);
  }
}

async function generateQuestion(topic = "general") {
  const model = new ChatOpenAI({
    temperature: 0.7,
    modelName: "gpt-3.5-turbo",
  });

  const prompt = PromptTemplate.fromTemplate(
    "Generate a {topic} interview question. The question should be suitable for a software engineering role."
  );

  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  try {
    const question = await retryInvoke(() => chain.invoke({ topic }));
    return { question, topic, fallback: false };
  } catch (error) {
    if (!isRateLimitError(error)) {
      throw error;
    }
    const fallbackQuestion = fallbackQuestions[topic] || fallbackQuestions["default"];
    return {
      question: fallbackQuestion,
      topic,
      fallback: true,
      fallbackReason: "rate-limit",
    };
  }
}

async function evaluateAnswer(question, answer) {
  // Use structured output to avoid .bind compatibility issues
  const model = new ChatOpenAI({
    temperature: 0.2,
    modelName: "gpt-3.5-turbo",
  }).withStructuredOutput(evaluationParameters);

  const prompt = PromptTemplate.fromTemplate(
    `Evaluate the following answer to the interview question.
    Provide constructive feedback and a rating from 1 to 10.
    Question: {question}
    Answer: {answer}`
  );

  const chain = prompt.pipe(model);

  try {
    const result = await retryInvoke(() => chain.invoke({ question, answer }));
    if (result && typeof result === "object" && result.feedback && typeof result.rating === "number") {
      return { feedback: result.feedback, rating: result.rating, fallback: false };
    }
    return { feedback: "Could not evaluate the answer.", rating: 0, fallback: false };
  } catch (error) {
    if (!isRateLimitError(error)) {
      throw error;
    }
    const length = (answer || "").trim().length;
    const rating = Math.max(1, Math.min(10, Math.round(length / 120))) || 1;
    return {
      feedback:
        "Rate limited: using a heuristic evaluation. Structure your answer with a clear opening, 2-3 key points, and a concise closing example to improve your score.",
      rating,
      fallback: true,
      fallbackReason: "rate-limit",
    };
  }
}

async function retryInvoke(fn, { retries = 3, baseDelayMs = 800 } = {}) {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (!shouldRetry(error) || attempt > retries) {
        throw error;
      }
      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

function shouldRetry(error) {
  return isRateLimitError(error) || isServerError(error);
}

function isServerError(error) {
  const status = error?.status ?? error?.response?.status ?? error?.cause?.response?.status;
  return typeof status === "number" && status >= 500 && status < 600;
}

function isRateLimitError(error) {
  const status = error?.status ?? error?.response?.status ?? error?.cause?.response?.status;
  if (status === 429) {
    return true;
  }
  const code = error?.error?.code ?? error?.data?.error?.code;
  const message =
    error?.message ?? error?.error?.message ?? error?.data?.error?.message ?? "";
  const combined = `${code ?? ""} ${message}`.toLowerCase();
  return combined.includes("rate limit") || combined.includes("quota");
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
