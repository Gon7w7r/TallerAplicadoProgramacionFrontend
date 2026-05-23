export default function CrudTable({ columns, children, empty = "No hay registros." }) {
  return (
    <section className="w-full rounded-2xl shadow-sm overflow-hidden
      bg-white dark:bg-[#1e1e2e] transition-colors duration-300">

      <div className={`grid grid-cols-${columns.length} px-4 py-2 border-b
        border-gray-100 dark:border-gray-700`}
        style={{ gridTemplateColumns: columns.map((c) => c.width ?? "1fr").join(" ") }}
      >
        {columns.map((col) => (
          <span key={col.label} className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">
            {col.label}
          </span>
        ))}
      </div>

      {children ?? (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
          {empty}
        </p>
      )}

    </section>
  );
}