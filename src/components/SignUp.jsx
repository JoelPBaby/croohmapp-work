import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, we'll just check if all fields are filled
    if (formData.fullName && formData.email && formData.password && formData.confirmPassword) {
      // In a real app, you would validate and create account here
      navigate('/home');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-purple-50 to-white font-['Times_New_Roman']"
    >
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="min-h-screen flex flex-col">
          {/* Image Section - Mobile */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex items-center justify-center p-4"
          >
            <img 
              src="/land.png" 
              alt="Organic shapes illustration" 
              className="w-full max-w-sm h-auto object-contain"
            />
          </motion.div>

          {/* Form Section - Mobile */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 p-6 bg-white"
          >
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-3xl font-bold text-center mb-8"
            >
              Create Account
            </motion.h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 text-sm"
                  placeholder="Enter your email"
                  required
                />
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 pr-12 text-sm"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 pr-12 text-sm"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </motion.div>
              
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 15px 30px rgba(255, 215, 0, 0.3)",
                  backgroundColor: "#FFD700",
                  transition: {
                    duration: 0.15,
                    ease: "easeOut"
                  }
                }}
                whileTap={{ 
                  scale: 0.98,
                  boxShadow: "0 5px 15px rgba(255, 215, 0, 0.2)",
                  transition: {
                    duration: 0.1,
                    ease: "easeOut"
                  }
                }}
                type="submit"
                className="w-full bg-[#FFD700] text-[#111] py-3 px-6 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 relative overflow-hidden group"
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.15 }}
                >
                  Create Account
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFC700] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.15 }}
                />
              </motion.button>
            </form>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-6 text-center text-sm text-gray-600"
            >
              Already have an account?{' '}
              <Link to="/signin" className="text-[#FFD700] hover:text-[#FFC700] font-semibold">
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-center min-h-screen p-4">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl font-bold text-center mb-8"
          >
            Create Account
          </motion.h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 text-sm"
                placeholder="Enter your full name"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 text-sm"
                placeholder="Enter your email"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 pr-12 text-sm"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 pr-12 text-sm"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </motion.div>
            
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(255, 215, 0, 0.3)",
                backgroundColor: "#FFD700",
                transition: {
                  duration: 0.15,
                  ease: "easeOut"
                }
              }}
              whileTap={{ 
                scale: 0.98,
                boxShadow: "0 5px 15px rgba(255, 215, 0, 0.2)",
                transition: {
                  duration: 0.1,
                  ease: "easeOut"
                }
              }}
              type="submit"
              className="w-full bg-[#FFD700] text-[#111] py-3 px-6 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 relative overflow-hidden group"
            >
              <motion.span
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
              >
                Create Account
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFC700] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.15 }}
              />
            </motion.button>
          </form>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-6 text-center text-sm text-gray-600"
          >
            Already have an account?{' '}
            <Link to="/signin" className="text-[#FFD700] hover:text-[#FFC700] font-semibold">
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignUp; 