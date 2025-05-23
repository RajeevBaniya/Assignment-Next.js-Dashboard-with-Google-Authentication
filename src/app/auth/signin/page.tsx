export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-white px-4 pt-1 sm:pt-3">
      <div className="max-w-xl w-full flex flex-col items-center">
        <h1 className="text-xl sm:text-3xl lg:text-5xl font-extrabold text-black mb-3 text-center tracking-tight whitespace-nowrap">Welcome to the Dashboard</h1>
        <p className="text-sm sm:text-base lg:text-xl text-gray-500 text-center mb-4">Sign in to access your personalized dashboard and manage your pizza orders.</p>
        <p className="text-xs sm:text-base lg:text-lg text-gray-400 text-center">Click the <span className="font-semibold text-black">Sign In</span> button in the top right to get started.</p>
      </div>
    </div>
  );
} 