"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Eye, Edit, Phone, Mail, MapPin } from "lucide-react"

const customers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+91 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    totalRepairs: 5,
    lastVisit: "2024-01-15",
    status: "Active",
    notes: "Prefers text notifications",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+91 (555) 987-6543",
    address: "456 Oak Ave, City, State 12345",
    totalRepairs: 2,
    lastVisit: "2024-01-10",
    status: "Active",
    notes: "Business customer - bulk repairs",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+91 (555) 456-7890",
    address: "789 Pine St, City, State 12345",
    totalRepairs: 8,
    lastVisit: "2024-01-08",
    status: "VIP",
    notes: "Loyal customer since 2020",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof customers)[0] | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          <p className="text-muted-foreground">Manage your customer database and relationships</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Enter customer details to add them to your database.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" type="tel" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Textarea id="address" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea id="notes" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Customer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Database</CardTitle>
          <CardDescription>Search and manage all your customers</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
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
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Repairs</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {customer.address.split(",")[0]}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{customer.totalRepairs} repairs</Badge>
                  </TableCell>
                  <TableCell>{customer.lastVisit}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "VIP" ? "default" : "secondary"}>{customer.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(customer)}>
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

      {/* Customer Details Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>Complete information for {selectedCustomer?.name}</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedCustomer.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={selectedCustomer.status === "VIP" ? "default" : "secondary"}>
                    {selectedCustomer.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Phone</Label>
                <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Address</Label>
                <p className="text-sm text-muted-foreground">{selectedCustomer.address}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Total Repairs</Label>
                <p className="text-sm text-muted-foreground">{selectedCustomer.totalRepairs}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Last Visit</Label>
                <p className="text-sm text-muted-foreground">{selectedCustomer.lastVisit}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Notes</Label>
                <p className="text-sm text-muted-foreground">{selectedCustomer.notes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
