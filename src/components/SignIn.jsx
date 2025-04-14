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
          <h1 className="text-[3rem] text-[#111] mb-8 font-extrabold ml-8">
            Sign In
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-[80%] ml-8 p-4 rounded-lg border-2 border-[#e0e0e0] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300"
              placeholder="Email"
              required
            />
            
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-[80%] ml-8 p-4 rounded-lg border-2 border-[#e0e0e0] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-300"
              placeholder="Password"
              required
            />
            
            <button
              type="submit"
              className="w-[80%] ml-8 bg-[#FFD700] text-[#111] py-4 px-8 rounded-lg text-base font-medium cursor-pointer hover:bg-[#FFC700] transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Sign In
            </button>

            {/* Or Section */}
            <div className="flex items-center justify-center w-[80%] ml-8 my-6">
              <div className="flex-1 h-[1px] bg-[#e0e0e0]"></div>
              <span className="mx-4 text-[#666]">or</span>
              <div className="flex-1 h-[1px] bg-[#e0e0e0]"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-4 w-[80%] ml-8">
              <button className="flex-1 bg-[#ebebeb] text-[#111] py-4 px-8 rounded-lg text-base font-bold cursor-pointer hover:bg-[#e0e0e0] transition-all duration-300">
                Google
              </button>
              <button className="flex-1 bg-[#ebebeb] text-[#111] py-4 px-8 rounded-lg text-base font-bold cursor-pointer hover:bg-[#e0e0e0] transition-all duration-300">
                Facebook
              </button>
            </div>
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