"use client";

import { useRouter } from "next/navigation";
import LoadingButton from "./LoadingButton";
import { ArrowRight } from "lucide-react";

export default function HeroButtons() {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <LoadingButton
        text={
          <div className="flex items-center space-x-2">
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        }
        onClick={() => router.push("/signup")}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer"
      />
    </div>
  );
}
