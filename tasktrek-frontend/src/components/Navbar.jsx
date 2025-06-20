import React from "react";

const Navbar = ({ username, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">TaskTrek</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 capitalize">Role: {username}</span>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
