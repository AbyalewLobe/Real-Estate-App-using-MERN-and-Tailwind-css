import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
export default function Management() {
  return (
    <div className="p-3 flex flex-col gap-5">
      <h1 className="p-2 text-2xl font-bold">User Management</h1>

      <Card>
        <CardContent>
          <Tabs defaultValue="users">
            <TabsList className="flex justify-between">
              <TabsTrigger value="users">Users </TabsTrigger>
              <TabsTrigger value="listings">Listings </TabsTrigger>
              <TabsTrigger value="profile">Admin Profile</TabsTrigger>
              <TabsTrigger value="others">Other Sections</TabsTrigger>
            </TabsList>
            {/* //userManagement */}
            <TabsContent value="users">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-2xl font-semibold">Users</h2>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Search users..."
                      className="w-full md:w-64"
                    />
                    <Button>Add User</Button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-md border">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y bg-white">
                      {[
                        {
                          name: "John Doe",
                          email: "john@example.com",
                          role: "Agent",
                        },
                        {
                          name: "Jane Smith",
                          email: "jane@example.com",
                          role: "Tenant",
                        },
                        {
                          name: "Admin User",
                          email: "admin@example.com",
                          role: "Admin",
                        },
                      ].map((user, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 font-medium">{user.name}</td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">{user.role}</td>
                          <td className="px-4 py-3">
                            <Select defaultValue="active">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">
                                  Inactive
                                </SelectItem>
                                <SelectItem value="banned">Banned</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-4 py-3 text-right space-x-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="destructive">
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            {/* Listing Management */}
            <TabsContent value="listings">
              <div className="mt-4 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-2xl font-semibold">Listings</h2>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Search listings..."
                      className="w-full md:w-64"
                    />
                    <Button>Add Listing</Button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-md border">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y bg-white">
                      <tr>
                        <td className="px-4 py-3 font-medium">Luxury Villa</td>
                        <td className="px-4 py-3">Addis Ababa</td>
                        <td className="px-4 py-3 text-blue-600">$500,000</td>
                        <td className="px-4 py-3">
                          <Select defaultValue="active">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            Delete
                          </Button>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-4 py-3 font-medium">
                          Modern Apartment
                        </td>
                        <td className="px-4 py-3">Bole</td>
                        <td className="px-4 py-3 text-blue-600">$150,000</td>
                        <td className="px-4 py-3">
                          <Select defaultValue="active">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            Delete
                          </Button>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-4 py-3 font-medium">Townhouse</td>
                        <td className="px-4 py-3">Kazanchis</td>
                        <td className="px-4 py-3 text-blue-600">$300,000</td>
                        <td className="px-4 py-3">
                          <Select defaultValue="active">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
