import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null); // Cleanup on unmount
  }, [setSelectedConversation]);

  return (
    <div className="w-full bg-slate-900 text-gray-300 min-h-screen">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Chatuser />

          <div
            className="flex-1 overflow-y-auto"
            style={{ maxHeight: "calc(88vh - 8vh)" }}
          >
            <Messages />
          </div>

          <Typesend />
        </>
      )}
    </div>
  );
}

export default Right;

// Responsive NoChatSelected message
const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="relative w-full h-full">
      {/* Hamburger Button for Small Screens */}
     

      <div className="flex h-screen items-center justify-center text-center px-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
          Welcome{" "}
          <span className="font-bold text-xl text-blue-400">
            {authUser.user.fullname}
          </span>
          <br />
          No chat selected.<br />
          Please start a conversation by selecting a contact.
        </h1>
      </div>
    </div>
  );
};
