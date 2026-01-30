import React from "react";

const Button = ({ disabled, type, children, className, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full cursor-pointer font-medium rounded-lg  text-md px-5 py-2.5 text-center text-white
                focus:ring-4 focus:outline-none focus:ring-blue-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
