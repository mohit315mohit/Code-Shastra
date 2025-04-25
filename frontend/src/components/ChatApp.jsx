import { useState } from "react";
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm CampusCopilot 🤖. Ask me anything about college life!", sender: "bot" },
  ]);

  const handleSend = async (input) => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMsg = { text: data.reply, sender: "bot" };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 font-sans text-center">
      <h1 className="text-2xl font-bold mb-4">CampusCopilot</h1>
      <ChatBox messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatApp;
