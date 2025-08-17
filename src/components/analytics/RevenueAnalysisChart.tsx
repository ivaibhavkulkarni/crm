"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"

type RevenuePoint = { month: string; revenue: number; repairs: number }

export default function RevenueAnalysisChart({ data }: { data: RevenuePoint[] }) {
  return (
    <ChartContainer
      config={{
        revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
      }}
      className="h-[400px]"
    >
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="revenue" stroke="var(--color-revenue)" fill="var(--color-revenue)" fillOpacity={0.3} />
      </AreaChart>
    </ChartContainer>
  )
}


