import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profiel"
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border rounded-lg p-3 "
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3 "
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border rounded-lg p-3 "
        />
        <button className="bg-slate-700 p-3 rounded-lg hover:ring-opacity-95 disabled:opacity-80 text-white uppercase">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
