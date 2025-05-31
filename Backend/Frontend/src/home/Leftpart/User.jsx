import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user, onUserSelect}) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  


   const handleClick = () => {
    setSelectedConversation(user);
    if (onUserSelect) onUserSelect(); // This will close the sidebar on mobile
  };
  // Get initials from email or name
  const getInitials = () => {
    if (user?.email) return user.email.slice(0, 2).toUpperCase();
    if (user?.name) return user.name.slice(0, 2).toUpperCase();
    if (user?.fullname) return user.fullname.slice(0, 2).toUpperCase();
    return "NA";
  };

  const dpInitials = getInitials();

  return (
    <div 
      className={`transition-colors duration-200 rounded-sm ${
        isSelected ? "bg-slate-700" : "hover:bg-slate-600"
      }`}
      onClick={() => setSelectedConversation(user)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setSelectedConversation(user)}
      aria-label={`Chat with ${user?.name || user?.fullname || "user"}`}
    >
      <div onClick={handleClick}  className="flex  items-center gap-3 p-4 sm:px-6 sm:py-3 cursor-pointer">
        <div className="relative flex-shrink-0  ">
          {/* Avatar with initials */}
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full  flex items-center justify-center text-white font-bold ${
              isOnline ? "bg-green-600" : "bg-gray-500 "
            }`}
            aria-hidden="true"
          >
            <span className="text-sm sm:text-lg">{dpInitials}</span>
          </div>

          {/* Online status indicator dot */}
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-700 ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
            aria-label={isOnline ? "Online" : "Offline"}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="font-bold truncate text-sm sm:text-base">
            {user?.name || user?.fullname}
          </h1>
          {user?.name && user?.fullname && (
            <p className="text-xs sm:text-sm text-gray-300 truncate">
              {user.fullname}
            </p>
          )}
          <p
            className={`text-xs mt-0.5 ${
              isOnline ? "text-green-400" : "text-gray-400"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default User;