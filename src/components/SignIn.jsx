import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
  };

  return (
    <div className="flex justify-between items-center min-h-screen bg-white p-0">
      {/* Image Section */}
      <div className="w-1/2 flex flex-col justify-center">
        <div className="relative p-8 flex justify-end items-center h-auto bg-white">
          <img 
            src="/land.png" 
            alt="Organic shapes illustration" 
            className="w-[79vh] h-[89vh] max-w-[10000px] -mr-50 rounded-[30px] block"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-1/2 flex flex-col justify-center">
        <div className="p-16 bg-white h-[89vh] w-[77vh] border-2 border-[#e0e0e0] rounded-[30px] flex flex-col justify-center mr-[25vh]">
          <h1 className="text-[3rem] text-[#111] mb-12 font-extrabold">
            Sign In
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-[1.1rem] text-[#666]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-lg border-2 border-[#e0e0e0] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-[1.1rem] text-[#666]">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 rounded-lg border-2 border-[#e0e0e0] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#FFD700] text-[#111] py-4 px-8 rounded-lg text-base font-medium cursor-pointer hover:bg-[#FFC700] transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Sign In
            </button>
          </form>
          
          <p className="mt-8 text-center text-[0.9rem] text-[#666]">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-[#111] font-medium hover:underline transition-colors duration-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 