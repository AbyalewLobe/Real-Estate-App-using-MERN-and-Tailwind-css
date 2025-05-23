import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import AdminDashboardLayout from "./pages/AdminDashboard";
import Management from "./pages/Admin/Management";
import DashboardOverview from "./pages/Admin/DashboardOverview";
import AdminProfile from "./pages/Admin/AdminProfile";
import Settings from "./pages/Admin/Settings";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./components/AdminRoute";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/Admin/NotFound";

// User layout with Header and Footer
const UserLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* User routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin dashboard layout */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="management" element={<Management />} />
            <Route path="admin-profile" element={<AdminProfile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
