'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log non-sensitive client error notification for debugging
    console.error('Unhandled Summit Application Error:', error?.message || error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-xl w-full text-center space-y-8 p-8 sm:p-12 rounded-2xl bg-white border border-[#143e30]/10 shadow-xl shadow-[#143e30]/5">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#faeee8] text-[#c25e38] mx-auto border border-[#c25e38]/20">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div className="space-y-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#c25e38] bg-[#c25e38]/10 rounded-full">
            Application Recovery
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#143e30]">
            An Unexpected System Error Occurred
          </h1>
          <p className="text-sm sm:text-base text-[#4a5752] leading-relaxed">
            The summit application encountered a temporary processing interruption. Your data has not been lost. Please try reloading this section or return to the main summit portal.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#143e30] hover:bg-[#1b5341] text-white font-medium text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#143e30] focus:ring-offset-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ede7db]/50 hover:bg-[#ede7db] text-[#143e30] font-medium text-sm transition-colors border border-[#143e30]/15 focus:outline-none focus:ring-2 focus:ring-[#143e30] focus:ring-offset-2"
          >
            Return to Homepage
          </Link>
        </div>

        <div className="border-t border-[#ede7db] pt-4 text-xs text-[#7e8d87]">
          If this issue persists, please reach our technical helpdesk at{' '}
          <a
            href="mailto:startupjathara@giet.edu"
            className="text-[#143e30] font-semibold underline hover:text-[#c25e38]"
          >
            startupjathara@giet.edu
          </a>
        </div>
      </div>
    </div>
  );
}
