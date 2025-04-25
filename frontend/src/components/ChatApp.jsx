import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm CampusCopilot 🤖. Ask me anything about college life!", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (input) => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setTimeout(() => {
        const botMsg = { text: data.reply, sender: "bot" };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 500); // Small delay for typing effect
    } catch (err) {
      console.error("Fetch error:", err);
      setIsTyping(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-screen mx-auto p-6 font-sans bg-gradient-to-br from-gray-900 to-slate-800 shadow-lg"
    >
      <motion.div 
        className="flex items-center justify-center mb-6"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-3 rounded-full mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400">CampusCopilot</h1>
      </motion.div>

      <motion.div 
        className="bg-gray-800 rounded-xl shadow-md p-4 mb-4 h-96 overflow-y-auto border border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-700 text-gray-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-3"
            >
              <div className="bg-gray-700 px-4 py-2 rounded-xl rounded-bl-none">
                <motion.div 
                  className="flex space-x-1"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute w-11/12 bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <ChatInput onSend={handleSend} />
      </motion.div>
    </motion.div>
  );
};

export default ChatApp;
