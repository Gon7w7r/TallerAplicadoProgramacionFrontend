module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "border-blue-500", "border-emerald-500", "border-amber-500",
    "bg-blue-50", "bg-emerald-50", "bg-amber-50",
    "hover:bg-blue-50", "hover:bg-emerald-50", "hover:bg-amber-50",
  ],
}