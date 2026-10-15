import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "light",
  className,
  action,
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "mb-10 sm:mb-14",
        action
          ? "w-full max-w-5xl mx-auto text-left"
          : align === "center"
          ? "text-center max-w-3xl mx-auto"
          : "text-left max-w-4xl",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-3.5 inline-block",
            !action && align === "center" ? "mx-auto" : ""
          )}
        >
          <Badge
            variant={isDark ? "gold" : "terracotta"}
            size="md"
            className="font-medium tracking-wide"
          >
            {eyebrow}
          </Badge>
        </div>
      )}

      {action ? (
        <div>
          <h2
            className={cn(
              "text-2.5xl sm:text-3.5xl md:text-4xl font-serif font-bold tracking-tight leading-tight max-w-4xl",
              isDark ? "text-[#fcfbf8]" : "text-[#103327]"
            )}
          >
            {title}
          </h2>

          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            {subtitle && (
              <p
                className={cn(
                  "text-base sm:text-lg leading-relaxed font-normal max-w-2xl",
                  isDark ? "text-[#dfd6c4]" : "text-[#333e3a]"
                )}
              >
                {subtitle}
              </p>
            )}

            <div className="shrink-0 w-full sm:w-auto">{action}</div>
          </div>
        </div>
      ) : (
        <div>
          <h2
            className={cn(
              "text-2.5xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight leading-tight",
              isDark ? "text-[#fcfbf8]" : "text-[#103327]"
            )}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className={cn(
                "mt-3.5 text-base sm:text-lg leading-relaxed font-normal",
                isDark ? "text-[#dfd6c4]" : "text-[#333e3a]"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
