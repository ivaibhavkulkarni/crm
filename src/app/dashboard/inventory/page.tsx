"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Eye, Edit, Package, AlertTriangle, TrendingDown, TrendingUp, Minus } from "lucide-react"

const inventory = [
  {
    id: "INV-001",
    name: "iPhone 12 Pro Screen",
    category: "Screens",
    brand: "Apple",
    model: "iPhone 12 Pro",
    sku: "APL-IP12P-SCR",
    quantity: 5,
    minStock: 10,
    cost: 45.0,
    price: 120.0,
    supplier: "TechParts Inc",
    location: "A1-B2",
    status: "Low Stock",
  },
  {
    id: "INV-002",
    name: "Samsung Galaxy S21 Battery",
    category: "Batteries",
    brand: "Samsung",
    model: "Galaxy S21",
    sku: "SAM-GS21-BAT",
    quantity: 25,
    minStock: 15,
    cost: 25.0,
    price: 65.0,
    supplier: "Mobile Parts Co",
    location: "B2-C1",
    status: "In Stock",
  },
  {
    id: "INV-003",
    name: "iPhone 13 Charging Port",
    category: "Charging Ports",
    brand: "Apple",
    model: "iPhone 13",
    sku: "APL-IP13-CHG",
    quantity: 2,
    minStock: 8,
    cost: 15.0,
    price: 40.0,
    supplier: "TechParts Inc",
    location: "A2-B1",
    status: "Critical",
  },
  {
    id: "INV-004",
    name: "Universal Phone Tools Kit",
    category: "Tools",
    brand: "Generic",
    model: "Universal",
    sku: "GEN-TOOLS-KIT",
    quantity: 50,
    minStock: 20,
    cost: 8.0,
    price: 25.0,
    supplier: "Tool Supply Co",
    location: "C1-D1",
    status: "In Stock",
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<(typeof inventory)[0] | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAdjustDialogOpen, setIsAdjustDialogOpen] = useState(false)

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "default"
      case "Low Stock":
        return "secondary"
      case "Critical":
        return "destructive"
      case "Out of Stock":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Package className="h-4 w-4" />
      case "Low Stock":
        return <TrendingDown className="h-4 w-4" />
      case "Critical":
        return <AlertTriangle className="h-4 w-4" />
      case "Out of Stock":
        return <Minus className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">Track parts, manage stock levels, and monitor inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>Add a new part or tool to your inventory</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Item Name</Label>
                  <Input id="name" placeholder="iPhone 12 Screen" />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="APL-IP12-SCR" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="screens">Screens</SelectItem>
                      <SelectItem value="batteries">Batteries</SelectItem>
                      <SelectItem value="charging-ports">Charging Ports</SelectItem>
                      <SelectItem value="tools">Tools</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" placeholder="Apple" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Initial Quantity</Label>
                  <Input id="quantity" type="number" placeholder="10" />
                </div>
                <div>
                  <Label htmlFor="minStock">Minimum Stock</Label>
                  <Input id="minStock" type="number" placeholder="5" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cost">Cost Price (₹)</Label>
                  <Input id="cost" type="number" step="0.01" placeholder="45.00" />
                </div>
                <div>
                  <Label htmlFor="price">Selling Price (₹)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="120.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input id="supplier" placeholder="TechParts Inc" />
                </div>
                <div>
                  <Label htmlFor="location">Storage Location</Label>
                  <Input id="location" placeholder="A1-B2" />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Inventory Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
            <p className="text-xs text-muted-foreground">Unique SKUs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <TrendingDown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.filter((item) => item.status === "Low Stock").length}</div>
            <p className="text-xs text-muted-foreground">Need reordering</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.filter((item) => item.status === "Critical").length}</div>
            <p className="text-xs text-muted-foreground">Urgent restock needed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{inventory.reduce((sum, item) => sum + item.quantity * item.cost, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">At cost price</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>Manage your parts and tools inventory</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="screens">Screens</SelectItem>
                <SelectItem value="batteries">Batteries</SelectItem>
                <SelectItem value="charging ports">Charging Ports</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.brand} {item.model}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">{item.sku}</code>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.quantity}</div>
                      <div className="text-xs text-muted-foreground">Min: {item.minStock}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(item.status)} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(item.status)}
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>₹{item.cost.toFixed(2)}</TableCell>
                  <TableCell>₹{item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedItem(item)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(item)
                          setIsAdjustDialogOpen(true)
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

      {/* Item Details Dialog */}
      <Dialog open={!!selectedItem && !isAdjustDialogOpen} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
            <DialogDescription>Complete information for {selectedItem?.name}</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedItem.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">SKU</Label>
                  <p className="text-sm text-muted-foreground">{selectedItem.sku}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Brand</Label>
                  <p className="text-sm text-muted-foreground">{selectedItem.brand}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Model</Label>
                  <p className="text-sm text-muted-foreground">{selectedItem.model}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <p className="text-sm text-muted-foreground">{selectedItem.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={getStatusColor(selectedItem.status)}>{selectedItem.status}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Current Stock</Label>
                  <p className="text-sm text-muted-foreground">{selectedItem.quantity}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Minimum Stock</Label>
                  <p className="text-sm text-muted-foreground">{selectedItem.minStock}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Cost Price</Label>
                  <p className="text-sm text-muted-foreground">₹{selectedItem.cost.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Selling Price</Label>
                  <p className="text-sm text-muted-foreground">₹{selectedItem.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Supplier</Label>
                  <p className="text-sm text-muted-foreground">{selectedItem.supplier}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p className="text-sm text-muted-foreground">{selectedItem.location}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Stock Adjustment Dialog */}
      <Dialog open={isAdjustDialogOpen} onOpenChange={setIsAdjustDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Adjust Stock</DialogTitle>
            <DialogDescription>Update stock quantity for {selectedItem?.name}</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Current Stock</Label>
                <p className="text-sm text-muted-foreground">{selectedItem.quantity} units</p>
              </div>
              <div>
                <Label htmlFor="adjustment">Stock Adjustment</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select adjustment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">Add Stock</SelectItem>
                    <SelectItem value="remove">Remove Stock</SelectItem>
                    <SelectItem value="set">Set Exact Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" placeholder="Enter quantity" />
              </div>
              <div>
                <Label htmlFor="reason">Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restock">Restock</SelectItem>
                    <SelectItem value="used">Used in Repair</SelectItem>
                    <SelectItem value="damaged">Damaged</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                    <SelectItem value="correction">Stock Correction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAdjustDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAdjustDialogOpen(false)}>Update Stock</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
