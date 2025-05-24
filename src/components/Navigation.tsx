'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { SignInModal } from "./SignInModal";

export function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [userName, setUserName] = useState(session?.user?.name || "");
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
        setEditingName(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileOpen]);

  return (
    <nav className="bg-crust backdrop-blur-md shadow-md border-b border-cheese sticky top-0 z-50">
      <div className="max-w-full mx-auto px-1 sm:px-3">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="text-xl font-extrabold text-tomatoHover tracking-tight">PizzaPanel</Link>
          {/* Desktop nav */}
          <div className="hidden md:flex flex-1 justify-center">
            {session && (
              <div className="flex space-x-4">
                <NavLink href="/" active={pathname === "/"}>Home</NavLink>
                <NavLink href="/orders" active={pathname === "/orders"}>Pizza Orders</NavLink>
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          {session && (
            <button
              className="flex md:hidden ml-1 p-1.5 rounded focus:outline-none focus:ring-2 focus:ring-tomato items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6 text-tomatoHover" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          {/* User Profile Dropdown (desktop only) */}
          {session && (
            <div className="relative ml-2 hidden md:flex" ref={profileRef}>
              <button
                className="flex items-center justify-center w-9 h-9 rounded-full bg-tomatoHover text-white font-bold text-base shadow hover:opacity-90 focus:outline-none"
                onClick={() => setProfileOpen((v) => !v)}
                aria-label="Open user menu"
              >
                {session.user?.name?.[0]?.toUpperCase() || "U"}
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-basil border-2 border-white rounded-full"></span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl p-4 z-50 flex flex-col items-center animate-fadeIn">
                  <div className="flex flex-col items-center mb-3">
                    <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-tomatoHover text-white text-2xl font-bold mb-1">
                      {session.user?.name?.[0]?.toUpperCase() || "U"}
                      <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-basil border-2 border-white rounded-full"></span>
                    </div>
                    {editingName ? (
                      <input
                        className="mt-1 px-2 py-1 rounded border border-cheese text-center text-base font-bold text-tomato focus:outline-none focus:ring-2 focus:ring-tomato"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        onBlur={() => setEditingName(false)}
                        autoFocus
                      />
                    ) : (
                      <div
                        className="text-lg font-extrabold text-tomato cursor-pointer text-center"
                        onClick={() => setEditingName(true)}
                        title="Click to edit name"
                      >
                        {userName?.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="w-full border-t border-cheese my-2"></div>
                  <button
                    onClick={() => signOut()}
                    className="w-full mt-2 px-3 py-2 text-white text-base font-semibold rounded-lg bg-tomatoHover hover:bg-tomato active:bg-tomato/80 transition-colors duration-150 shadow-sm"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Show Sign In button if not signed in */}
          {!session && (
            <button
              onClick={() => setSignInOpen(true)}
              className="ml-1 px-3 py-1.5 text-white text-base font-semibold rounded-lg bg-tomatoHover hover:bg-tomato active:bg-tomato/80 transition-colors duration-150 shadow-sm"
            >
              Sign In
            </button>
          )}
        </div>
        {/* Mobile nav overlay */}
        {session && menuOpen && (
          <>
            <div className="fixed top-14 inset-x-0 bottom-0 bg-tomato/40 z-40" onClick={() => setMenuOpen(false)}></div>
            <div className="fixed top-14 left-0 w-full z-50 animate-fadeIn flex justify-center">
              <div className="flex flex-col items-center gap-2 bg-cream backdrop-blur-md py-3 px-1.5 shadow-lg rounded-2xl w-full max-w-[210px] mx-auto">
                <NavLink href="/" active={pathname === "/"} onClick={() => setMenuOpen(false)} mobile>
                  Home
                </NavLink>
                <div className="w-2/3 h-px bg-cheese my-1" />
                <NavLink href="/orders" active={pathname === "/orders"} onClick={() => setMenuOpen(false)} mobile>
                  Pizza Orders
                </NavLink>
                <button
                  onClick={() => { setMenuOpen(false); signOut(); }}
                  className="w-11/12 mx-auto mt-2 px-2.5 py-1.5 text-white text-base font-bold rounded-lg bg-tomatoHover hover:bg-tomato active:bg-tomato/80 transition-colors duration-150 shadow-sm"
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
 