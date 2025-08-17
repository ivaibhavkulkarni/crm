"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"

type RepairType = { name: string; value: number; count: number; color: string }

export default function RepairTypeDistribution({ data }: { data: RepairType[] }) {
  return (
    <ChartContainer
      config={{
        value: { label: "Percentage", color: "hsl(var(--chart-1))" },
      }}
      className="h-[250px]"
    >
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  )
}


