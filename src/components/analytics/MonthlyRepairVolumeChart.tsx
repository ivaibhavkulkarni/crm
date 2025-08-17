"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

type DataPoint = { month: string; repairs: number }

export default function MonthlyRepairVolumeChart({ data }: { data: DataPoint[] }) {
  return (
    <ChartContainer
      config={{
        repairs: { label: "Repairs", color: "hsl(var(--chart-2))" },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="repairs" fill="var(--color-repairs)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}


