const DIAS = ["L", "M", "X", "J", "V", "S"];

const HORAS = [
  "08:30",
  "09:30",
  "10:30",
  "11:30",
  "12:30",
  "13:30",
  "14:30",
  "15:30",
  "16:30",
  "17:30",
  "18:30",
  "19:30",
  "20:30"
];

export default function HorarioTable({ rows = [] }) {

  const rowMap = {};

  rows.forEach((r) => {
    rowMap[r.hora] = r;
  });

  const ocupadas = {};

  return (
    <table className="w-full text-xs border-collapse table-fixed">

      <thead>
        <tr style={{ backgroundColor: "#1A2E4A" }}>
          <th className="px-4 py-3 text-left text-white font-semibold w-20">
            Hora
          </th>

          {DIAS.map((d) => (
            <th
              key={d}
              className="px-4 py-3 text-center text-white font-semibold"
            >
              {d}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>

        {HORAS.map((hora, rowIndex) => {

          const row = rowMap[hora] || {};

          return (
            <tr key={hora} className="h-20">

              <td className="border px-2 py-2 font-medium bg-gray-50">
                {hora}
              </td>

              {DIAS.map((dia) => {

                const ocupadoKey = `${dia}-${rowIndex}`;

                if (ocupadas[ocupadoKey]) {
                  return null;
                }

                const bloque = row[dia];

                if (!bloque) {
                  return (
                    <td
                      key={dia}
                      className="border border-gray-200"
                    />
                  );
                }

                for (let i = 1; i < bloque.span; i++) {
                  ocupadas[`${dia}-${rowIndex + i}`] = true;
                }

                return (
                  <td
                    key={dia}
                    rowSpan={bloque.span}
                    className={`
                      border border-gray-200
                      ${bloque.estilo?.bg}
                      ${bloque.estilo?.text}
                      align-top p-2
                    `}
                  >
                    <div className="font-semibold">
                      {bloque.ramo}
                    </div>

                    <div className="text-xs mt-1">
                      {bloque.inicio} - {bloque.fin}
                    </div>

                    <div className="text-xs opacity-70">
                      {bloque.sala}
                    </div>
                  </td>
                );

              })}

            </tr>
          );

        })}

      </tbody>

    </table>
  );
}