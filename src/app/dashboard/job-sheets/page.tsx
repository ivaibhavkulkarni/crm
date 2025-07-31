"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, Eye, Edit, FileText, Smartphone, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedJobSheet, setSelectedJobSheet] = useState<(typeof jobSheets)[0] | null>(null)

  const [customerSearch, setCustomerSearch] = useState("")

  const [customerType, setCustomerType] = useState("existing")
  const [newCustomerData, setNewCustomerData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  })

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

  const handleNewCustomerChange = (field: string, value: string) => {
    setNewCustomerData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setNewCustomerData({
      name: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    })
    setCustomerType("existing")
  }

  const handleDialogClose = () => {
    setIsCreateDialogOpen(false)
    resetForm()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Sheet Management</h1>
          <p className="text-muted-foreground">Create and manage repair job sheets efficiently</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Job Sheet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Job Sheet</DialogTitle>
              <DialogDescription>Fill in the details to create a new repair job sheet.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Customer Information - Tabbed Interface */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Customer Information</h3>
                <Tabs defaultValue="existing" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="existing">Select Existing</TabsTrigger>
                    <TabsTrigger value="new">Create New</TabsTrigger>
                  </TabsList>

                  <TabsContent value="existing" className="space-y-4">
                    <div>
                      <Label htmlFor="customer-search">Search Customer</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="customer-search"
                          placeholder="Search by name, phone, or email..."
                          value={customerSearch}
                          onChange={(e) => setCustomerSearch(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="existing-customer">Customer</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select customer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sarah">Sarah Johnson - (555) 123-4567</SelectItem>
                            <SelectItem value="mike">Mike Chen - (555) 987-6543</SelectItem>
                            <SelectItem value="emily">Emily Davis - (555) 456-7890</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="existing-phone">Phone Number</Label>
                        <Input id="existing-phone" placeholder="Auto-filled from customer" disabled />
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>Can't find the customer? Switch to "Create New" tab to add them.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="new" className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <p className="text-sm text-blue-800">
                          Creating a new customer will automatically add them to your customer database.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="new-customer-name">Full Name *</Label>
                        <Input
                          id="new-customer-name"
                          placeholder="John Doe"
                          value={newCustomerData.name}
                          onChange={(e) => handleNewCustomerChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-customer-phone">Phone Number *</Label>
                        <Input
                          id="new-customer-phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={newCustomerData.phone}
                          onChange={(e) => handleNewCustomerChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="new-customer-email">Email Address</Label>
                      <Input
                        id="new-customer-email"
                        type="email"
                        placeholder="john@example.com"
                        value={newCustomerData.email}
                        onChange={(e) => handleNewCustomerChange("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-customer-address">Address</Label>
                      <Textarea
                        id="new-customer-address"
                        placeholder="123 Main St, City, State 12345"
                        rows={2}
                        value={newCustomerData.address}
                        onChange={(e) => handleNewCustomerChange("address", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-customer-notes">Customer Notes</Label>
                      <Textarea
                        id="new-customer-notes"
                        placeholder="Any special notes about the customer..."
                        rows={2}
                        value={newCustomerData.notes}
                        onChange={(e) => handleNewCustomerChange("notes", e.target.value)}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Device Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Device Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="samsung">Samsung</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="oneplus">OnePlus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="e.g., iPhone 12 Pro" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="imei">IMEI/Serial Number</Label>
                    <Input id="imei" placeholder="Device IMEI or serial" />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" placeholder="Device color" />
                  </div>
                </div>
              </div>

              {/* Issue Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Issue Details</h3>
                <div>
                  <Label htmlFor="issue">Primary Issue</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="screen">Screen Damage</SelectItem>
                      <SelectItem value="battery">Battery Issues</SelectItem>
                      <SelectItem value="water">Water Damage</SelectItem>
                      <SelectItem value="charging">Charging Problems</SelectItem>
                      <SelectItem value="software">Software Issues</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea id="description" placeholder="Describe the issue in detail..." rows={3} />
                </div>
                <div>
                  <Label htmlFor="symptoms">Symptoms Checklist</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cracked-screen" />
                      <Label htmlFor="cracked-screen" className="text-sm">
                        Cracked Screen
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="no-display" />
                      <Label htmlFor="no-display" className="text-sm">
                        No Display
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="no-power" />
                      <Label htmlFor="no-power" className="text-sm">
                        No Power
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="water-damage" />
                      <Label htmlFor="water-damage" className="text-sm">
                        Water Damage
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Repair Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Repair Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="technician">Assigned Technician</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select technician" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="jane">Jane Smith</SelectItem>
                        <SelectItem value="mike">Mike Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="estimated-cost">Estimated Cost (₹)</Label>
                    <Input id="estimated-cost" type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="estimated-time">Estimated Time (hours)</Label>
                    <Input id="estimated-time" type="number" placeholder="2" />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <div>
                  <Label htmlFor="customer-notes">Customer Notes</Label>
                  <Textarea id="customer-notes" placeholder="Any special instructions from customer..." rows={2} />
                </div>
                <div>
                  <Label htmlFor="internal-notes">Internal Notes</Label>
                  <Textarea id="internal-notes" placeholder="Internal notes for technicians..." rows={2} />
                </div>
              </div>
            </div>
            {/* Summary Section */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">Summary</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                {customerType === "new" ? (
                  <>
                    <p>✓ New customer will be created: {newCustomerData.name || "Not specified"}</p>
                    <p>✓ Job sheet will be created and linked to new customer</p>
                    <p>✓ Customer will be added to your database</p>
                  </>
                ) : (
                  <>
                    <p>✓ Job sheet will be created for existing customer</p>
                    <p>✓ Customer information will be auto-populated</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button onClick={handleDialogClose}>
                {customerType === "new" ? "Create Job Sheet & Customer" : "Create Job Sheet"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
