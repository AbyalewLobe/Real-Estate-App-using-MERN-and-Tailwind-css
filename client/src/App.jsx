import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Link } from "react-router-dom";
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
import AdminDashboard from "./pages/AdminDashboard";

import Management from "./pages/Admin/Management";
// import "@shadcn/ui/styles.css";
// User layout with Header and Footer
const UserLayout = () => (
  <div>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/listing/:listingId" element={<Listing />} />
      <Route path="/search" element={<Search />} />
      <Route path="/about" element={<About />} />

      {/* Private user routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/update-listing/:listingId" element={<UpdateListing />} />
      </Route>
    </Routes>
    <Footer />
  </div>
);

// Admin layout without Header and Footer
const AdminLayout = () => (
  <div>
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="dashboard/Management" element={<Management />} />
    </Routes>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes wrapped with UserLayout */}
        <Route path="/*" element={<UserLayout />} />{" "}
        {/* This catches all user-related routes */}
        {/* Admin Routes wrapped with AdminLayout */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
