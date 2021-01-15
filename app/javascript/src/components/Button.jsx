import React from "react";
import PropTypes from "prop-types";

const Button = ({ type = "button", buttonText, onClick, loading }) => {
  return (
    <div className="mt-6">
      <button
        type={type}
        onClick={onClick}
        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
      >
        {loading ? "Loading..." : buttonText}
      </button>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
export default Button;
