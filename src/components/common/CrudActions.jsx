export default function CrudActions({ onModificar, onEliminar }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onModificar}
        className="px-4 py-2 rounded-xl text-sm font-medium
          bg-white dark:bg-[#1e1e2e] border border-gray-200 dark:border-gray-700
          text-gray-700 dark:text-gray-300
          hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm"
      >
        Modificar
      </button>
      <button
        onClick={onEliminar}
        className="px-4 py-2 rounded-xl text-sm font-medium
          bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800
          text-red-600 dark:text-red-400
          hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors shadow-sm"
      >
        Eliminar
      </button>
    </div>
  );
}