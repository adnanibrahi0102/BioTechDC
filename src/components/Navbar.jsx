import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import {toast} from 'react-toastify';

const Navbar = () => {
  const authStatus = useSelector((state) => state.auth);
  const isAuthenticated = authStatus.refreshToken;
  const userRole = authStatus.user?.role;

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth")
    navigate("/login");
    toast.success('Logged out successfully', {autoClose: 3000});
  };

  const activeClassName = "text-black font-bold";

  return (
    <nav className="bg-blue-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-lg font-semibold text-white">
          BioTech DC
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-200 focus:outline-none focus:text-gray-400"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <div className="hidden md:flex md:items-center">
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${activeClassName} text-white hover:text-black transition duration-300 ease-in-out`
                    : "text-white hover:text-black transition duration-300 ease-in-out"
                }
              >
                Home
              </NavLink>
            </li>
            {!isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} text-white hover:text-black transition duration-300 ease-in-out`
                        : "text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} text-white hover:text-black transition duration-300 ease-in-out`
                        : "text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
            {isAuthenticated && userRole === 0 && (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} text-white hover:text-black transition duration-300 ease-in-out`
                        : "text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-black transition duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {isAuthenticated && userRole === 1 && (
              <>
                <li>
                  <NavLink
                    to="/create-test"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} text-white hover:text-black transition duration-300 ease-in-out`
                        : "text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Create Test
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/all-tests"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} text-white hover:text-black transition duration-300 ease-in-out`
                        : "text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                   Manage Tests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/create-patient"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} text-white hover:text-black transition duration-300 ease-in-out`
                        : "text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Create Patient
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/All-patients"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} block text-white hover:text-black transition duration-300 ease-in-out`
                        : "block text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Manage Patients
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} block text-white hover:text-black transition duration-300 ease-in-out`
                        : "block text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/all-reports"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} text-white hover:text-black transition duration-300 ease-in-out`
                        : "text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    All Reports
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-black transition duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-800 shadow-sm">
          <ul className="py-2 px-4 space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${activeClassName} block text-white hover:text-black transition duration-300 ease-in-out`
                    : "block text-white hover:text-black transition duration-300 ease-in-out"
                }
              >
                Home
              </NavLink>
            </li>
            {!isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} block text-white hover:text-black transition duration-300 ease-in-out`
                        : "block text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} block text-white hover:text-black transition duration-300 ease-in-out`
                        : "block text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
            {isAuthenticated && userRole === 0 && (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} block text-white hover:text-black transition duration-300 ease-in-out`
                        : "block text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block text-white hover:text-black transition duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {isAuthenticated && userRole === 1 && (
              <>
                <li>
                  <NavLink
                    to="/create-test"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} block text-white hover:text-black transition duration-300 ease-in-out`
                        : "block text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Create Test
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/all-tests"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} text-white hover:text-black transition duration-300 ease-in-out`
                        : "text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                   Manage Tests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/create-patient"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} block text-white hover:text-black transition duration-300 ease-in-out`
                        : "block text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Create Patient
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/All-patients"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} block text-white hover:text-black transition duration-300 ease-in-out`
                        : "block text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Manage Patients
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} block text-white hover:text-black transition duration-300 ease-in-out`
                        : "block text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/all-reports"
                    className={({ isActive }) =>
                      isActive
                        ? `${activeClassName} block text-white hover:text-black transition duration-300 ease-in-out`
                        : "block text-white hover:text-black transition duration-300 ease-in-out"
                    }
                  >
                   All Reports
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block text-white hover:text-black transition duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
