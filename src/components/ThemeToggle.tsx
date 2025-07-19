import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="group hover-glow rounded-full p-0 w-10 flex items-center justify-center"
    >
      <div className="rounded-full bg-transparent group-hover:bg-primary/20 group-focus:bg-primary/20 group-active:bg-primary/20 relative transition-colors">
        <Sun className="h-4 w-4 text-foreground group-hover:text-primary group-focus:text-primary group-active:text-primary transition-colors rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute inset-0 h-4 w-4 text-foreground group-hover:text-primary group-focus:text-primary group-active:text-primary transition-colors rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}