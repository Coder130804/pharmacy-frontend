"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Pill } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/medicines", label: "Medicines" },
  { href: "/medicines/add", label: "Add Medicine" },
  { href: "/billing", label: "Billing" },
  { href: "/reports", label: "Reports" },
  { href: "/help-support", label: "Help & Support" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 navbar-gradient backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
            <div className="icon-gradient flex h-10 w-10 items-center justify-center rounded-xl shadow-lg shadow-primary/20">
              <Pill className="h-5 w-5 text-white stroke-[2.5]" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-xl font-bold text-transparent">
              MediRX
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  pathname === link.href
                    ? "medical-gradient text-white shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-2 h-6 w-px bg-border" />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
