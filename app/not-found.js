'use client';
import React from 'react';
import { Home, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NotFound() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-lg mx-auto text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100/50 p-8 sm:p-10">
        {/* Icon */}
        <AlertCircle className="w-16 h-16 sm:w-20 sm:h-20 text-[var(--teal)] mx-auto mb-6" />

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--teal)] mb-4">
          404 - Page Not Found
        </h1>

        {/* Message */}
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-8 leading-relaxed">
          Oops! It looks like the page you're looking for doesn't exist or has been moved. Let's get you back to exploring Quetta!
        </p>

        {/* Redirect Button */}
        <button
          onClick={handleRedirect}
          className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 border border-[var(--bronze)] text-[var(--foreground)] text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl hover:bg-[var(--bronze)] transform hover:scale-105 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Back to Home</span>
        </button>

        {/* Toast Container */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(0,0,0)_1px,_transparent_0)] bg-[length:24px_24px]" />
      </div>
    </div>
  );
}