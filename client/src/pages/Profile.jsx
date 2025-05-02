import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../appWrite/appwriteConfig";
import { Link, useNavigate } from "react-router-dom";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSucess,
  deletUserFailure,
  deletUserSucess,
  deleteUserStart,
  signOutFailure,
  signOutStart,
  signOutSucess,
} from "../redux/user/userSlice";
import { toast } from "react-hot-toast";

export default function Profile() {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [uploadError, setUploadError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showListingError, setShowListingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    try {
      setIsLoading(true);
      const fileId = `unique()`;
      const response = await storage.createFile(
        "67d6b927001599b4e502",
        fileId,
        file
      );
      const imageUrl = storage.getFileView(
        "67d6b927001599b4e502",
        response.$id
      );
      setImageUrl(imageUrl);
      setFormData({ ...formData, avatar: imageUrl });
      setUploadError(false);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError(true);
      toast.error("Image upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error("Update failed");
        return;
      }

      dispatch(updateUserSucess(data));
      toast.success("Profile updated successfully");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error("Update failed");
    }
  };

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
      toast.success("Signed out successfully"); // Trigger toast BEFORE navigation
      navigate("/login");
    } catch (error) {
      dispatch(signOutFailure(error.message));
      toast.error("Sign out failed");
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (!res.ok || data.success === false) {
        setShowListingError(true);
        toast.error("Error fetching listings");
        return;
      }

      setUserListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setShowListingError(true);
      toast.error("Error fetching listings");
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok || data.success === false) {
        toast.error("Failed to delete listing");
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
      toast.success("Listing deleted");
    } catch (error) {
      toast.error("Failed to delete listing");
    }
  };

  const handleListingDeleteConfirmation = (listingId) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Delete Listing?
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            This listing will be permanently removed. Are you sure?
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleListingDelete(listingId);
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

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 self-center object-cover cursor-pointer"
          src={imageUrl || currentUser.avatar}
          alt="profile"
        />

        {uploadError && (
          <p className="text-red-700 text-center">Image upload error</p>
        )}
        {isLoading && (
          <div className="flex justify-center items-center w-full ">
            <div className="spinner w-4 h-4"></div>
          </div>
        )}
        {isLoading && (
          <p className="text-blue-500 text-center ">Uploading image...</p>
        )}

        <input
          type="text"
          placeholder="username"
          id="username"
          className="border rounded-lg p-3"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg text-white uppercase disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:bg-opacity-90"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-3">
        <span
          onClick={handleDeleteConfirmation}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>

        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>

      <button
        onClick={handleShowListing}
        className="text-green-700 w-full mt-5"
      >
        Show Listings
      </button>

      {userListings.length > 0 && (
        <div className="flex flex-col gap-4 mt-5">
          <h1 className="text-center text-2xl font-semibold">Your Listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing"
                  className="h-16 w-16 object-cover rounded"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="flex-1 text-slate-700 font-semibold hover:underline truncate"
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => handleListingDeleteConfirmation(listing._id)}
                  className="text-red-700 text-sm"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 text-sm">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
