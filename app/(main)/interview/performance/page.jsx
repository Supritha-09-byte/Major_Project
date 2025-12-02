"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function Sparkline({ points, width = 600, height = 140, color = "#10b981" }) {
  if (!points?.length) return <p className="text-sm text-muted-foreground">No data</p>;
  const pad = 12, w = width - pad * 2, h = height - pad * 2;
  const maxY = Math.max(...points.map(p => p.y)) || 10;
  const minY = Math.min(...points.map(p => p.y)) || 0;
  const toX = (i) => (i / Math.max(points.length - 1, 1)) * w + pad;
  const toY = (v) => height - pad - ((v - minY) / Math.max(maxY - minY || 1, 1)) * h;
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(p.y)}`).join(' ');
  return (
    <svg width={width} height={height} className="w-full h-36">
      <path d={d} fill="none" stroke={color} strokeWidth={2} />
    </svg>
  );
}

export default function PerformancePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/history');
        const data = await res.json();
        setItems(data.items || []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const points = useMemo(() => items.slice().reverse().map((h, i) => ({ x: i, y: Number(h.rating || 0) })), [items]);
  const avg = useMemo(() => {
    if (!items.length) return 0;
    const sum = items.reduce((a, h) => a + Number(h.rating || 0), 0);
    return (sum / items.length).toFixed(1);
  }, [items]);
  const best = useMemo(() => Math.max(0, ...items.map(h => Number(h.rating || 0))), [items]);

  return (
    <div className="container max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Performance Chart</span>
            <span className="text-xs text-muted-foreground">{loading ? 'Loading...' : `${items.length} entries`}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded p-3">
              <p className="text-xs text-muted-foreground">Average Score</p>
              <p className="text-2xl font-bold">{avg}/10</p>
            </div>
            <div className="border rounded p-3">
              <p className="text-xs text-muted-foreground">Best Score</p>
              <p className="text-2xl font-bold">{best}/10</p>
            </div>
            <div className="border rounded p-3">
              <p className="text-xs text-muted-foreground">Attempts</p>
              <p className="text-2xl font-bold">{items.length}</p>
            </div>
          </div>
          <Sparkline points={points} />
        </CardContent>
      </Card>
    </div>
  );
}