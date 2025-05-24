export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-cream px-4 pt-1 sm:pt-3">
      <div className="max-w-xl w-full flex flex-col items-center bg-cream border-2 border-cheese rounded-xl shadow-lg px-4 py-6 sm:px-10 sm:py-12">
        <h1 className="text-xl sm:text-3xl lg:text-5xl font-extrabold text-tomato mb-3 text-center tracking-tight whitespace-nowrap">Welcome to PizzaPanel</h1>
        <p className="text-sm sm:text-base lg:text-xl text-text text-center mb-4">Sign in to access your personalized PizzaPanel and manage your pizza orders.</p>
        <p className="text-xs sm:text-base lg:text-lg text-cheese text-center">Click the <span className="font-semibold text-tomato">Sign In</span> button in the top right to get started.</p>
      </div>
    </div>
  );
} 