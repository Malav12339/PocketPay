"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Balance({ amount }: { amount: string }) {
  const { data: session, update } = useSession();
  const [balance, setBalance] = useState(amount);

  const refreshBalance = async () => {
    if (!session?.user) return;
    try {
      const response = await fetch("http://localhost:3000/api/v1/account/balance");
      const data = await response.json();

      if (data.balance !== undefined) {
        setBalance(data.balance.toString());

        await update({
          ...session,
          user: {
            ...session?.user,
            balance: balance,
          },
        });
      }
    } catch (err) {
      console.error("error fetching balance: ", err);
    }
  };

  useEffect(() => {
    if (session?.user) {
      refreshBalance();
    }
  }, [session?.user.id]);

  useEffect(() => {
    window.addEventListener("balanceUpdated", refreshBalance);
    return () => window.removeEventListener("balanceUpdated", refreshBalance);
  }, [session]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 className="font-bold text-lg text-slate-800">Your Balance</h2>
      <p className="mt-2 sm:mt-0 text-xl font-semibold text-stone-800">
        ₹{balance}
      </p>
    </div>
  );
}

export default Balance;
