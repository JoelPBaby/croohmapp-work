import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
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
      className="flex justify-between items-center min-h-screen bg-white p-0 font-['Google_Sans']"
    >
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
        <div className="p-16 bg-white h-[89vh] w-[77vh] border-2 border-[#e0e0e0] rounded-[30px] flex flex-col justify-center mr-[25vh]">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[3rem] text-[#111] mb-8 font-bold ml-8"
          >
            Sign In
          </motion.h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.input
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-[80%] ml-8 p-4 rounded-lg border-2 border-[#e0e0e0] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300"
              placeholder="Email"
              required
            />
            
            <motion.input
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-[80%] ml-8 p-4 rounded-lg border-2 border-[#e0e0e0] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300"
              placeholder="Password"
              required
            />
            
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
              className="w-[80%] ml-8 bg-[#FFD700] text-[#111] py-4 px-8 rounded-lg text-base font-medium cursor-pointer transition-all duration-150 relative overflow-hidden group"
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
              className="flex items-center justify-center w-[80%] ml-8 my-6"
            >
              <div className="flex-1 h-[1px] bg-[#e0e0e0]"></div>
              <span className="mx-4 text-[#666]">or</span>
              <div className="flex-1 h-[1px] bg-[#e0e0e0]"></div>
            </motion.div>

            {/* Social Login Buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex gap-4 w-[80%] ml-8"
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
                className="flex-1 bg-[#ebebeb] text-[#111] py-4 px-8 rounded-lg text-base font-bold cursor-pointer transition-all duration-150 relative overflow-hidden group"
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
                className="flex-1 bg-[#ebebeb] text-[#111] py-4 px-8 rounded-lg text-base font-bold cursor-pointer transition-all duration-150 relative overflow-hidden group"
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
            className="mt-8 text-center text-[0.9rem] text-[#666]"
          >
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-[#111] font-medium hover:underline transition-colors duration-300"
            >
              Sign up
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignIn; 