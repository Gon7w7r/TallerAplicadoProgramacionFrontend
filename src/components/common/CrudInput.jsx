export default function CrudInput({ value, onChange, onKeyEnter, placeholder, buttonLabel, onSubmit, disabled }) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onKeyEnter?.()}
        placeholder={placeholder}
        className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2
          text-sm bg-white dark:bg-[#13131f] text-gray-800 dark:text-gray-200
          focus:outline-none focus:ring-2 focus:ring-blue-500
          placeholder:text-gray-400 dark:placeholder:text-gray-600
          transition-colors duration-300"
      />
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="px-4 py-2 rounded-xl text-sm font-medium text-white
          bg-blue-500 hover:bg-blue-600 disabled:opacity-40
          disabled:cursor-not-allowed transition-colors"
      >
        {buttonLabel}
      </button>
    </div>
  );
}