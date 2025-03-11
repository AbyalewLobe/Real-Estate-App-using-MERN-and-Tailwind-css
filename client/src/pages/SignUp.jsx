import { Link } from "react-router-dom";

export default function SignOut() {
  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border rounded-lg p-3"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-lg p-3"
        />
        <button
          disabled
          className="bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80 uppercase text-white"
        >
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link>
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
