"use client";

import { Pill } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="icon-gradient flex h-6 w-6 items-center justify-center rounded shadow-sm">
              <Pill className="h-3 w-3 text-white stroke-[2.5]" />
            </div>
            <span className="text-sm font-medium">MediRX</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
