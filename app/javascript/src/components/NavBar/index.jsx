import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { setToLocalStorage } from "helpers/storage";
import React from "react";
import NavItem from "./NavItem";

const NavBar = () => {
  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({ authToken: null, email: null, userId: null });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:ml-6 lg:flex">
              <NavItem name="Dashboard" path="/dashboard" />
              <NavItem name="Create" path="/tasks/create" />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <a
              onClick={handleLogout}
              className="inline-flex items-center px-1 pt-1 ml-8 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-b-2 border-transparent hover:text-gray-700 focus:outline-none focus:text-gray-700"
            >
              Log Out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
