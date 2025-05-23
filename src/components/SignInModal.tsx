import { useEffect } from "react";
import { createPortal } from "react-dom";
import { signIn } from "next-auth/react";

export function SignInModal({ onClose }: { onClose: () => void }) {
  //To  Prevent background scroll 
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-4 sm:p-8 flex flex-col items-center animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-black text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">Sign in with Google</h2>
        <p className="text-gray-500 mb-6 text-center text-sm sm:text-base">Sign in to the app securely with Google authentication.</p>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex items-center justify-center w-full bg-black text-white font-semibold rounded-lg px-4 sm:px-6 py-3 text-base sm:text-lg shadow hover:bg-gray-800 transition-colors duration-150"
        >
          <svg className="w-6 h-6 mr-2" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.69 30.18 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.98 6.19C12.13 13.99 17.57 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.91-2.18 5.38-4.65 7.04l7.19 5.59C43.98 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.28c-1.13-3.36-1.13-6.99 0-10.35l-7.98-6.19C.99 16.09 0 19.92 0 24c0 4.08.99 7.91 2.69 12.26l7.98-6.19z"/><path fill="#EA4335" d="M24 48c6.18 0 11.64-2.05 15.53-5.59l-7.19-5.59c-2.01 1.35-4.59 2.15-8.34 2.15-6.43 0-11.87-4.49-13.33-10.55l-7.98 6.19C6.73 42.18 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
          <span className="truncate">Sign in with Google</span>
        </button>
      </div>
    </div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(modal, document.body);
} 