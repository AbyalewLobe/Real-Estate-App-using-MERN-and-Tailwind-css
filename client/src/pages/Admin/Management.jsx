"use client";
import React, { useEffect, useState } from "react";
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

export default function Management() {
  const [allUsers, setAllUsers] = useState([]);
  const [allListings, setAllListings] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await fetch(`/api/user/getAllUsers`);
        const data = await res.json();
        console.log("users:", data);
        setAllUsers(data);
        getAllListings();
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    const getAllListings = async () => {
      try {
        const res = await fetch(`/api/listing/getListingForAdmin`);
        const data = await res.json();
        console.log("listings:", data);
        setAllListings(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    getAllUsers();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/listing/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      const updated = await res.json();
      setAllListings((prev) =>
        prev.map((l) => (l._id === id ? updated.data : l))
      );
    } catch (err) {
      console.error("Error updating status:", err.message);
    }
  };

  const [users, setUsers] = useState(allUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [listings, setListings] = useState(allListings);
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
    setUsers((prev) => prev.filter((u) => !selectedUsers.includes(u._id)));

  const deleteSelectedListings = () =>
    setListings((prev) =>
      prev.filter((l) => !selectedListings.includes(l._id))
    );

  const toggleSelectAll = (type, checked) => {
    if (type === "users") {
      setSelectedUsers(checked ? users.map((u) => u._id) : []);
    } else {
      setSelectedListings(checked ? listings.map((l) => l._id) : []);
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
                    {/* <Button >Add User</Button> */}
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
                      {allUsers.map((user) => (
                        <tr key={user._id}>
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user._id)}
                              onChange={() => toggleUserSelect(user._id)}
                            />
                          </td>
                          <td className="px-4 py-3 font-medium">{user.name}</td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">
                            {user.isAdmin ? "Admin" : "User"}
                          </td>
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
                    {/* <Button>Add Listing</Button> */}
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
                      {allListings.map((listing) => (
                        <tr key={listing._id}>
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedListings.includes(listing._id)}
                              onChange={() => toggleListingSelect(listing._id)}
                            />
                          </td>
                          <td className="px-4 py-3 font-medium">
                            {listing.name}
                          </td>
                          <td className="px-4 py-3">{listing.address}</td>
                          <td className="px-4 py-3 text-blue-600">
                            {listing.regularPrice} $
                          </td>
                          <td className="px-4 py-3">
                            <Select
                              defaultValue={listing.status}
                              onValueChange={(value) =>
                                handleStatusChange(listing._id, value)
                              }
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="archived">Sold</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-4 py-3 text-right space-x-2">
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
