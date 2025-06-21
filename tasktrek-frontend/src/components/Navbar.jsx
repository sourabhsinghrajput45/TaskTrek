import React from "react";

const Navbar = ({ username, onLogout }) => {
  return (
    <nav className="bg-white border-b shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
        TaskTrek
      </h1>

      <div className="flex items-center gap-6">
        <span className="text-sm text-gray-600 font-medium capitalize">
          👤 Role: <span className="text-gray-800">{username}</span>
        </span>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all shadow"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
