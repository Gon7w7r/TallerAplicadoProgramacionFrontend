export default function CrudTableRow({ columns, children }) {
  return (
    <div
      className="grid items-center px-4 py-3
        border-b last:border-0 border-gray-100 dark:border-gray-700"
      style={{ gridTemplateColumns: columns.map((c) => c.width ?? "1fr").join(" ") }}
    >
      {children}
    </div>
  );
}