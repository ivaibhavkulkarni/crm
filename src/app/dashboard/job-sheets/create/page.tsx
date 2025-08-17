"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Users, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"

export default function CreateJobSheetPage() {
  const router = useRouter()

  const [customerSearch, setCustomerSearch] = useState("")
  const [customerType, setCustomerType] = useState("existing")
  const [newCustomerData, setNewCustomerData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  })

  // Estimated completion date picker state
  const [estimatedDate, setEstimatedDate] = useState<Date | null>(null)
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(new Date().getMonth())
  const [viewYear, setViewYear] = useState(new Date().getFullYear())
  const datePickerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDateOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const monthLabel = new Date(viewYear, viewMonth).toLocaleString(undefined, { month: "long", year: "numeric" })

  const getCalendarDays = (year: number, month: number): (Date | null)[] => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startWeekday = firstDay.getDay() // 0 (Sun) - 6 (Sat)
    const days: (Date | null)[] = []
    for (let i = 0; i < startWeekday; i++) days.push(null)
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d))
    return days
  }

  const goPrevMonth = () => {
    const prev = new Date(viewYear, viewMonth - 1, 1)
    setViewMonth(prev.getMonth())
    setViewYear(prev.getFullYear())
  }

  const goNextMonth = () => {
    const next = new Date(viewYear, viewMonth + 1, 1)
    setViewMonth(next.getMonth())
    setViewYear(next.getFullYear())
  }

  const handleNewCustomerChange = (field: string, value: string) => {
    setNewCustomerData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // TODO: Integrate API call to create job sheet (and customer when needed)
    router.push("/dashboard/job-sheets")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Job Sheet</h1>
          <p className="text-muted-foreground">Enter customer and device details to create a new job sheet.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Sheet Details</CardTitle>
          <CardDescription>Provide all required information for the service or repair.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Information</h3>
            <Tabs value={customerType} onValueChange={setCustomerType} className="w-full">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="+91 (555) 123-4567"
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Device Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Repair Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="estimated-cost">Estimated Cost (₹)</Label>
                <Input id="estimated-cost" type="number" placeholder="0.00" />
              </div>
              <div>
                <Label htmlFor="estimated-completion-date">Estimated Completion Date</Label>
                <div className="relative" ref={datePickerRef}>
                  <Input
                    id="estimated-completion-date"
                    readOnly
                    value={
                      estimatedDate
                        ? estimatedDate.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" })
                        : "Select date"
                    }
                    onClick={() => setIsDateOpen((o) => !o)}
                    className="cursor-pointer pr-10"
                  />
                  <CalendarDays className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />

                  {isDateOpen && (
                    <div className="absolute z-50 mt-2 w-80 rounded-md border bg-background p-3 shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <button type="button" onClick={goPrevMonth} className="p-1 rounded-md hover:bg-accent">
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <div className="text-sm font-medium">{monthLabel}</div>
                        <button type="button" onClick={goNextMonth} className="p-1 rounded-md hover:bg-accent">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-1">
                        <div className="text-center">Sun</div>
                        <div className="text-center">Mon</div>
                        <div className="text-center">Tue</div>
                        <div className="text-center">Wed</div>
                        <div className="text-center">Thu</div>
                        <div className="text-center">Fri</div>
                        <div className="text-center">Sat</div>
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {getCalendarDays(viewYear, viewMonth).map((day, idx) => {
                          if (!day) return <div key={idx} />
                          const isSelected = !!estimatedDate &&
                            day.getFullYear() === estimatedDate.getFullYear() &&
                            day.getMonth() === estimatedDate.getMonth() &&
                            day.getDate() === estimatedDate.getDate()
                          const isToday = (() => {
                            const t = new Date()
                            return (
                              day.getFullYear() === t.getFullYear() &&
                              day.getMonth() === t.getMonth() &&
                              day.getDate() === t.getDate()
                            )
                          })()
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setEstimatedDate(day)
                                setIsDateOpen(false)
                              }}
                              className={[
                                "h-8 w-8 rounded-md text-sm mx-auto flex items-center justify-center",
                                isSelected
                                  ? "bg-primary text-primary-foreground hover:bg-primary"
                                  : "hover:bg-accent hover:text-accent-foreground",
                                isToday && !isSelected ? "ring-1 ring-ring" : "",
                              ].join(" ")}
                            >
                              {day.getDate()}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

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

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button onClick={handleSubmit}>Create Job Sheet</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


