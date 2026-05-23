export default function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl p-6 shadow-sm bg-white dark:bg-[#1e1e2e] transition-colors duration-300">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{title}</p>
      {children}
    </div>
  );
}