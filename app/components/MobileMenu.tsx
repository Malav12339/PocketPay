"use client";
import { signIn } from "next-auth/react";

interface MobileMenuProps {
  isOpen: boolean;
}

export default function MobileMenu({ isOpen }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-black/90 backdrop-blur-lg">
      <div className="px-4 py-6 space-y-4">
        <a href="#features" className="block hover:text-blue-400 transition-colors cursor-pointer">Features</a>
        <a href="#security" className="block hover:text-blue-400 transition-colors cursor-pointer">Security</a>
        <a href="#about" className="block hover:text-blue-400 transition-colors cursor-pointer">About</a>
        <button 
          onClick={() => signIn()}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-full transition-all duration-300 cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}