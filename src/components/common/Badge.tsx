import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "forest" | "ivory" | "terracotta" | "gold" | "outline" | "draft";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "forest",
  size = "md",
  ...props
}: BadgeProps) {
  const variantStyles = {
    forest: "bg-[#143e30] text-[#fcfbf8] border border-[#256f57]/30",
    ivory: "bg-[#ede7db] text-[#161e1b] border border-[#dfd6c4]",
    terracotta: "bg-[#c25e38]/10 text-[#a74e2d] border border-[#c25e38]/30 font-medium",
    gold: "bg-[#be9740]/15 text-[#8c671b] border border-[#be9740]/30 font-medium",
    outline: "bg-transparent text-[#222b27] border border-[#c8d1cd]",
    draft: "bg-amber-50 text-amber-800 border border-amber-300 font-semibold tracking-wide uppercase",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs rounded-full",
    md: "px-3 py-1 text-xs sm:text-sm rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 transition-colors font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
