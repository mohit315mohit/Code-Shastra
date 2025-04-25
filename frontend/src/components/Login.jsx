import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log(formData);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 8px rgb(255, 255, 255, 0.3)",
      transition: { type: "spring", stiffness: 400 },
    },
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 shadow-2xl"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="mt-2 text-gray-400">
              {isSignUp
                ? "Sign up to get started"
                : "Sign in to access your account"}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <motion.div variants={containerVariants} className="space-y-4">
              {isSignUp && (
                <motion.div variants={itemVariants} className="relative">
                  <FaUser className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-10 py-2 bg-gray-700/60 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                    placeholder="Full Name"
                    required
                  />
                </motion.div>
              )}
              <motion.div variants={itemVariants} className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-10 py-2 bg-gray-700/60 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  placeholder="Email"
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants} className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-10 py-2 bg-gray-700/60 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  placeholder="Password"
                  required
                />
              </motion.div>

              {!isSignUp && (
                <motion.div
                  variants={itemVariants}
                  className="flex justify-end"
                >
                  <a
                    href="#"
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Forgot password?
                  </a>
                </motion.div>
              )}

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-2 mt-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg transition-all"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </motion.button>
            </motion.div>
          </form>

          <motion.div
            variants={itemVariants}
            className="text-center text-gray-400 text-sm"
          >
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <motion.button
                whileHover={{ color: "#d946ef" }}
                className="ml-2 text-purple-400 font-medium"
                onClick={toggleForm}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </motion.button>
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative flex items-center mt-6"
          >
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400">
              or continue with
            </span>
            <div className="flex-grow border-t border-gray-600"></div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4"
          >
            {["google", "github", "twitter"].map((provider) => (
              <motion.button
                key={provider}
                whileHover={{ y: -3, boxShadow: "0 5px 10px rgba(0,0,0,0.2)" }}
                className="flex items-center justify-center py-2 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600"
              >
                <img
                  src={`/icons/${provider}.svg`}
                  alt={provider}
                  className="w-5 h-5"
                />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
