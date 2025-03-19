import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { storage } from "../appWrite/appwriteConfig";
import { Await } from "react-router-dom";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSucess,
  deletUserFailure,
  deletUserSucess,
  deleteUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [isUpplodeE, setIsUplodeE] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
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
      console.log(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
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
  console.log("ccccuewf", currentUser);
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
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is Updated Successfully" : ""}
      </p>
    </div>
  );
}
