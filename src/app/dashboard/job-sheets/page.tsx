"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, FileText, Smartphone } from "lucide-react"

const jobSheets = [
  {
    id: "JS-001",
    customer: "Sarah Johnson",
    device: "iPhone 12 Pro",
    issue: "Cracked screen",
    priority: "High",
    status: "In Progress",
    createdDate: "2024-01-15",
    estimatedCost: 150,
    technician: "John Doe",
  },
  {
    id: "JS-002",
    customer: "Mike Chen",
    device: "Samsung Galaxy S21",
    issue: "Battery replacement",
    priority: "Medium",
    status: "Pending",
    createdDate: "2024-01-14",
    estimatedCost: 80,
    technician: "Jane Smith",
  },
  {
    id: "JS-003",
    customer: "Emily Davis",
    device: "iPhone 13",
    issue: "Water damage",
    priority: "High",
    status: "Completed",
    createdDate: "2024-01-12",
    estimatedCost: 200,
    technician: "John Doe",
  },
]

export default function JobSheetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJobSheet, setSelectedJobSheet] = useState<(typeof jobSheets)[0] | null>(null)

  const filteredJobSheets = jobSheets.filter(
    (job) =>
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.device.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default"
      case "In Progress":
        return "secondary"
      case "Pending":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Sheet Management</h1>
          <p className="text-muted-foreground">Create and manage repair job sheets efficiently</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/job-sheets/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Job Sheet
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Sheets</CardTitle>
          <CardDescription>Manage all repair job sheets and track progress</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search job sheets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobSheets.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{job.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{job.customer}</div>
                      <div className="text-sm text-muted-foreground">{job.createdDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <span>{job.device}</span>
                    </div>
                  </TableCell>
                  <TableCell>{job.issue}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(job.priority)}>{job.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(job.status)}>{job.status}</Badge>
                  </TableCell>
                  <TableCell>₹{job.estimatedCost}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedJobSheet(job)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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

      {/* Job Sheet Details Dialog */}
      <Dialog open={!!selectedJobSheet} onOpenChange={() => setSelectedJobSheet(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Job Sheet Details - {selectedJobSheet?.id}</DialogTitle>
            <DialogDescription>Complete information for this repair job</DialogDescription>
          </DialogHeader>
          {selectedJobSheet && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Customer</Label>
                  <p className="text-sm text-muted-foreground">{selectedJobSheet.customer}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Device</Label>
                  <p className="text-sm text-muted-foreground">{selectedJobSheet.device}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Issue</Label>
                  <p className="text-sm text-muted-foreground">{selectedJobSheet.issue}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Priority</Label>
                  <Badge variant={getPriorityColor(selectedJobSheet.priority)}>{selectedJobSheet.priority}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={getStatusColor(selectedJobSheet.status)}>{selectedJobSheet.status}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Estimated Cost</Label>
                  <p className="text-sm text-muted-foreground">₹{selectedJobSheet.estimatedCost}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Created Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedJobSheet.createdDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Technician</Label>
                  <p className="text-sm text-muted-foreground">{selectedJobSheet.technician}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
