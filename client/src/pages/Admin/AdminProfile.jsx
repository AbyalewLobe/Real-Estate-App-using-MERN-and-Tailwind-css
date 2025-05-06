import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LogOut, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUserStart,
  deletUserFailure,
  deletUserSucess,
  signOutFailure,
  signOutStart,
  signOutSucess,
} from "@/redux/user/userSlice";

export default function AdminProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(deletUserFailure(data.message));
        toast.error("Account deletion failed");
        return;
      }

      dispatch(deletUserSucess(data));
      toast.success("Account deleted successfully");
    } catch (error) {
      dispatch(deletUserFailure(error.message));
      toast.error("Account deletion failed");
    }
  };
  const handleDeleteConfirmation = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Confirm Deletion
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Are you sure you want to permanently delete your account? This
            action cannot be undone.
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleDeleteUser();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(signOutFailure(data.message));
        toast.error("Sign out failed");
        return;
      }

      dispatch(signOutSucess(data));
      toast.success("Signed out successfully");
      navigate("/login");
    } catch (error) {
      dispatch(signOutFailure(error.message));
      toast.error("Sign out failed");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row sm:items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.jpg" alt="user avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-gray-500">Role: Admin</p>
                <p className="text-gray-500">johndoe@example.com</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Real Estate Agent | Joined Jan 2024
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteConfirmation}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Edit Profile */}
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+251 900 000 000" />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Short description..." />
                </div>
                <Button type="submit" className="w-fit mt-2">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
