"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GamificationSyncPage() {
  const [status, setStatus] = useState("");

  const sync = async () => {
    try {
      const userId = null; // TODO: plug actual user id when auth available
      const streak = Number(localStorage.getItem("ga-streak") || 0);
      const points = Number(localStorage.getItem("ga-points") || 0);
      const level = Number(localStorage.getItem("ga-level") || 1);
      const badges = JSON.parse(localStorage.getItem("ga-badges") || "[]");
      const res = await fetch("/api/gamification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, streak, points, level, badges }),
      });
      if (!res.ok) throw new Error("Sync failed");
      setStatus("Synced!");
    } catch (e) {
      setStatus("Failed to sync");
    }
  };

  return (
    <div className="container max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Gamification Sync</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">Sync local streak, points, level, badges to server.</p>
          <Button onClick={sync}>Sync Now</Button>
          {status && <p className="mt-3 text-sm">{status}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
