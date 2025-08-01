
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
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

          {/* Content Section - Mobile */}
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
              className="text-3xl text-[#111] mb-6 font-extrabold text-center"
            >
              Productive Mind
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-lg text-[#666] leading-relaxed mb-8 text-center px-4"
            >
              With only the features you need, Organic Mind is customized
              for individuals seeking a stress-free way to stay focused on
              their goals, projects, and tasks.
            </motion.p>
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
              onClick={handleGetStarted}
              className="w-full max-w-sm mx-auto bg-[#FFD700] text-[#111] border-none py-4 px-8 rounded-lg text-base font-medium cursor-pointer transition-all duration-150 relative overflow-hidden group block"
            >
              <motion.span
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
              >
                Get Started
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFC700] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.15 }}
              />
            </motion.button>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="text-center text-sm text-[#666] mt-6"
            >
              Already have an account?{' '}
              <a href="#" className="text-[#111] no-underline font-medium hover:underline">
                Sign in
              </a>
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
          <div className="p-16 bg-white h-[89vh] w-[77vh] border-2 border-[#e0e0e0] rounded-[30px] flex flex-col justify-center mr-[25vh]">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[3rem] text-[#111] mb-6 font-extrabold"
            >
              Productive Mind
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-[1.1rem] text-[#666] leading-relaxed mb-8 max-w-full px-4"
            >
              With only the features you need, Organic Mind is customized
              for individuals seeking a stress-free way to stay focused on
              their goals, projects, and tasks.
            </motion.p>
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
              onClick={handleGetStarted}
              className="bg-[#FFD700] text-[#111] border-none py-4 px-8 rounded-lg text-base font-medium cursor-pointer transition-all duration-150 w-[calc(100%-2rem)] mx-4 mb-4 relative overflow-hidden group"
            >
              <motion.span
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
              >
                Get Started
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFC700] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.15 }}
              />
            </motion.button>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-center text-[0.9rem] text-[#666]"
            >
              Already have an account?{' '}
              <a href="#" className="text-[#111] no-underline font-medium hover:underline">
                Sign in
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
