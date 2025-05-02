import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Users, FileText, Settings, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-4 space-y-6">
        <div className="text-2xl font-bold text-center">Estate Admin</div>
        <nav className="space-y-2">
          <Link to="/admin/dashboard">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                location.pathname === "/admin/dashboard" ? "bg-gray-100" : ""
              }`}
            >
              <Home className="mr-2 h-5 w-5" /> Dashboard
            </Button>
          </Link>
          <Link to="/admin/dashboard/management">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                location.pathname.includes("management") ? "bg-gray-100" : ""
              }`}
            >
              <Users className="mr-2 h-5 w-5" /> Management
            </Button>
          </Link>
          <Link to={"/admin/dashboard/admin-profile"}>
            <Button variant="ghost" className="w-full justify-start">
              <UserCircle2 className="mr-2 h-5 w-5" /> Profile
            </Button>
          </Link>

          <Link to={"/admin/dashboard/settings"}>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-5 w-5" /> Settings
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
