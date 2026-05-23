export default function CrudSection({ title, children }) {
  return (
    <section className="w-full rounded-2xl p-6 flex flex-col gap-3 shadow-sm
      bg-white dark:bg-[#1e1e2e] transition-colors duration-300">
      {title && (
        <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
          {title}
        </p>
      )}
      {children}
    </section>
  );
}