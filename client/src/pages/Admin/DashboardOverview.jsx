import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { ListingsChart } from "@/components/ListingsChart";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DashboardOverview() {
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
            <p className="font-semibold text-blue-600">200,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-blue-600">100,000 +</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-blue-600">$300,000</p>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart and Listings Chart Section */}
      <div className="flex flex-col sm:flex-row gap-4 p-2">
        {/* Pie Chart for User Distribution */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-center mb-4">
            User Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Listings Chart */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-center mb-4">
            Listings Chart
          </h3>
          <ListingsChart />
        </div>
      </div>
    </div>
  );
}
