"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const session = useSession()
  const buttonStyle = "cursor-pointer p-2 border rounded-md m-5 hover:border-blue-700 hover:text-blue-700"

  return (
    <div>
      {session.status === "authenticated" && <div>
        <br />
        <p>{JSON.stringify(session.data.user)}</p> 
        <br />
        <Link className={buttonStyle} href="/dashboard">GO TO DASHBOARD</Link> <br />
        <button className={buttonStyle} onClick={() => signOut()}>Log out</button>
      </div>}

      {session.status === "unauthenticated" && <div>
        <button className={buttonStyle} onClick={() => signIn()}>Sign in</button>
        <br /> 
        {/* <button className={buttonStyle} onClick={() => redirect("/signup")}>Sign up</button> */}
        <Link className={buttonStyle} href="/signup">Sign up</Link>
        </div>}
      
    </div>
  );
}
