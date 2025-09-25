"use client";

import { useState, ReactNode } from "react";

interface LoadingButtonProps {
  text: ReactNode;
  onClick: () => void;
  className?: string;
}

export default function LoadingButton({ text, onClick, className }: LoadingButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!loading) {
      setLoading(true);
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`rounded-full font-semibold border-2 border-white/30 hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2 
        ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} 
        ${className}`}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : null}
      {text}
    </button>
  );
}
