import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "terracotta" | "gold" | "ghost" | "forest";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  external,
  disabled,
  isLoading,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer select-none";

  const variantStyles = {
    primary: "bg-[#143e30] text-[#fcfbf8] hover:bg-[#0d281e] focus-visible:ring-[#143e30] shadow-sm shadow-[#143e30]/10",
    forest: "bg-[#143e30] text-[#fcfbf8] hover:bg-[#0d281e] focus-visible:ring-[#143e30] shadow-sm shadow-[#143e30]/10",
    secondary: "bg-[#ede7db] text-[#161e1b] hover:bg-[#dfd6c4] focus-visible:ring-[#143e30] border border-[#dfd6c4]",
    outline: "bg-transparent text-[#143e30] border-2 border-[#143e30] hover:bg-[#143e30] hover:text-[#fcfbf8] focus-visible:ring-[#143e30]",
    terracotta: "bg-[#c25e38] text-white hover:bg-[#a74e2d] focus-visible:ring-[#c25e38] shadow-sm shadow-[#c25e38]/20",
    gold: "bg-[#be9740] text-white hover:bg-[#9e792c] focus-visible:ring-[#be9740] shadow-sm shadow-[#be9740]/20",
    ghost: "bg-transparent text-[#222b27] hover:bg-[#ede7db]/50 focus-visible:ring-[#143e30]",
  };

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs sm:text-sm min-h-[38px]",
    md: "px-5 py-2.5 text-sm sm:text-base min-h-[44px]",
    lg: "px-6 py-3.5 text-base sm:text-lg min-h-[48px]",
  };

  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type || "button"}
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
