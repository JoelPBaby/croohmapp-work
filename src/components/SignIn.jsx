import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, we'll just check if both fields are filled
    if (formData.email && formData.password) {
      // In a real app, you would validate credentials here
      navigate('/home');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white font-['Times_New_Roman']"
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
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-2xl text-[#111] mb-6 font-bold text-center"
            >
              Sign In
            </motion.h1>
            
            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
              <motion.input
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-[#e0e0e0] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 text-sm text-black"
                placeholder="Email"
                required
              />
              
              <div className="relative">
                <motion.input
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-[#e0e0e0] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 pr-12 text-black text-sm"
                  placeholder="Password"
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
              
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
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
                  Sign In
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFC700] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.15 }}
                />
              </motion.button>

              {/* Or Section */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="flex items-center justify-center my-4"
              >
                <div className="flex-1 h-[1px] bg-[#e0e0e0]"></div>
                <span className="mx-4 text-[#666] text-sm">or</span>
                <div className="flex-1 h-[1px] bg-[#e0e0e0]"></div>
              </motion.div>

              {/* Social Login Buttons */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="flex gap-3"
              >
                <motion.button 
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f5f5f5",
                    transition: {
                      duration: 0.15,
                      ease: "easeOut"
                    }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
                    transition: {
                      duration: 0.1,
                      ease: "easeOut"
                    }
                  }}
                  className="flex-1 bg-[#ebebeb] text-[#111] py-3 px-6 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 relative overflow-hidden group"
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  >
                    Google
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#ebebeb] to-[#e0e0e0] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.15 }}
                  />
                </motion.button>
                <motion.button 
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f5f5f5",
                    transition: {
                      duration: 0.15,
                      ease: "easeOut"
                    }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
                    transition: {
                      duration: 0.1,
                      ease: "easeOut"
                    }
                  }}
                  className="flex-1 bg-[#ebebeb] text-[#111] py-3 px-6 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 relative overflow-hidden group"
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  >
                    Facebook
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#ebebeb] to-[#e0e0e0] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.15 }}
                  />
                </motion.button>
              </motion.div>
            </form>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-6 text-center text-xs text-[#666]"
            >
              Don't have an account? Contact administrator for access.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex justify-between items-center min-h-screen bg-white p-0">
        {/* Image Section */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-1/2 flex flex-col justify-center"
        >
          <div className="relative p-8 flex justify-end items-center h-auto bg-white">
            <img 
              src="/land.png" 
              alt="Organic shapes illustration" 
              className="w-[79vh] h-[89vh] max-w-[10000px] -mr-50 rounded-[30px] block"
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-1/2 flex flex-col justify-center"
        >
          <div className="p-8 bg-white h-[89vh] w-[77vh] border-2 border-[#e0e0e0] rounded-[30px] flex flex-col justify-center mr-[25vh]">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl text-[#111] mb-6 font-bold ml-8"
            >
              Sign In
            </motion.h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.input
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-[80%] ml-8 p-3 rounded-lg border-2 border-[#e0e0e0] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 text-sm text-black"
                placeholder="Email"
                required
              />
              
              <div className="relative w-[80%] ml-8">
                <motion.input
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-[#e0e0e0] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300 pr-12 text-black text-sm"
                  placeholder="Password"
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
              
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
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
                className="w-[80%] ml-8 bg-[#FFD700] text-[#111] py-3 px-6 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 relative overflow-hidden group"
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.15 }}
                >
                  Sign In
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFC700] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.15 }}
                />
              </motion.button>

              {/* Or Section */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex items-center justify-center w-[80%] ml-8 my-4"
              >
                <div className="flex-1 h-[1px] bg-[#e0e0e0]"></div>
                <span className="mx-4 text-[#666] text-sm">or</span>
                <div className="flex-1 h-[1px] bg-[#e0e0e0]"></div>
              </motion.div>

              {/* Social Login Buttons */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex gap-3 w-[80%] ml-8"
              >
                <motion.button 
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f5f5f5",
                    transition: {
                      duration: 0.15,
                      ease: "easeOut"
                    }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
                    transition: {
                      duration: 0.1,
                      ease: "easeOut"
                    }
                  }}
                  className="flex-1 bg-[#ebebeb] text-[#111] py-3 px-6 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 relative overflow-hidden group"
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  >
                    Google
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#ebebeb] to-[#e0e0e0] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.15 }}
                  />
                </motion.button>
                <motion.button 
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f5f5f5",
                    transition: {
                      duration: 0.15,
                      ease: "easeOut"
                    }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
                    transition: {
                      duration: 0.1,
                      ease: "easeOut"
                    }
                  }}
                  className="flex-1 bg-[#ebebeb] text-[#111] py-3 px-6 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 relative overflow-hidden group"
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  >
                    Facebook
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#ebebeb] to-[#e0e0e0] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.15 }}
                  />
                </motion.button>
              </motion.div>
            </form>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="mt-6 text-center text-xs text-[#666]"
            >
              Don't have an account? Contact administrator for access.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignIn; 