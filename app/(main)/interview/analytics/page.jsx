"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Tiny helpers to render simple charts without external deps
function SvgLineChart({ points, width = 600, height = 160, color = "#8b5cf6" }) {
  if (!points || points.length === 0) return <p className="text-sm text-muted-foreground">No data</p>;
  const maxY = Math.max(...points.map((p) => p.y)) || 10;
  const minY = Math.min(...points.map((p) => p.y)) || 0;
  const pad = 16;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const toX = (i) => (i / Math.max(points.length - 1, 1)) * w + pad;
  const toY = (v) => height - pad - ((v - minY) / Math.max(maxY - minY || 1, 1)) * h;
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(p.y)}`).join(" ");
  return (
    <svg width={width} height={height} className="w-full h-40">
      <path d={d} fill="none" stroke={color} strokeWidth={2} />
    </svg>
  );
}

function SvgBarChart({ data, width = 600, height = 160, color = "#22d3ee" }) {
  if (!data || data.length === 0) return <p className="text-sm text-muted-foreground">No data</p>;
  const max = Math.max(...data.map((d) => d.value)) || 1;
  const pad = 8;
  const barW = (width - pad * 2) / data.length;
  return (
    <svg width={width} height={height} className="w-full h-40">
      {data.map((d, i) => {
        const h = (d.value / max) * (height - pad * 2);
        return (
          <g key={d.label}>
            <rect x={pad + i * barW} y={height - pad - h} width={barW - 4} height={h} fill={color} />
            <text x={pad + i * barW + (barW - 4) / 2} y={height - 2} textAnchor="middle" fontSize="10" fill="#9CA3AF">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function SvgPieChart({ data, size = 160 }) {
  if (!data || data.length === 0) return <p className="text-sm text-muted-foreground">No data</p>;
  const total = data.reduce((a, d) => a + d.value, 0) || 1;
  const colors = ["#60a5fa", "#34d399", "#f472b6", "#f59e0b", "#a78bfa", "#22d3ee", "#f87171"];
  const cx = size / 2, cy = size / 2, r = size / 2 - 6;
  let angle = -Math.PI / 2;
  const arcs = data.map((d, i) => {
    const pct = d.value / total;
    const a2 = angle + pct * Math.PI * 2;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy + r * Math.sin(a2);
    const largeArc = pct > 0.5 ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    angle = a2;
    return { path, color: colors[i % colors.length], label: d.label, value: d.value };
  });
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size}>
        {arcs.map((a, i) => (
          <path key={i} d={a.path} fill={a.color} />
        ))}
      </svg>
      <div className="text-xs space-y-1">
        {arcs.map((a, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: a.color }} />
            <span>{a.label} — {a.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InterviewAnalyticsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
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
    load();
  }, []);

  const linePoints = useMemo(() => {
    return (items || []).slice().reverse().map((h, i) => ({ x: i, y: Number(h.rating || 0) }));
  }, [items]);

  const topicPie = useMemo(() => {
    const acc = {};
    for (const h of items) {
      acc[h.topic] = (acc[h.topic] || 0) + 1;
    }
    return Object.entries(acc).map(([label, value]) => ({ label, value }));
  }, [items]);

  const difficultyBars = useMemo(() => {
    // difficulty not stored in InterviewHistory; infer via keywords in question if present
    // fallback to buckets by rating ranges
    const buckets = { Beginner: 0, Intermediate: 0, Advanced: 0 };
    for (const h of items) {
      const r = Number(h.rating || 0);
      if (r <= 4) buckets.Beginner += 1;
      else if (r <= 7) buckets.Intermediate += 1;
      else buckets.Advanced += 1;
    }
    return Object.entries(buckets).map(([label, value]) => ({ label, value }));
  }, [items]);

  const scoreBars = useMemo(() => {
    // score breakdown histogram (1-10)
    const bucket = Array.from({ length: 10 }, (_, i) => ({ label: String(i + 1), value: 0 }));
    for (const h of items) {
      const r = Math.max(1, Math.min(10, Number(h.rating || 0)));
      bucket[r - 1].value += 1;
    }
    return bucket;
  }, [items]);

  // Performance-specific charts
  const movingAvgPoints = useMemo(() => {
    const ratings = (items || []).slice().reverse().map((h) => Number(h.rating || 0));
    const window = 5; // 5-sample moving average
    const pts = ratings.map((_, i) => {
      const start = Math.max(0, i - window + 1);
      const slice = ratings.slice(start, i + 1);
      const avg = slice.reduce((a, b) => a + b, 0) / Math.max(slice.length, 1);
      return { x: i, y: Number(avg.toFixed(2)) };
    });
    return pts;
  }, [items]);

  const dailyCounts = useMemo(() => {
    const map = new Map();
    for (const h of items) {
      const d = new Date(h.createdAt);
      const key = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,"0")}-${d.getDate().toString().padStart(2,"0")}`;
      map.set(key, (map.get(key) || 0) + 1);
    }
    const arr = Array.from(map.entries()).sort((a,b) => (a[0] > b[0] ? 1 : -1));
    return arr.map(([label, value]) => ({ label, value }));
  }, [items]);

  return (
    <div className="container max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Interview Analytics</span>
            <span className="text-xs text-muted-foreground">{loading ? "Loading..." : `${items.length} entries`}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium mb-2">Progress-over-time (scores)</p>
            <SvgLineChart points={linePoints} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Topic-wise performance (count)</p>
            <SvgPieChart data={topicPie} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Difficulty-level distribution</p>
            <SvgBarChart data={difficultyBars} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Score breakdown (1-10)</p>
            <SvgBarChart data={scoreBars} color="#f59e0b" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Performance Charts</span>
            <span className="text-xs text-muted-foreground">Trend & activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium mb-2">Moving average score (window=5)</p>
            <SvgLineChart points={movingAvgPoints} color="#10b981" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Daily activity (questions evaluated)</p>
            <SvgBarChart data={dailyCounts} color="#3b82f6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}