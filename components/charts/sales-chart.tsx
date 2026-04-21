"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SalesChart({ data }: any) {
  return (
    <div className="w-full rounded-xl border border-border/50 bg-background/60 p-6 shadow-sm hover:shadow-md transition-all">
      
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">
        Sales Trend
      </h2>

      <ResponsiveContainer width="100%" height={420}>
        <LineChart data={data}>
          
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />

          {/* 🔥 Animated line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 4 }}
            isAnimationActive={true}
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}