import React from "react";
import { cn } from "@/lib/utils";
import { Clock, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";

interface EmptyStateProps {
  icon?: "clock" | "shield" | "sparkles" | "help";
  badgeText?: string;
  title: string;
  description: string;
  note?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  icon = "clock",
  badgeText = "In Progress",
  title,
  description,
  note,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  const iconMap = {
    clock: Clock,
    shield: ShieldAlert,
    sparkles: Sparkles,
    help: HelpCircle,
  };

  const IconComponent = iconMap[icon];

  return (
    <div
      className={cn(
        "bg-[#ffffff] border border-[#e6dfd1] rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm",
        className
      )}
    >
      <div className="mx-auto w-14 h-14 rounded-2xl bg-[#f7f4ec] border border-[#dfd6c4] flex items-center justify-center text-[#143e30] mb-4">
        <IconComponent className="w-7 h-7" aria-hidden="true" />
      </div>

      {badgeText && (
        <Badge variant="terracotta" size="sm" className="mb-3">
          {badgeText}
        </Badge>
      )}

      <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#103327] tracking-tight">
        {title}
      </h3>

      <p className="mt-2.5 text-sm sm:text-base text-[#4a5752] leading-relaxed">
        {description}
      </p>

      {note && (
        <div className="mt-4 p-3 rounded-lg bg-[#fcfbf8] border border-[#ede7db] text-xs text-[#7e8d87] text-left">
          <strong className="text-[#333e3a]">Editorial Notice:</strong> {note}
        </div>
      )}

      {actionLabel && actionHref && (
        <div className="mt-6">
          <Button href={actionHref} variant="outline" size="sm">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
