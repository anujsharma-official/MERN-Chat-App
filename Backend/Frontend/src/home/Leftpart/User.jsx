import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  // Email ke first 2 characters nikaalna with optional chaining
  const dpInitials = user?.email?.slice(0, 2)?.toUpperCase() || "NA";

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer items-center">
        <div className="relative">
          {/* Avatar with initials */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
              isOnline ? "bg-green-600" : "bg-gray-500"
            }`}
          >
            {dpInitials}
          </div>

          {/* Online status indicator dot */}
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-700 ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          ></div>
        </div>

        <div>
          <h1 className="font-bold">{user?.name}</h1>
          <span className="text-sm text-gray-300">{user?.fullname}</span>
          {/* Online status text */}
          <span
            className={`block text-xs mt-1 ${
              isOnline ? "text-green-400" : "text-gray-400"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default User;