import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users({onUserSelect }) {
  const [allUsers, loading, error] = useGetAllUsers();

  const SkeletonLoader = () => (
    <div className="flex items-center space-x-4 p-3 animate-pulse">
      <div className="h-12 w-12 rounded-full bg-slate-700" />
      <div className="space-y-2 flex-1">
        <div className="h-4 w-3/4 rounded bg-slate-700" />
        <div className="h-3 w-1/2 rounded bg-slate-700" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 bg-slate-800 rounded-lg mb-2 sticky top-0 z-10 flex-shrink-0">
        <h1 className="text-white font-semibold text-lg">Messages</h1>
      </div>

      {/* Users List Container */}
      <div className="flex-1 min-h-0 overflow-y-auto px-2 sm:px-4 ">
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <SkeletonLoader key={`skeleton-${index}`} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="text-red-400 text-center">
              <p className="text-lg font-medium">Failed to load users</p>
              <p className="text-sm mt-2">{error.message || "Please try again later"}</p>
            </div>
          </div>
        ) : allUsers?.length > 0 ? (
          <div className="divide-y divide-slate-700">
            {allUsers.map((user) => (
              <User key={user._id} user={user} onUserSelect={onUserSelect} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 ">
            <div className="text-gray-400 text-center">
              <p className="text-lg font-medium">No conversations found</p>
              <p className="text-sm mt-2">Start chatting with someone new!</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}

export default Users;
