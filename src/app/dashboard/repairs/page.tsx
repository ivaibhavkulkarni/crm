"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Eye, Edit, Clock, CheckCircle, AlertTriangle, Wrench, Calendar } from "lucide-react"

const repairs = [
  {
    id: "JS-001",
    customer: "Sarah Johnson",
    device: "iPhone 12 Pro",
    issue: "Cracked screen",
    status: "In Progress",
    progress: 75,
    startDate: "2024-01-15",
    estimatedCompletion: "2024-01-17",
    technician: "John Doe",
    priority: "High",
    cost: 150,
    notes: "Screen ordered, waiting for delivery",
  },
  {
    id: "JS-002",
    customer: "Mike Chen",
    device: "Samsung Galaxy S21",
    issue: "Battery replacement",
    status: "Pending",
    progress: 0,
    startDate: "2024-01-14",
    estimatedCompletion: "2024-01-16",
    technician: "Jane Smith",
    priority: "Medium",
    cost: 80,
    notes: "Waiting for customer approval",
  },
  {
    id: "JS-003",
    customer: "Emily Davis",
    device: "iPhone 13",
    issue: "Water damage",
    status: "Completed",
    progress: 100,
    startDate: "2024-01-12",
    estimatedCompletion: "2024-01-14",
    technician: "John Doe",
    priority: "High",
    cost: 200,
    notes: "Successfully repaired, customer notified",
  },
  {
    id: "JS-004",
    customer: "Alex Wilson",
    device: "Google Pixel 6",
    issue: "Charging port repair",
    status: "On Hold",
    progress: 25,
    startDate: "2024-01-13",
    estimatedCompletion: "2024-01-18",
    technician: "Mike Wilson",
    priority: "Low",
    cost: 60,
    notes: "Waiting for replacement part",
  },
]

export default function RepairsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRepair, setSelectedRepair] = useState<(typeof repairs)[0] | null>(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

  const filteredRepairs = repairs.filter((repair) => {
    const matchesSearch =
      repair.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.device.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || repair.status.toLowerCase().replace(" ", "-") === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default"
      case "In Progress":
        return "secondary"
      case "Pending":
        return "outline"
      case "On Hold":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />
      case "In Progress":
        return <Wrench className="h-4 w-4" />
      case "Pending":
        return <Clock className="h-4 w-4" />
      case "On Hold":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Repair Tracking</h1>
          <p className="text-muted-foreground">Monitor and manage all ongoing repairs</p>
        </div>
      </div>

      {/* Status Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repairs.filter((r) => r.status === "Pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting start</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Wrench className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repairs.filter((r) => r.status === "In Progress").length}</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Hold</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repairs.filter((r) => r.status === "On Hold").length}</div>
            <p className="text-xs text-muted-foreground">Waiting for parts/approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repairs.filter((r) => r.status === "Completed").length}</div>
            <p className="text-xs text-muted-foreground">Ready for pickup</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Repairs</CardTitle>
          <CardDescription>Track progress and manage repair status</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search repairs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Repair ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Device & Issue</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepairs.map((repair) => (
                <TableRow key={repair.id}>
                  <TableCell>
                    <div className="font-medium">{repair.id}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{repair.customer}</div>
                      <div className="text-sm text-muted-foreground">Started: {repair.startDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{repair.device}</div>
                      <div className="text-sm text-muted-foreground">{repair.issue}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Progress value={repair.progress} className="w-20" />
                      <span className="text-xs text-muted-foreground">{repair.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(repair.status)} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(repair.status)}
                      {repair.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{repair.technician}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">{repair.estimatedCompletion}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedRepair(repair)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedRepair(repair)
                          setIsUpdateDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Repair Details Dialog */}
      <Dialog open={!!selectedRepair && !isUpdateDialogOpen} onOpenChange={() => setSelectedRepair(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Repair Details - {selectedRepair?.id}</DialogTitle>
            <DialogDescription>Complete information for this repair job</DialogDescription>
          </DialogHeader>
          {selectedRepair && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Customer</Label>
                  <p className="text-sm text-muted-foreground">{selectedRepair.customer}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Device</Label>
                  <p className="text-sm text-muted-foreground">{selectedRepair.device}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Issue</Label>
                <p className="text-sm text-muted-foreground">{selectedRepair.issue}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={getStatusColor(selectedRepair.status)} className="flex items-center gap-1 w-fit">
                    {getStatusIcon(selectedRepair.status)}
                    {selectedRepair.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Progress</Label>
                  <div className="flex items-center space-x-2">
                    <Progress value={selectedRepair.progress} className="w-20" />
                    <span className="text-sm">{selectedRepair.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Technician</Label>
                  <p className="text-sm text-muted-foreground">{selectedRepair.technician}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Cost</Label>
                  <p className="text-sm text-muted-foreground">₹{selectedRepair.cost}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Start Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedRepair.startDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Due Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedRepair.estimatedCompletion}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Notes</Label>
                <p className="text-sm text-muted-foreground">{selectedRepair.notes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Repair Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Repair - {selectedRepair?.id}</DialogTitle>
            <DialogDescription>Update the status and progress of this repair</DialogDescription>
          </DialogHeader>
          {selectedRepair && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={selectedRepair.status.toLowerCase().replace(" ", "-")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input id="progress" type="number" min="0" max="100" defaultValue={selectedRepair.progress} />
                </div>
              </div>
              <div>
                <Label htmlFor="technician">Technician</Label>
                <Select defaultValue={selectedRepair.technician.toLowerCase().replace(" ", "-")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Update Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add notes about the repair progress..."
                  defaultValue={selectedRepair.notes}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsUpdateDialogOpen(false)}>Update Repair</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
