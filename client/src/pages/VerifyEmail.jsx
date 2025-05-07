import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "../assets/success.json";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(`http://localhost:3000/api/auth/verify-email/${token}`);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    };

    verify();
  }, [token]);

  if (status === "verifying") {
    return <p className="text-center mt-10">Verifying your email...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-16 px-4 text-center">
      {status === "success" ? (
        <>
          <Lottie animationData={successAnimation} className="w-60 h-60" />
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Email Verified Successfully!
          </h2>
          <button
            onClick={() => navigate("/sign-in")}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 mt-4"
          >
            Go to Sign In
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Verification Failed
          </h2>
          <p className="text-gray-500">The link may be invalid or expired.</p>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
