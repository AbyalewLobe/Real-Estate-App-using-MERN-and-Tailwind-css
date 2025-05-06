import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const pieData = [
  { name: "active", value: 400 },
  { name: "sold", value: 120 },
];

const pieColors = ["#4f46e5", "#10b981", "#f97316"];

const barData = [
  { name: "Mon", posts: 30, users: 10 },
  { name: "Tue", posts: 20, users: 15 },
  { name: "Wed", posts: 27, users: 11 },
  { name: "Thu", posts: 18, users: 8 },
  { name: "Fri", posts: 23, users: 12 },
  { name: "Sat", posts: 34, users: 20 },
  { name: "Sun", posts: 44, users: 25 },
];

export default function DashboardOverview() {
  const [allUsers, setAllUsers] = useState([]);
  const [getAllListings, setGetAllListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await fetch(`/api/user/getAllUsers`);
        const data = await res.json();
        console.log("Users:", data);
        setAllUsers(data);
        getAllListing();
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    const getAllListing = async () => {
      try {
        const res = await fetch(`/api/listing/get`);
        const data = await res.json();
        console.log("Listings:", data);
        setGetAllListings(data);
        fetchSellListing();
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };
    const fetchSellListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent`);
        const data = await res.json();
        console.log("sell listings:", data);
        setSellListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    getAllUsers();
  }, []);
  return (
    <div className="p-4 flex flex-col gap-5">
      <h1 className="p-2 text-2xl font-bold">Dashboard Overview</h1>

      {/* User and Listings Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
        <Card>
          <CardHeader>
            <CardTitle>Total User</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-blue-600">{allUsers.length} +</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-blue-600">
              {getAllListings.length} +
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rent Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-blue-600">
              {sellListings.length} +
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-72">
        {/* Pie Chart */}
        <div className="w-full md:w-1/3 h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="w-full md:w-2/3 h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="posts"
                fill="#3b82f6"
                name="Posts"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="users"
                fill="#22c55e"
                name="New Users"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
