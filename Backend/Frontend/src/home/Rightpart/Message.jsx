import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser?.user?._id;

  const chatAlign = itsMe ? "justify-end" : "justify-start";
  const bubbleColor = itsMe ? "bg-blue-600 text-white" : "bg-gray-300 text-black";
  const timeAlign = itsMe ? "text-right" : "text-left";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${chatAlign} px-4 py-1`}>
      <div className="max-w-[80%] sm:max-w-[60%]">
        <div
          className={`rounded-xl px-4 py-2 break-words ${bubbleColor} shadow`}
        >
          {message.message}
        </div>
        <div className={`text-xs text-gray-400 mt-1 ${timeAlign}`}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
}

export default Message;
