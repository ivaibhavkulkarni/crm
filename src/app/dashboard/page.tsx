import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models/User';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Wrench,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
} from 'lucide-react';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const payload = verifyToken(token);
  if (!payload || typeof payload === 'string' || !('id' in payload)) {
    redirect('/auth/login');
  }

  await connectDB();
  const user = await User.findById(payload.id);
  if (!user) {
    redirect('/auth/login');
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome back,<br />
          {fullName}!
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Here's what's happening with your repair shop today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Repairs</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">8</span> completed today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">3</span> critical items
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">₹12,450</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
            <CardDescription className="text-sm">Latest updates from your repair shop</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">iPhone 12 screen replacement completed</p>
                <p className="text-xs text-muted-foreground">Customer: Sarah Johnson • 2 minutes ago</p>
              </div>
              <Badge variant="secondary">Completed</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">New job sheet created</p>
                <p className="text-xs text-muted-foreground">
                  Samsung Galaxy S21 battery replacement • 15 minutes ago
                </p>
              </div>
              <Badge variant="outline">In Progress</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Low stock alert</p>
                <p className="text-xs text-muted-foreground">iPhone 13 Pro screens running low • 1 hour ago</p>
              </div>
              <Badge variant="destructive">Alert</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Payment received</p>
                <p className="text-xs text-muted-foreground">Invoice #INV-001234 paid by Mike Chen • 2 hours ago</p>
              </div>
              <Badge variant="secondary">Paid</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-sm">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create New Job Sheet
            </Button>
            <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add New Customer
            </Button>
            <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
              <Package className="mr-2 h-4 w-4" />
              Update Inventory
            </Button>
            <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              View All Repairs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Repair Status Overview */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Repair Status Overview</CardTitle>
            <CardDescription className="text-sm">Current status of all repairs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">15</span>
                <Progress value={32} className="w-16 sm:w-20" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wrench className="h-4 w-4 text-blue-500" />
                <span className="text-sm">In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">23</span>
                <Progress value={48} className="w-16 sm:w-20" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">9</span>
                <Progress value={19} className="w-16 sm:w-20" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm">Issues</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">1</span>
                <Progress value={2} className="w-16 sm:w-20" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Performance Metrics</CardTitle>
            <CardDescription className="text-sm">Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Average Repair Time</span>
              <span className="text-sm font-medium">2.3 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Customer Satisfaction</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">4.8/5</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Repeat Customers</span>
              <span className="text-sm font-medium">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">On-time Completion</span>
              <span className="text-sm font-medium">94%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}