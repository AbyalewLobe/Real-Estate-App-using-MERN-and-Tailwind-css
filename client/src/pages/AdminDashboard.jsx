import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Users, Settings, UserCircle2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function AdminDashboardLayout() {
  const location = useLocation();

  const NavLinks = () => (
    <nav className="space-y-2">
      <Link to="/admin">
        <Button
          variant="ghost"
          className={`w-full justify-start ${
            location.pathname === "/admin/dashboard" ? "bg-gray-100" : ""
          }`}
        >
          <Home className="mr-2 h-5 w-5" /> Dashboard
        </Button>
      </Link>
      <Link to="/admin/management">
        <Button
          variant="ghost"
          className={`w-full justify-start ${
            location.pathname.includes("management") ? "bg-gray-100" : ""
          }`}
        >
          <Users className="mr-2 h-5 w-5" /> Management
        </Button>
      </Link>
      <Link to="/admin/admin-profile">
        <Button variant="ghost" className="w-full justify-start">
          <UserCircle2 className="mr-2 h-5 w-5" /> Profile
        </Button>
      </Link>
      <Link to="/admin/settings">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-5 w-5" /> Settings
        </Button>
      </Link>
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-white border-r shadow-sm p-4 space-y-6">
        <div className="text-2xl font-bold text-center">Estate Admin</div>
        <NavLinks />
      </aside>

      {/* Sidebar for Mobile */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle className="text-xl text-center">
                Estate Admin
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <NavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 w-full">
        <Outlet />
      </main>
    </div>
  );
}
