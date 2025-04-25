import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setLoading(true);
    // Here you would typically connect to your backend API
    try {
      // Placeholder for API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Signup successful', formData);
      // Redirect or show success
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 rounded-2xl overflow-hidden shadow-xl"
      >
        <div className="p-8">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold text-purple-500 mb-2">Create Account</h2>
            <p className="text-gray-400">Join our community today</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-900 bg-opacity-30 text-red-200 p-3 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
          >
            <motion.div variants={itemVariants} className="mb-6 relative">
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white placeholder-gray-500 border-2 border-gray-600 focus:border-purple-500 rounded-lg py-3 px-10 outline-none transition-colors"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6 relative">
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white placeholder-gray-500 border-2 border-gray-600 focus:border-purple-500 rounded-lg py-3 px-10 outline-none transition-colors"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6 relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white placeholder-gray-500 border-2 border-gray-600 focus:border-purple-500 rounded-lg py-3 px-10 outline-none transition-colors"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6 relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white placeholder-gray-500 border-2 border-gray-600 focus:border-purple-500 rounded-lg py-3 px-10 outline-none transition-colors"
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Sign Up <FaArrowRight />
                </>
              )}
            </motion.button>

            <motion.p
              variants={itemVariants}
              className="text-center text-gray-400 mt-6"
            >
              Already have an account?{" "}
              <motion.a
                href="/login"
                className="text-purple-500 hover:text-purple-300"
                whileHover={{ scale: 1.05 }}
              >
                Login
              </motion.a>
            </motion.p>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="h-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600"
        />
      </motion.div>
    </div>
  );
};

export default Signup;