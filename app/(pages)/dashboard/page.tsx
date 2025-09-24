import { fetchUsers } from "@/app/api/v1/user/route";
import Appbar from "@/app/components/Appbar";
import Balance from "@/app/components/Balance";
import Users from "@/app/components/Users";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  let users: UserType[] = [];

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <p className="text-lg text-slate-700 mb-4">Login to send money...</p>
        <Link
          className="px-4 py-2 bg-stone-800 text-white rounded-md hover:bg-stone-950 transition"
          href="/auth/signin"
        >
          SIGN IN
        </Link>
      </div>
    );
  }

  try {
    users = await fetchUsers("");
  } catch (e) {
    console.error("error fetching users: ", e);
    return <div className="p-8 text-red-600">Internal server error</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Appbar userName={session.user.firstName} />

      <main className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        {/* Balance Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Balance amount={JSON.stringify(session.user.balance)} />
        </div>

        {/* Users Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Users users={users} />
        </div>
      </main>
    </div>
  );
}
