import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  const dpInitials = selectedConversation?.email?.slice(0, 2)?.toUpperCase();

  return (
    <div className="pl-4 pr-2 py-3 flex items-center bg-gray-700 hover:bg-gray-600 duration-300 w-full">
      {/* Hamburger for small screens */}
     

      {/* Profile Avatar */}
      <div className="relative flex-shrink-0">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${
            getOnlineUsersStatus(selectedConversation?._id) === "Online"
              ? "bg-green-600"
              : "bg-gray-500"
          }`}
        >
          {dpInitials || "NA"}
        </div>

        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-700 ${
            getOnlineUsersStatus(selectedConversation?._id) === "Online"
              ? "bg-green-500"
              : "bg-gray-400"
          }`}
        ></div>
      </div>

      {/* User Info */}
      <div className="ml-3 flex flex-col overflow-hidden">
        <h1 className="text-base sm:text-lg font-semibold truncate">
          {selectedConversation?.name}
        </h1>
        <p className="text-sm text-gray-300 truncate">
          {selectedConversation?.fullname}
        </p>
        <span className="text-sm text-white/70">
          {getOnlineUsersStatus(selectedConversation?._id)}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
