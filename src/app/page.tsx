import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-2 sm:px-4">
      {/* Full-page background image */}
      <div className="absolute inset-0 z-0">
        <div style={{backgroundImage: 'url(/images/home.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}} className="w-full h-full min-h-screen" />
        <div className="absolute inset-0 bg-cream/60" />
      </div>
      {/* Content */}
      <div className="relative z-10 bg-cream rounded-xl shadow-lg border-2 border-cheese px-2 py-4 sm:px-6 sm:py-8 md:px-10 md:py-12 max-w-sm md:max-w-lg lg:max-w-xl w-full flex flex-col items-center">
        {/* Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-tomato text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 shadow-lg border-4 border-white">
          {session.user?.name?.[0]?.toUpperCase() || "U"}
        </div>
        {/* Greeting */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 text-tomato text-center drop-shadow-lg tracking-tight">Hello, {session.user?.name?.toUpperCase()}!</h1>
        <p className="text-sm sm:text-base md:text-lg text-text text-center font-mono">Welcome to your PizzaPanel. You are now signed in with Google.</p>
      </div>
    </div>
  );
} 