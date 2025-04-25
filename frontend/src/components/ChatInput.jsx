import { useState } from "react";
import { motion } from "framer-motion";
import { IoSendSharp } from "react-icons/io5";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <motion.div 
      className="flex items-center gap-3 p-4 rounded-xl backdrop-blur-md bg-white/10 border border-gray-200/20 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="flex-1 relative bg-white/80 dark:bg-gray-800/80 rounded-lg overflow-hidden"
        animate={{ 
          boxShadow: isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "inset 0 2px 4px rgba(0, 0, 0, 0.05)"
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyPress={handleKeyPress}
          className="w-full p-3 bg-transparent outline-none placeholder:text-gray-400"
          placeholder="Ask anything..."
        />
      </motion.div>
      
      <motion.button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg flex items-center justify-center"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        disabled={!input.trim()}
        animate={{ opacity: input.trim() ? 1 : 0.7 }}
      >
        <motion.div whileHover={{ x: 2 }} transition={{ type: "spring" }}>
          <IoSendSharp size={20} />
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default ChatInput;
