import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function DarkModeToggle() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        relative flex items-center w-14 h-7 rounded-full p-1 transition-colors duration-300
        ${dark ? "bg-[#1A2E4A]" : "bg-gray-300"}
      `}
      aria-label="Toggle dark mode"
    >
      <span
        className={`
          absolute w-5 h-5 rounded-full flex items-center justify-center
          bg-white shadow-md transition-transform duration-300
          ${dark ? "translate-x-7" : "translate-x-0"}
        `}
      >
        {dark
          ? <Moon className="w-3 h-3 text-[#1A2E4A]" />
          : <Sun className="w-3 h-3 text-yellow-500" />
        }
      </span>
    </button>
  );
}