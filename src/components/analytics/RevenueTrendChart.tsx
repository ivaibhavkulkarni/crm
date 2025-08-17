"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts"

type RevenuePoint = { month: string; revenue: number; repairs: number }

export default function RevenueTrendChart({ data }: { data: RevenuePoint[] }) {
  return (
    <ChartContainer
      config={{
        revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
        repairs: { label: "Repairs", color: "hsl(var(--chart-2))" },
      }}
      className="h-[300px]"
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} name="Revenue (₹)" />
        <Line yAxisId="right" type="monotone" dataKey="repairs" stroke="var(--color-repairs)" strokeWidth={2} name="Repairs" />
      </LineChart>
    </ChartContainer>
  )
}


