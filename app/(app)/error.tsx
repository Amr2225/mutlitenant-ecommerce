"use client";

import { useEffect } from "react";
import { Poppins } from "next/font/google";
import { AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center gap-6">
      <div className="flex items-center justify-center size-16 rounded-full bg-pink-50 border border-pink-200">
        <AlertTriangleIcon className="size-8 text-pink-400" />
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <h2 className={cn("text-2xl font-semibold tracking-tight", poppins.className)}>
          Something went wrong
        </h2>
        <p className="text-muted-foreground text-sm">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/60 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <Button
        onClick={reset}
        variant="outline"
        className="rounded-full px-8 border-black hover:bg-pink-400 hover:border-pink-400 transition-colors"
      >
        Try again
      </Button>
    </div>
  );
}
