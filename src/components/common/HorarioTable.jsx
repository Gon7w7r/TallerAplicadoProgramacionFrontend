const DIAS = ["L", "M", "X", "J", "V", "S"];

function getCellStyle(content) {
  if (content.startsWith("PRG")) return "bg-blue-100 text-blue-800";
  if (content.startsWith("MTM")) return "bg-emerald-100 text-emerald-800";
  if (content.startsWith("LNG")) return "bg-amber-100 text-amber-800";
  return "";
}

export default function HorarioTable({ rows = [] }) {
  return (
    <table className="w-full text-xs border-collapse table-fixed">
      <thead>
        <tr style={{ backgroundColor: "#1A2E4A" }}>
          <th className="px-4 py-3 text-left text-white font-semibold w-16">Hora</th>
          {DIAS.map((d) => (
            <th key={d} className="px-4 py-3 text-center text-white font-semibold">{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={row.hora} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="border-b border-gray-200 px-4 py-3 text-gray-700 font-medium">{row.hora}</td>
            {DIAS.map((d) => {
              const content = row[d] || "";
              const [codigo, sala] = content.split("\n");
              return (
                <td
                  key={d}
                  className={`border border-gray-200 px-2 py-3 text-center text-xs whitespace-pre-line leading-tight ${getCellStyle(content)}`}
                >
                  {content && (
                    <>
                      <div className="font-medium">{codigo}</div>
                      <div className="opacity-70">{sala}</div>
                    </>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}