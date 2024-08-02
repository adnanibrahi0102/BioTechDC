import axios from "axios";
import React, { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/baseUrl";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import {toast} from 'react-toastify'
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/v1/users/login`,
        formData,{
          withCredentials: true,
        }
      );
      dispatch(login({
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );
      toast.success('Logged in successfully!')
      setFormData({
        email: "",
        password: "",
      });
      localStorage.setItem("auth",JSON.stringify({
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      }))
      setLoading(false);
      if(response.data.user.role ===0){
        navigate('/user/bookings')
      }
      else{
        navigate('/dashboard')
      }
     
      
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message)
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0 bg-yellow-100">
      <div className="max-w-screen-xl bg-yellow-400 border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-yellow-200 text-black text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat  "
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/9243732/pexels-photo-9243732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-black">
                BioTech DC
              </h1>
              <p className="text-[12px] text-black">
                Hey enter your details to Login
              </p>
            </div>
            <form onSubmit={handleLogin} className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-black text-yellow-400 w-full py-4 rounded-lg hover:bg-yellow-800 hover:text-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">{loading? 'Loading...': 'Login'}</span>

                </button>
                <p className="mt-6 text-xs text-black text-center">
                  Dont't have an account?{" "}
                  <Link to="/signup">
                    <span className="text-blue-900 font-semibold">Sign Up</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
