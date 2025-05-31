import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../statemanage/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="h-[10vh]">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex items-center gap-2 sm:gap-3 w-full">
            <label className="border border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2 w-full focus-within:border-gray-500 transition-colors">
              <input
                type="text"
                className="grow outline-none bg-transparent p-2 sm:p-3 text-sm sm:text-base"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="p-2 sm:p-3 hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Search"
            >
              <FaSearch className="text-xl sm:text-2xl text-gray-400 hover:text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search