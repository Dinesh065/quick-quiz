/**
 * Navbar Component
 * 
 * This component provides navigation for the quiz application, 
 * featuring a responsive design with a mobile menu toggle.
 * 
 * Features:
 * - Dynamic styling to highlight active navigation links.
 * - Mobile-friendly menu using a hamburger icon.
 * - Navigation to Home and Progress pages.
 */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaTrophy, FaBars, FaTimes } from "react-icons/fa"; 

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to dynamically set classes based on current route
  const getLinkClass = (path) => 
    `flex items-center gap-2 px-6 py-2 text-white rounded-lg border-2 border-transparent 
    ${location.pathname === path ? "border-yellow-300 text-yellow-300" : "hover:border-yellow-300 hover:text-yellow-300"} 
    transition-all duration-300`;

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 shadow-md flex justify-between items-center relative z-10">
      <h1 className="text-2xl font-bold">🎮 Quick Quiz</h1>

      {/* Mobile Hamburger Menu */}
      <div className="block lg:hidden">
        <button onClick={toggleMobileMenu} className="text-2xl">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu for Desktop and Mobile */}
      <ul className={`lg:flex lg:flex-row lg:space-x-6 lg:items-center space-y-4 lg:space-y-0 absolute lg:static top-20 left-0 w-full lg:w-auto ${isMobileMenuOpen ? "block" : "hidden"} p-6 lg:p-0 rounded-lg shadow-lg lg:shadow-none`}>
        <li>
          <Link 
            to="/" 
            className={getLinkClass("/")}
          >
            <FaHome className="text-2xl" />
            <span className="ml-2">Home</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/progress" 
            className={getLinkClass("/progress")}
          >
            <FaTrophy className="text-2xl" />
            <span className="ml-2">Progress</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;