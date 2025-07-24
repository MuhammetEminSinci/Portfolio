// src/components/ui/Button.jsx
import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={
        "bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-md transition-colors " +
        className
      }
    >
      {children}
    </button>
  );
}
