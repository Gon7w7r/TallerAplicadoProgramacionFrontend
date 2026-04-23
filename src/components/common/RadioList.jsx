export default function RadioList({ title, items = [], selected, onChange }) {
  return (
    <div className="flex flex-col">
      {title && (
        <p className="font-semibold text-sm mb-4">{title}</p>
      )}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label className="flex items-center justify-between border-b border-gray-300 py-2 px-1 cursor-pointer hover:bg-gray-50">
              <span className="text-sm">{item.nombre}</span>
              <input
                type="radio"
                name="radio-list"
                checked={selected === item.id}
                onChange={() => onChange(item.id)}
                className="w-4 h-4 accent-black"
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}