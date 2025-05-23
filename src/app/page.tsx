import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-white px-4 pt-1 sm:pt-3">
      <div className="bg-white rounded-xl shadow-lg px-4 py-6 sm:px-10 sm:py-12 max-w-xl w-full flex flex-col items-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-4 text-black text-center">Hello, {session.user?.name?.toUpperCase()}!</h1>
        <p className="text-base sm:text-lg text-black text-center font-mono">Welcome to your dashboard. You are now signed in with Google.</p>
      </div>
    </div>
  );
} 