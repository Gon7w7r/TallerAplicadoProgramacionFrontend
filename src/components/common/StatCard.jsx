export default function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="w-64 rounded-2xl p-6 flex flex-col gap-4 shadow-sm cursor-default
      bg-white dark:bg-[#1e1e2e]
      hover:shadow-md hover:-translate-y-0.5
      transition-all duration-200">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${color}-50 dark:bg-${color}-900/30`}>
          <Icon className={`w-5 h-5 text-${color}-500`} />
        </div>
      </div>
      <p className={`text-4xl font-bold text-${color}-500`}>
        {value?.toLocaleString() ?? "—"}
      </p>
    </div>
  );
}