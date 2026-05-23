module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Existentes
    "border-blue-500", "border-emerald-500", "border-amber-500",
    "bg-blue-50", "bg-emerald-50", "bg-amber-50",
    "hover:bg-blue-50", "hover:bg-emerald-50", "hover:bg-amber-50",

    // Dashboard cards
    { pattern: /bg-(blue|emerald|purple|amber|pink)-(50|500|900)/ },
    { pattern: /bg-(blue|emerald|purple|amber|pink)-900\/30/ },
    { pattern: /border-(blue|emerald|purple|amber|pink)-(200|800)/ },
    { pattern: /text-(blue|emerald|purple|amber|pink)-500/ },
    { pattern: /hover:border-(blue|emerald|purple|amber|pink)-(200|800)/ },
    { pattern: /dark:hover:border-(blue|emerald|purple|amber|pink)-(200|800)/ },
  ],
}