'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { SignInModal } from "./SignInModal";

export function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-2 sm:px-6">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="text-2xl font-extrabold text-black tracking-tight">Dashboard</Link>
          {/* Desktop nav */}
          <div className="hidden md:flex flex-1 justify-center">
            {session && (
              <div className="flex space-x-6">
                <NavLink href="/" active={pathname === "/"}>Home</NavLink>
                <NavLink href="/orders" active={pathname === "/orders"}>Pizza Orders</NavLink>
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          {session && (
            <button
              className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-7 h-7 flex flex-col justify-center items-center">
                <span className={`block absolute h-0.5 w-6 bg-black transform transition duration-300 ease-in-out ${menuOpen ? 'rotate-45 top-3.5' : 'top-2'}`}></span>
                <span className={`block absolute h-0.5 w-6 bg-black transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'top-3.5'}`}></span>
                <span className={`block absolute h-0.5 w-6 bg-black transform transition duration-300 ease-in-out ${menuOpen ? '-rotate-45 top-3.5' : 'top-5'}`}></span>
              </div>
            </button>
          )}
          {session && (
            <button
              onClick={() => signOut()}
              className="ml-2 px-4 py-2 text-white text-base font-semibold rounded-lg bg-black hover:bg-gray-800 active:bg-gray-700 transition-colors duration-150 shadow-sm hidden md:block"
            >
              Sign Out
            </button>
          )}
          {/* Show Sign In button if not signed in */}
          {!session && (
            <button
              onClick={() => setSignInOpen(true)}
              className="ml-2 px-4 py-2 text-white text-base font-semibold rounded-lg bg-black hover:bg-gray-800 active:bg-gray-700 transition-colors duration-150 shadow-sm"
            >
              Sign In
            </button>
          )}
        </div>
        {/* Mobile nav overlay */}
        {session && menuOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMenuOpen(false)}></div>
            <div className="fixed top-20 left-0 w-full z-50 animate-fadeIn flex justify-center">
              <div className="flex flex-col items-center gap-3 bg-gray-50 backdrop-blur-md py-6 px-3 shadow-lg rounded-2xl w-full max-w-xs mx-auto">
                <NavLink href="/" active={pathname === "/"} onClick={() => setMenuOpen(false)} mobile>
                  Home
                </NavLink>
                <div className="w-2/3 h-px bg-gray-200 my-1" />
                <NavLink href="/orders" active={pathname === "/orders"} onClick={() => setMenuOpen(false)} mobile>
                  Pizza Orders
                </NavLink>
                <button
                  onClick={() => { setMenuOpen(false); signOut(); }}
                  className="w-full mt-3 px-3 py-2 text-base font-bold text-white rounded-lg bg-black hover:bg-gray-800 active:bg-gray-700 transition-colors duration-150 shadow-sm"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}
        {/* Sign In Modal */}
        {!session && signInOpen && (
          <SignInModal onClose={() => setSignInOpen(false)} />
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, active, children, onClick, mobile }: { href: string; active: boolean; children: React.ReactNode; onClick?: () => void; mobile?: boolean }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center px-3 py-2 text-base font-semibold transition-colors border-b-2 duration-200 ${active ? 'border-black text-black' : 'border-transparent text-black hover:border-black'} ${mobile ? 'text-xl w-full justify-center' : ''}`}
    >
      {children}
    </Link>
  );
}

// Add fadeIn animation
// In your global CSS (e.g., src/styles/globals.css), add:
// @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
// .animate-fadeIn { animation: fadeIn 0.25s ease; }

// Add fadeIn animation
// In your global CSS (e.g., src/styles/globals.css), add:
// @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
// .animate-fadeIn { animation: fadeIn 0.25s ease; } 