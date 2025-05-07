import React from "react";
import Lottie from "lottie-react";
import notFoundData from "../../../404.json";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Lottie animationData={notFoundData} loop={true} />
      <h1 className="text-4xl font-bold text-red-600 mb-4">Page Not Found</h1>
      <p className="text-gray-600">
        Sorry, the page you are looking for doesn't exist.
      </p>
    </div>
  );
}
