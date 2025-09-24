"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const buttonStyle =
    "cursor-pointer p-2 border rounded-md m-5 hover:border-blue-700 hover:text-blue-700";

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Optional: avoid flicker
  }

  if (status === "authenticated") {
    return null; // don't render anything if redirecting
  }

  return (
    <div>
      <button className={buttonStyle} onClick={() => signIn()}>
        Sign in
      </button>
      <br />
      <Link className={buttonStyle} href="/signup">
        Sign up
      </Link>
    </div>
  );
}
