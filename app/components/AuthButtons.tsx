"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingButton from "./LoadingButton";
import { ArrowRight } from "lucide-react";

export default function AuthButtons() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const buttonClass =
    "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer";

  if (status === "loading") {
    return (
      <LoadingButton
        text="Loading..."
        onClick={() => {}}
        className={`${buttonClass} opacity-50 cursor-not-allowed`}
      />
    );
  }

  if (status === "authenticated") {
    return null;
  }

  return (
    <LoadingButton
      text={
        <div className="flex items-center space-x-2">
          <span>Sign In</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      }
      onClick={() => signIn()}
      className={buttonClass}
    />
  );
}
