export default function CrudList({ items, selected, onSelect, getKey, getLabel }) {
  if (items.length === 0) return (
    <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
      No hay registros.
    </p>
  );

  return (
    <div className="rounded-2xl shadow-sm overflow-hidden
      bg-white dark:bg-[#1e1e2e] transition-colors duration-300">
      {items.map((item) => {
        const isSelected = getKey(selected) === getKey(item);
        return (
          <div
            key={getKey(item)}
            onClick={() => onSelect(item)}
            className={`
              px-4 py-3 text-sm cursor-pointer border-b last:border-0
              border-gray-100 dark:border-gray-700 transition-colors
              ${isSelected
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"}
            `}
          >
            {getLabel(item)}
          </div>
        );
      })}
    </div>
  );
}