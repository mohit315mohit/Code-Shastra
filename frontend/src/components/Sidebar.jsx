import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiAddLine, RiChatSmile2Line, RiSettings4Line, RiLogoutBoxLine } from 'react-icons/ri';
import { format } from 'date-fns';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Dummy chat data
  const chats = [
    { id: 1, timestamp: new Date(2023, 5, 15, 14, 30) },
    { id: 2, timestamp: new Date(2023, 5, 15, 12, 15) },
    { id: 3, timestamp: new Date(2023, 5, 14, 18, 45) },
    { id: 4, timestamp: new Date(2023, 5, 14, 9, 20) },
    { id: 5, timestamp: new Date(2023, 5, 13, 16, 0) },
  ];

  return (
    <motion.div 
      className="h-screen absolute z-50 bg-gray-900/40 backdrop-blur-md border-r border-gray-800 text-gray-300 pt-14"
      initial={{ width: 260 }}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {!isCollapsed && <h2 className="font-semibold text-xl">Chats</h2>}
          <button 
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <RiChatSmile2Line size={24} /> : <RiChatSmile2Line size={20} />}
          </button>
        </div>
        
        {/* New Chat Button */}
        <motion.button
          className="m-3 flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RiAddLine size={isCollapsed ? 24 : 20} />
          {!isCollapsed && <span>New Chat</span>}
        </motion.button>

        {/* Chat List */}
        <div className="flex-grow overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent py-2">
          {chats.map((chat) => (
            <motion.div
              key={chat.id}
              className="px-3 py-2 mx-2 rounded-lg cursor-pointer hover:bg-gray-800/70 transition-colors flex items-center gap-3"
              whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.7)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-indigo-400">
                <RiChatSmile2Line size={isCollapsed ? 24 : 20} />
              </div>
              {!isCollapsed && (
                <div className="truncate">
                  {format(chat.timestamp, "'Chat at' h:mm a")}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-800 flex flex-col gap-2">
          <motion.button
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors w-full"
            whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.7)' }}
            whileTap={{ scale: 0.98 }}
          >
            <RiSettings4Line size={isCollapsed ? 24 : 20} />
            {!isCollapsed && <span>Settings</span>}
          </motion.button>
          
          <motion.button
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors w-full"
            whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.7)' }}
            whileTap={{ scale: 0.98 }}
          >
            <RiLogoutBoxLine size={isCollapsed ? 24 : 20} />
            {!isCollapsed && <span>Sign Out</span>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;