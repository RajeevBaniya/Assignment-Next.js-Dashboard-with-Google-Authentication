export default function SignIn() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center lg:justify-start overflow-hidden px-2 sm:px-4 lg:pl-12 xl:pl-24">
      {/* Full-page background image */}
      <div className="absolute inset-0 z-0">
        <div style={{backgroundImage: 'url(/images/sign.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}} className="w-full h-full min-h-screen" />
        <div className="absolute inset-0 bg-cream/60" />
      </div>
      {/* Content */}
      <div className="relative z-10 bg-cream rounded-xl shadow-lg border-2 border-cheese px-2 py-4 sm:px-6 sm:py-8 md:px-10 md:py-12 max-w-sm md:max-w-lg lg:max-w-xl w-full flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 text-tomato text-center drop-shadow-lg tracking-tight uppercase">Welcome to PizzaPanel</h1>
        <p className="text-sm sm:text-base md:text-lg text-text text-center font-mono mb-2">Sign in to access your personalized PizzaPanel and manage your pizza orders.</p>
        <p className="text-xs sm:text-base md:text-lg text-brown-700 text-center font-mono">Click the <span className="font-semibold text-tomato">Sign In</span> button in the top right to get started.</p>
      </div>
    </div>
  );
} 