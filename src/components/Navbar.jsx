import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/useTheme";
import PropTypes from "prop-types";

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        relative text-sm uppercase tracking-wider font-medium
        ${
          isActive
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
        } transition-colors
      `}
      aria-current={({ isActive }) => (isActive ? "page" : undefined)}
    >
      {({ isActive }) => (
        <motion.span className="relative py-2" whileHover={{ scale: 1.05 }}>
          {children}
          {isActive && (
            <motion.span
              layoutId="underline"
              className="absolute left-0 right-0 bottom-0 h-0.5 bg-indigo-600"
              initial={false}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.6,
              }}
            />
          )}
        </motion.span>
      )}
    </NavLink>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const menuItems = [
    { title: "Trang chủ", to: "/" },
    { title: "Giới thiệu", to: "/about" },
    { title: "Dự án", to: "/projects" },
    { title: "Liên hệ", to: "/contact" },
    { title: "Bài tập", to: "/exercise" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 
      ${
        scrolled
          ? "glass-effect glass-noise shadow-xl"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="px-6">
        <div className="flex items-center justify-between h-20 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer"
            role="banner"
          >
            <span className="font-mono flex items-center gap-1">
              <span className="text-green-500 dark:text-green-400 animate-pulse">{">"}</span>
              <span className="relative">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent font-bold">
                  Portfolio
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent font-bold blur-sm opacity-50 animate-pulse">
                  Portfolio
                </span>
              </span>
              <span className="inline-block w-2 h-5 bg-purple-600 animate-pulse ml-0.5"></span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8" role="menubar">
            {menuItems.map((item) => (
              <NavItem key={item.title} to={item.to}>
                {item.title}
              </NavItem>
            ))}

            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={darkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
              aria-pressed={darkMode}
              title={darkMode ? "Chế độ sáng" : "Chế độ tối"}
            >
              {darkMode ? <FiSun size={20} aria-hidden="true" /> : <FiMoon size={20} aria-hidden="true" />}
            </motion.button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileTap={{ scale: 0.95 }}
              aria-label={darkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
              aria-pressed={darkMode}
              title={darkMode ? "Chế độ sáng" : "Chế độ tối"}
            >
              {darkMode ? <FiSun size={20} aria-hidden="true" /> : <FiMoon size={20} aria-hidden="true" />}
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
                p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              whileTap={{ scale: 0.95 }}
              aria-label={isOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <HiX size={24} aria-hidden="true" /> : <HiMenuAlt3 size={24} aria-hidden="true" />}
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        id="mobile-menu"
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
        role="menu"
        aria-hidden={!isOpen}
      >
        <div className="px-6 py-4 space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.to}
              className={({ isActive }) => `
                block py-2 text-sm font-medium rounded-lg px-4
                ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/50"
                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                }
              `}
              onClick={() => setIsOpen(false)}
              role="menuitem"
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
