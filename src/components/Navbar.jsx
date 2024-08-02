import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from "framer-motion";


const Navbar = () => {
  const authStatus = useSelector((state) => state.auth);
  const isAuthenticated = authStatus.refreshToken;
  const userRole = authStatus.user?.role;

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
    navigate("/login");
    toast.success('Logged out successfully', { autoClose: 3000 });
  };

  const navItems = [
    { to: "/", label: "Home" },
    {to:"/contact",label:"Contact Us"},
    {to:"/about",label:"About Us"},
    {to:"/services",label:"Services"},
    {to:"/blog",label:"Blog"},

    !isAuthenticated && { to: "/login", label: "Login" },
    !isAuthenticated && { to: "/signup", label: "Signup" },
    isAuthenticated && userRole === 0 && { to: "/user/bookings", label: "Bookings" },
    isAuthenticated && userRole === 0 && { to: "/book-test", label: "Book Test" },
    isAuthenticated && userRole ===1 && {to:"/dashboard", label: "Dashboard"}
  ].filter(Boolean);

  const renderNavItems = () => (
    navItems.map((item) => (
      <li key={item.to}>
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            isActive
              ? "text-black font-bold transition duration-300 ease-in-out"
              : "text-gray-300 hover:text-black transition duration-300 ease-in-out"
          }
        >
          {item.label}
        </NavLink>
      </li>
    ))
  );

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const mobileLinkVars = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        ease: [0, 0.55, 0.45, 1],
        duration: 0.7,
      },
    },
  };

  const MobileNavLink = ({ title, href, onClick }) => (
    <motion.div
      variants={mobileLinkVars}
      className="text-5xl uppercase mb-1 text-black hover:underline"
      onClick={onClick}
    >
      <Link  onClick={toggleMenu} to={href}>{title}</Link>
    </motion.div>
  );

  return (
    <header>
      <nav className="flex justify-between items-center py-8 lg:py-4 px-2  bg-yellow-400">
        <div className="flex items-center gap-[1ch]">
          <div className="w-5 h-5 bg-yellow-400 rounded-full" />
          <span className="text-sm font-semibold tracking-widest">
            BioTech DC
          </span>
        </div>
        <div className="lg:flex hidden gap-12 text-md text-zinc-400 ">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold transition duration-300 ease-in-out"
                  : "text-gray-800 hover:text-black transition duration-300 ease-in-out"
              }
            >
              {item.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-gray-800 hover:text-black transition duration-300 ease-in-out"
            >
              Logout
            </button>

          )}
          
        </div>
        <div
          className="cursor-pointer lg:hidden text-md text-black"
          onClick={toggleMenu}
        >
          Menu
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-yellow-400 text-black p-10 z-10"
          >
            <div className="flex h-full flex-col ">
              <div className="flex justify-between">
                <h1 className="text-lg text-black">BioTech DC</h1>
                <p
                  className="cursor-pointer text-md text-black"
                  onClick={toggleMenu}
                >
                  Close
                </p>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center font-lora items-center gap-4 "
              >
                {navItems.map((link, index) => (
                  <div className="overflow-hidden" key={index}>
                    <MobileNavLink
                      title={link.label}
                      href={link.to}
                    />
                  </div>
                ))}
                {isAuthenticated && (
                  <div className="overflow-hidden">
                    <MobileNavLink
                      title="Logout"
                      href="/login"
                      onClick={handleLogout}
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
