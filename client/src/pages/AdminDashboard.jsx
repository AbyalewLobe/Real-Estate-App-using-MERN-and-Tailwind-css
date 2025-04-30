import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Users, FileText, Settings, UserCircle2 } from "lucide-react";

export default function EstateAdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-4 space-y-6">
        <div className="text-2xl font-bold text-center">Estate Admin</div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-5 w-5" /> Dashboard
          </Button>
          <Link to={"Management"}>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-5 w-5" /> Management
            </Button>
          </Link>

          {/* <Link to={"listingManagement"}>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-5 w-5" /> Listings Management
            </Button>
          </Link> */}

          <Button variant="ghost" className="w-full justify-start">
            <UserCircle2 className="mr-2 h-5 w-5" /> Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-5 w-5" /> Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Total User</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-blue-600">200000</p>
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
              <p className="font-semibold text-blue-600">300</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
