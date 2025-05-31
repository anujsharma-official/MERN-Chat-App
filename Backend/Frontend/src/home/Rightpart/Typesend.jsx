import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // empty message block
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 px-2 py-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          className="flex-1 py-2 px-4 rounded-xl bg-slate-900 text-white placeholder-gray-400 outline-none border border-gray-700 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
        >
          <IoSend className="text-white text-2xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
