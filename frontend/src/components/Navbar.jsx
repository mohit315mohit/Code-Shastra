import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state
  const location = useLocation();

  // Check if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const menuVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3 } }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed w-full z-50 transition-all duration-300  bg-black/20 backdrop-blur-lg shadow-xl`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 cursor-pointer"
          >
            <Link to="/" className="text-2xl font-bold text-purple-500">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
                CodeShastra
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navbarItems.map((item) => (
                <Link key={item.name} to={item.path}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${location.pathname === item.path ? 'text-purple-400' : 'text-gray-300 hover:text-white'} 
                                font-medium relative`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}

              {/* Auth buttons */}
              {isLoggedIn ? (
                <Link to="/profile">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full"
                  >
                    <FiUser className="mr-2" />
                    Profile
                  </motion.div>
                </Link>
              ) : (
                <div className="flex space-x-4">
                  
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className=" text-white px-4 py-2 rounded-full"
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="md:hidden fixed inset-y-0 right-0 w-64 bg-black/95 backdrop-blur-lg shadow-2xl"
      >
        <div className="flex flex-col px-4 py-8 space-y-6">
          {navbarItems.map((item) => (
            <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)}>
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`${location.pathname === item.path ? 'text-purple-400' : 'text-gray-300 hover:text-white'} 
                          font-medium text-lg`}
              >
                {item.name}
              </motion.div>
            </Link>
          ))}
          
          <div className="pt-4 border-t border-gray-700">
            {isLoggedIn ? (
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-purple-400 font-medium text-lg"
                >
                  <FiUser className="mr-2" />
                  Profile
                </motion.div>
              </Link>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-300 hover:text-white font-medium text-lg"
                  >
                    Login
                  </motion.div>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;