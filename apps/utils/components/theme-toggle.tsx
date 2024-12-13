"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const toggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const x = event.clientX;
    const y = event.clientY;

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    if (document.startViewTransition) {
      try {
        const transition = document.startViewTransition(async () => {
          const isDark = theme === "dark";
          setTheme(isDark ? "light" : "dark");
        });

        await transition.ready;

        const animation = document.documentElement.animate(
          {
            clipPath:
              theme === "dark"
                ? [
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                    `circle(0px at ${x}px ${y}px)`,
                  ]
                : [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                  ],
          },
          {
            duration: 500,
            easing: "ease-in",
            pseudoElement:
              theme === "dark"
                ? "::view-transition-old(root)"
                : "::view-transition-new(root)",
          }
        );

        await animation.finished;
      } catch (e) {
        setTheme(theme === "dark" ? "light" : "dark");
      }
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className="relative">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
