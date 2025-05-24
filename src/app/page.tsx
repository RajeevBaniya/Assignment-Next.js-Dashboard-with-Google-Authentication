'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="text-lg text-black font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }
  if (!session) {
    router.replace("/auth/signin");
    return null;
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-2 sm:px-4">
      {/* Full-page background image */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 16, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <div style={{backgroundImage: 'url(/images/home.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}} className="w-full h-full min-h-screen" />
        <div className="absolute inset-0 bg-cream/60" />
      </motion.div>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-cream rounded-xl shadow-lg border-2 border-cheese px-2 py-4 sm:px-6 sm:py-8 md:px-10 md:py-12 max-w-sm md:max-w-lg lg:max-w-xl w-full flex flex-col items-center"
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 300 }}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-tomato text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 shadow-lg border-4 border-white"
        >
          {session.user?.name?.[0]?.toUpperCase() || "U"}
        </motion.div>
        {/* Greeting */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 text-tomato text-center drop-shadow-lg tracking-tight">Hello, {session.user?.name?.toUpperCase()}!</h1>
        <p className="text-sm sm:text-base md:text-lg text-text text-center font-mono">Welcome to your PizzaPanel. You are now signed in with Google.</p>
      </motion.div>
    </div>
  );
} 