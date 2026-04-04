import * as React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

// Define the props for the DestinationCard component
export interface DestinationCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  location: string;
  stats: string;
  href: string;
  /** Optional: override accent color (defaults to matcha palette). */
  themeColor?: string;
}

const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  ({ className, imageUrl, location, stats, href, themeColor, ...props }, ref) => {
    // Matcha palette defaults
    const accent = themeColor ?? "#44624a";

    return (
      <div
        ref={ref}
        style={{
          // CSS variables used by the overlay + button
          // @ts-ignore
          "--accent": accent,
        } as React.CSSProperties}
        className={cn("group h-full w-full", className)}
        {...props}
      >
        <a
          href={href}
          className={cn(
            "relative block h-full w-full overflow-hidden rounded-2xl",
            "shadow-[0_18px_50px_rgba(68,98,74,0.10)] ring-1 ring-[#44624a]/15",
            "transition-all duration-500 ease-in-out",
            "hover:scale-[1.02]",
          )}
          aria-label={`Explore details for ${location}`}
        >
          {/* Background Image with Parallax Zoom */}
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center",
              "transition-transform duration-700 ease-out",
              "group-hover:scale-110",
            )}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          {/* Matcha Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(68,98,74,0.92), rgba(68,98,74,0.55) 35%, rgba(241,235,225,0.05) 65%)",
            }}
          />

          {/* Content */}
          <div className="relative flex h-full flex-col justify-end p-6 text-[#f1ebe1]">
            <h3 className="font-serif text-3xl font-semibold tracking-tight">
              {location}
            </h3>
            <p className="mt-1 text-sm font-medium text-[#f1ebe1]/80">
              {stats}
            </p>

            {/* Explore Button */}
            <div
              className={cn(
                "mt-8 flex items-center justify-between",
                "rounded-lg border px-4 py-3",
                "bg-white/10 backdrop-blur-md",
                "border-white/20",
                "transition-all duration-300",
                "group-hover:bg-white/15",
              )}
            >
              <span className="text-xs font-semibold tracking-[0.18em]">
                Explore Now
              </span>
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </a>
      </div>
    );
  },
);

DestinationCard.displayName = "DestinationCard";

export { DestinationCard };
