import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { storage } from "../appWrite/appwriteConfig";
import { Await, data } from "react-router-dom";
import { Link } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import Listing from "../../../api/models/listing.model";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [isUpplodeE, setIsUplodeE] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(file);
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log(file);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    try {
      setIsLoading(true);
      const fileId = `unique()`; // Generates a unique ID
      const response = await storage.createFile(
        "67d6b927001599b4e502",
        fileId,
        file
      );
      console.log("Upload successful:", response);

      const imageUrl = storage.getFilePreview(
        "67d6b927001599b4e502",
        response.$id
      );
      setImageUrl(imageUrl);

      console.log(imageUrl);
      setFormData({ ...formData, avatar: imageUrl });
      setIsLoading(false);
      console.log(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      setIsLoading(false);
      setIsUplodeE(true);
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
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSucess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(deletUserFailure(data.message));
        return;
      }
      dispatch(deletUserSucess(data));
    } catch (error) {
      dispatch(deletUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSucess(data));
    } catch (error) {
      dispatch(signOutFailure(data.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);

      // First check if the response is OK
      if (!res.ok) {
        setShowListingError(true);
        return;
      }

      const data = await res.json();
      console.log("Listings data:", data); // Debug log

      if (data.success === false) {
        setShowListingError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setShowListingError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={handleFileChange}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 self-center object-cover cursor-pointer"
          src={imageUrl || currentUser.avatar}
          alt="profile"
        />

        <p className="text-center self-center">
          {imageUrl ? (
            <span className="text-green-700">
              Image Uplode Successfully Uploaded!
            </span>
          ) : isUpplodeE ? (
            <span className="text-red-700"> ErrorImage Uplode</span>
          ) : (
            ""
          )}
          {isLoading && <div className="spinner"></div>}
        </p>

        <input
          type="text"
          placeholder="username"
          id="username"
          className="border rounded-lg p-3 "
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3 "
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-lg p-3 "
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg hover:ring-opacity-95 disabled:opacity-80 text-white uppercase"
        >
          {loading ? "Loading" : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:bg-opacity-95"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-3">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-3">
        {updateSuccess ? "User is Updated Successfully" : ""}
      </p>

      <button onClick={handleShowListing} className="text-green-700 w-full">
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingError ? "Error showing listing" : ""}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center my-7 text-2xl font-semibold ">
            Your Listing
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${Listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain "
                />
              </Link>
              <Link
                className="flex-1 text-slate-700 font-semibold hover:underline truncate "
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
