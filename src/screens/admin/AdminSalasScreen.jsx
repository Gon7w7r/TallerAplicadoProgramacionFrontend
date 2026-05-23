import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import TableLayout from "../../layouts/TableLayout";
import { ADMIN_NAV } from "../../config/navConfig";
import { getDisponibilidadSalas } from "../../api/adminApiRequest";

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export default function AdminSalasScreen() {
  const [dia, setDia]   = useState("Lunes");
  const [datos, setDatos] = useState([]);

  useEffect(() => { cargar(); }, [dia]);

  const cargar = async () => {
    try {
      const data = await getDisponibilidadSalas(dia);
      if (Array.isArray(data)) setDatos(data);
    } catch (e) { console.error(e); }
  };

  const salas   = [...new Set(datos.map((d) => d.nombreSala))].sort();
  const bloques = [...new Set(datos.map((d) => `${d.horaInicio}–${d.horaFin}`))].sort();

  const getBloque = (sala, bloque) => {
    const [inicio, fin] = bloque.split("–");
    return datos.find(
      (d) => d.nombreSala === sala && d.horaInicio === inicio && d.horaFin === fin
    );
  };

  return (
    <MainLayout navItems={ADMIN_NAV}>
      <TableLayout
        title="Disponibilidad de Salas"
        subtitle="Ocupación por día"
        actions={
          <div className="flex gap-2">
            {DIAS.map((d) => (
              <button
                key={d}
                onClick={() => setDia(d)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-colors
                  ${dia === d
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-[#1e1e2e] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm"}
                `}
              >
                {d}
              </button>
            ))}
          </div>
        }
      >

        <section className="w-full rounded-2xl shadow-sm overflow-x-auto
          bg-white dark:bg-[#1e1e2e] transition-colors duration-300">

          {salas.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
              No hay datos para este día.
            </p>
          ) : (
            <>
              {/* Header */}
              <div
                className="grid px-4 py-2 border-b border-gray-100 dark:border-gray-700"
                style={{ gridTemplateColumns: `200px repeat(${bloques.length}, 1fr)` }}
              >
                <span className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">
                  Sala
                </span>
                {bloques.map((b) => (
                  <span key={b} className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 text-center">
                    {b}
                  </span>
                ))}
              </div>

              {/* Filas */}
              {salas.map((sala) => (
                <div
                  key={sala}
                  className="grid items-center px-4 py-3 border-b last:border-0
                    border-gray-100 dark:border-gray-700"
                  style={{ gridTemplateColumns: `200px repeat(${bloques.length}, 1fr)` }}
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {sala}
                  </span>
                  {bloques.map((bloque) => {
                    const ocupado = getBloque(sala, bloque);
                    return (
                      <div key={bloque} className="flex justify-center px-1">
                        {ocupado ? (
                          <span className="inline-block px-2 py-1 rounded-lg text-xs text-center
                            bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                            {ocupado.nombreAsignatura}
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 rounded-lg text-xs
                            bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                            Libre
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </>
          )}

        </section>

      </TableLayout>
    </MainLayout>
  );
}