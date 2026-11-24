"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Both icons are rendered and swapped with the `dark:` variant so the
  // server and client markup match (no hydration flash or mismatch).
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="size-5 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" aria-hidden />
      <Moon className="absolute size-5 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" aria-hidden />
    </Button>
  );
}
