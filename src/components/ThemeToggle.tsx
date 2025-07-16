
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative w-16 h-8 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500 shadow-lg border-2 border-white/50"
      >
        <Sun className="h-5 w-5 text-white" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={toggleTheme}
        className={`relative w-16 h-8 rounded-full transition-all duration-500 shadow-lg border-2 border-white/50 hover:scale-110 ${
          theme === "light" 
            ? "bg-gradient-to-r from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500" 
            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        }`}
      >
        <div className={`absolute inset-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500 transform flex items-center justify-center ${
          theme === "dark" ? "translate-x-8" : "translate-x-0"
        }`}>
          {theme === "light" ? (
            <Sun className="h-4 w-4 text-orange-500 animate-wiggle" />
          ) : (
            <Moon className="h-4 w-4 text-indigo-600 animate-pulse" />
          )}
        </div>
        <span className="sr-only">
          {theme === "light" ? "Switch to Night Mode 🌙" : "Let there be Light ☀️"}
        </span>
      </Button>
      
      {/* Fun label */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <span className="text-xs font-comic font-bold text-purple-600 dark:text-purple-300">
          {theme === "light" ? "☀️ Light Mode" : "🌙 Night Mode"}
        </span>
      </div>
    </div>
  );
};

export default ThemeToggle;
