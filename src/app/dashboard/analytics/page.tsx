"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Wrench,
  Clock,
  Star,
  Calendar,
  Download,
  BarChart3,
  Activity,
} from "lucide-react"

// Sample data for charts
const revenueData = [
  { month: "Jan", revenue: 12400, repairs: 45, customers: 38 },
  { month: "Feb", revenue: 15600, repairs: 52, customers: 42 },
  { month: "Mar", revenue: 18200, repairs: 61, customers: 48 },
  { month: "Apr", revenue: 16800, repairs: 58, customers: 45 },
  { month: "May", revenue: 21300, repairs: 67, customers: 52 },
  { month: "Jun", revenue: 19500, repairs: 63, customers: 49 },
  { month: "Jul", revenue: 23100, repairs: 72, customers: 58 },
  { month: "Aug", revenue: 25400, repairs: 78, customers: 61 },
  { month: "Sep", revenue: 22800, repairs: 69, customers: 55 },
  { month: "Oct", revenue: 26700, repairs: 81, customers: 64 },
  { month: "Nov", revenue: 24900, repairs: 75, customers: 59 },
  { month: "Dec", revenue: 28300, repairs: 85, customers: 67 },
]

const repairTypeData = [
  { name: "Screen Replacement", value: 35, count: 142, color: "#3b82f6" },
  { name: "Battery Replacement", value: 25, count: 101, color: "#10b981" },
  { name: "Water Damage", value: 15, count: 61, color: "#f59e0b" },
  { name: "Charging Issues", value: 12, count: 49, color: "#ef4444" },
  { name: "Software Issues", value: 8, count: 32, color: "#8b5cf6" },
  { name: "Other", value: 5, count: 20, color: "#6b7280" },
]

const deviceBrandData = [
  { brand: "Apple", repairs: 185, percentage: 45.2 },
  { brand: "Samsung", repairs: 142, percentage: 34.7 },
  { brand: "Google", repairs: 38, percentage: 9.3 },
  { brand: "OnePlus", repairs: 25, percentage: 6.1 },
  { brand: "Other", repairs: 19, percentage: 4.7 },
]

const performanceData = [
  { metric: "Average Repair Time", value: "2.3 days", trend: -8, status: "good" },
  { metric: "Customer Satisfaction", value: "4.8/5", trend: 5, status: "excellent" },
  { metric: "First-Time Fix Rate", value: "94%", trend: 2, status: "excellent" },
  { metric: "Repeat Customer Rate", value: "68%", trend: 12, status: "good" },
  { metric: "On-Time Completion", value: "91%", trend: -3, status: "good" },
  { metric: "Parts Availability", value: "87%", trend: -5, status: "warning" },
]

const technicianData = [
  { name: "John Doe", repairs: 156, rating: 4.9, efficiency: 95 },
  { name: "Jane Smith", repairs: 142, rating: 4.8, efficiency: 92 },
  { name: "Mike Wilson", repairs: 128, rating: 4.7, efficiency: 89 },
  { name: "Sarah Davis", repairs: 98, rating: 4.6, efficiency: 87 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("12months")
  const [selectedTab, setSelectedTab] = useState("overview")

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Activity className="h-4 w-4 text-gray-500" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "warning":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive insights into your repair shop performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹254,800</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +12% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Repairs</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">756</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +8% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">189</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +15% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Repair Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3 days</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                  -8% from last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue and repair volume over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                  repairs: {
                    label: "Repairs",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                      name="Revenue (₹)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="repairs"
                      stroke="var(--color-repairs)"
                      strokeWidth={2}
                      name="Repairs"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Repair Types and Device Brands */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Repair Types Distribution</CardTitle>
                <CardDescription>Most common repair types</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Percentage",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={repairTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {repairTypeData.map((entry, index) => (
                          <Cell key={`cell-₹{index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {repairTypeData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Brands</CardTitle>
                <CardDescription>Repairs by device manufacturer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceBrandData.map((brand, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{brand.brand}</span>
                        <span className="text-muted-foreground">{brand.repairs} repairs</span>
                      </div>
                      <Progress value={brand.percentage} className="h-2" />
                      <div className="text-xs text-muted-foreground text-right">{brand.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          {/* Revenue Analytics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹28,300</div>
                <p className="text-xs text-muted-foreground">December 2024</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹337</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12.5%</div>
                <p className="text-xs text-muted-foreground">Year over year</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Detailed revenue breakdown and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      fill="var(--color-revenue)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          {/* Operational Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Repairs</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">Currently in progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">8 ahead of schedule</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Repairs</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Waiting to start</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground text-red-600">Needs attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Technician Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Technician Performance</CardTitle>
              <CardDescription>Individual technician metrics and efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {technicianData.map((tech, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{tech.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{tech.repairs} repairs</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{tech.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{tech.efficiency}% efficiency</div>
                      <Progress value={tech.efficiency} className="w-20 h-2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Repair Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Repair Volume</CardTitle>
              <CardDescription>Number of repairs completed each month</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  repairs: {
                    label: "Repairs",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="repairs" fill="var(--color-repairs)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {performanceData.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                  {getTrendIcon(metric.trend)}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ₹{getStatusColor(metric.status)}`}>{metric.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {metric.trend > 0 ? "+" : ""}
                    {metric.trend}% from last period
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Customer Satisfaction Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction Trends</CardTitle>
              <CardDescription>Monthly customer satisfaction ratings and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  satisfaction: {
                    label: "Satisfaction",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Jan", satisfaction: 4.5 },
                      { month: "Feb", satisfaction: 4.6 },
                      { month: "Mar", satisfaction: 4.7 },
                      { month: "Apr", satisfaction: 4.6 },
                      { month: "May", satisfaction: 4.8 },
                      { month: "Jun", satisfaction: 4.7 },
                      { month: "Jul", satisfaction: 4.8 },
                      { month: "Aug", satisfaction: 4.9 },
                      { month: "Sep", satisfaction: 4.8 },
                      { month: "Oct", satisfaction: 4.9 },
                      { month: "Nov", satisfaction: 4.8 },
                      { month: "Dec", satisfaction: 4.8 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[4.0, 5.0]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="satisfaction"
                      stroke="var(--color-satisfaction)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-satisfaction)", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>Key performance indicators and benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Repair Success Rate</span>
                      <span className="text-sm text-muted-foreground">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Customer Retention</span>
                      <span className="text-sm text-muted-foreground">84%</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Quality Score</span>
                      <span className="text-sm text-muted-foreground">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-800">Excellent Performance</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Your shop is performing above industry standards</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-blue-800">Growth Opportunity</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      Consider expanding service offerings for increased revenue
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
