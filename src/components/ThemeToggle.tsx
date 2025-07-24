import { useTheme } from "./ThemeProvider.utils";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="hover-glow rounded-full p-0 w-10 h-10 flex items-center justify-center group"
    >
      <div className="rounded-full bg-transparent p-2 group-hover:bg-primary/20 group-focus:bg-primary/20 group-active:bg-primary/20 transition-colors">
        {theme === "dark" ? (
          <Sun className="w-4 h-4 text-foreground group-hover:text-primary group-focus:text-primary group-active:text-primary transition-colors" />
        ) : (
          <Moon className="w-4 h-4 text-foreground group-hover:text-primary group-focus:text-primary group-active:text-primary transition-colors" />
        )}
      </div>
    </button>
  );
}