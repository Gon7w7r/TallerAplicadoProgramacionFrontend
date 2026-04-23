const DIAS = ["L", "M", "X", "J", "V", "S"];

export default function HorarioTable({ rows = [] }) {
  return (
    <div className="border border-black w-full">
      {/* Título */}
      <div className="border-b border-black text-center text-sm font-semibold py-1 bg-gray-100">
        Horario
      </div>

      <table className="w-full text-xs border-collapse table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black px-1 py-1 w-14 text-center">Hora</th>
            {DIAS.map((d) => (
              <th key={d} className="border border-black px-1 py-1 text-center">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.hora}>
              <td className="border border-black px-1 py-2 text-center font-medium bg-gray-50 text-xs">
                {row.hora}
              </td>
              {DIAS.map((d) => {
                const content = row[d] || "";
                return (
                  <td
                    key={d}
                    className={`border border-black px-1 py-2 text-center text-xs whitespace-pre-line leading-tight ${
                      content ? "bg-gray-200" : ""
                    }`}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}