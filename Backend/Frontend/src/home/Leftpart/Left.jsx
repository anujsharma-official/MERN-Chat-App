import React, { useState } from "react";
import Search from "./Search";
import Users from "./Users";
import { TbLogout2 } from "react-icons/tb";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Left() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      toast.success("Logged out successfully");
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
      setLoading(false);
    }
  };

  // Function to close sidebar on mobile when a user is selected
  const handleUserSelected = () => {
    if (window.innerWidth < 768) { // Check if mobile screen
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Floating Hamburger Button (Only on Mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 bg-black/80 backdrop-blur-sm p-2 rounded-full border border-gray-700 shadow-lg hover:bg-gray-800 transition-all"
      >
        <RxHamburgerMenu className="text-white text-2xl" />
      </button>

      {/* Sidebar (Animated + Responsive) */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-72 md:w-[30%] lg:w-[25%] bg-gray-900 md:bg-gray-900 text-gray-300 z-40 flex flex-col transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h1 className="font-bold text-2xl text-white ">
            Chats
          </h1>
          <div className="flex items-center gap-2">
            {/* Close Button (Mobile Only) */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-400 hover:text-white transition-colors"
            >
              <RxCross2 className="text-2xl" />
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <TbLogout2 className="text-xl" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <Search />
        </div>

        {/* Users List (Scrollable) - Pass the handler */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4">
          <Users onUserSelect={handleUserSelected} />
        </div>
      </div>

      {/* Overlay (Closes Sidebar on Click) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
}

export default Left