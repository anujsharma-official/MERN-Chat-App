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

  // Email ke pehle 2 capital letters nikaalne
  const dpInitials = selectedConversation?.email?.slice(0, 2)?.toUpperCase();

  return (
    <div className="pl-5 pt-5 h-[12vh] flex items-center space-x-4 bg-gray-700 hover:bg-gray-600 duration-300">
      <div className="relative">
        {/* Avatar with initials */}
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${
            getOnlineUsersStatus(selectedConversation._id) === "Online"
              ? "bg-green-600"
              : "bg-gray-500"
          }`}
        >
          {dpInitials || "NA"}
        </div>
        
        {/* Online status indicator - similar to old code */}
        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-700 ${
          getOnlineUsersStatus(selectedConversation._id) === "Online" 
            ? "bg-green-500" 
            : "bg-gray-400"
        }`}></div>
      </div>
      <div>
        <h1 className="text-xl font-semibold">{selectedConversation?.name}</h1>
        <p className="text-sm text-gray-300">{selectedConversation?.fullname}</p>
        <span className="text-sm text-white/70">
          {getOnlineUsersStatus(selectedConversation._id)}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;