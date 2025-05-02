"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Agent" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Tenant" },
  { id: 3, name: "Admin User", email: "admin@example.com", role: "Admin" },
];

const initialListings = [
  {
    id: 1,
    title: "Luxury Villa",
    location: "Addis Ababa",
    price: "$500,000",
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "Bole",
    price: "$150,000",
  },
  {
    id: 3,
    title: "Townhouse",
    location: "Kazanchis",
    price: "$300,000",
  },
];

export default function Management() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [listings, setListings] = useState(initialListings);
  const [selectedListings, setSelectedListings] = useState([]);

  const toggleUserSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const toggleListingSelect = (id) => {
    setSelectedListings((prev) =>
      prev.includes(id) ? prev.filter((lid) => lid !== id) : [...prev, id]
    );
  };

  const deleteSelectedUsers = () =>
    setUsers((prev) => prev.filter((u) => !selectedUsers.includes(u.id)));

  const deleteSelectedListings = () =>
    setListings((prev) => prev.filter((l) => !selectedListings.includes(l.id)));

  const toggleSelectAll = (type, checked) => {
    if (type === "users") {
      setSelectedUsers(checked ? users.map((u) => u.id) : []);
    } else {
      setSelectedListings(checked ? listings.map((l) => l.id) : []);
    }
  };

  return (
    <div className="p-3 flex flex-col gap-5">
      <h1 className="p-2 text-2xl font-bold">User Management</h1>
      <Card>
        <CardContent>
          <Tabs defaultValue="users">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
            </TabsList>

            {/* USERS */}
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
                    {selectedUsers.length > 0 && (
                      <Button
                        variant="destructive"
                        onClick={deleteSelectedUsers}
                      >
                        Delete Selected
                      </Button>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto rounded-md border">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === users.length}
                            onChange={(e) =>
                              toggleSelectAll("users", e.target.checked)
                            }
                          />
                        </th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y bg-white">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => toggleUserSelect(user.id)}
                            />
                          </td>
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

            {/* LISTINGS */}
            <TabsContent value="listings">
              <div className="space-y-6 mt-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-2xl font-semibold">Listings</h2>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Search listings..."
                      className="w-full md:w-64"
                    />
                    <Button>Add Listing</Button>
                    {selectedListings.length > 0 && (
                      <Button
                        variant="destructive"
                        onClick={deleteSelectedListings}
                      >
                        Delete Selected
                      </Button>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto rounded-md border">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={
                              selectedListings.length === listings.length
                            }
                            onChange={(e) =>
                              toggleSelectAll("listings", e.target.checked)
                            }
                          />
                        </th>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y bg-white">
                      {listings.map((listing) => (
                        <tr key={listing.id}>
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedListings.includes(listing.id)}
                              onChange={() => toggleListingSelect(listing.id)}
                            />
                          </td>
                          <td className="px-4 py-3 font-medium">
                            {listing.title}
                          </td>
                          <td className="px-4 py-3">{listing.location}</td>
                          <td className="px-4 py-3 text-blue-600">
                            {listing.price}
                          </td>
                          <td className="px-4 py-3">
                            <Select defaultValue="active">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="archived">
                                  Archived
                                </SelectItem>
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
