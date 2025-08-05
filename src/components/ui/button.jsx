// src/components/ui/button.jsx
import React from "react";

const Button = ({ children, className = "", onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-200 bg-teal-600 text-white hover:bg-teal-700 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };
