// components/ui/charts.jsx
import React from "react";

export function ChartContainer({ className, children }) {
  return (
    <div className={`rounded-lg border bg-white p-4 shadow ${className}`}>
      {children}
    </div>
  );
}

export function ChartTooltipContent({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0];
  const data = item.payload;

  return (
    <div className="rounded bg-white p-2 shadow-sm text-sm text-gray-700">
      <p>
        {data.name}: <strong>{data.value}</strong>
      </p>
    </div>
  );
}

export function ChartTooltip(props) {
  return <ChartTooltipContent {...props} />;
}
