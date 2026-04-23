import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HorarioTable from "../../components/common/HorarioTable";
import { ramos, secciones, buildHorario, bloquesPorSeccion } from "../../data/mockData";
import { useInscripcion } from "../../context/InscripcionContext";

export default function AlumnoRamoScreen() {
  const [selected, setSelected] = useState(null);
  const [conflicto, setConflicto] = useState(false);
  const { inscripciones, agregarSeccion, quitarSeccion } = useInscripcion();
  const navigate = useNavigate();

  const seccionesInscritas = Object.values(inscripciones).map((i) => i.seccionId);
  const rows = buildHorario(seccionesInscritas);
  const hayInscritos = seccionesInscritas.length > 0;

  const handleSelectRamo = (ramoId) => {
    setConflicto(false);

    if (inscripciones[ramoId]) {
      quitarSeccion(ramoId);
      setSelected(null);
      return;
    }

    setSelected(ramoId);

    const primeraSeccion = secciones[ramoId]?.[0];
    if (!primeraSeccion) return;

    const bloquesNuevos = bloquesPorSeccion[primeraSeccion] || [];
    const bloquesExistentes = seccionesInscritas.flatMap((s) => bloquesPorSeccion[s] || []);
    const hayConflicto = bloquesNuevos.some((nuevo) =>
      bloquesExistentes.some((ex) => ex.hora === nuevo.hora && ex.dia === nuevo.dia)
    );

    if (hayConflicto) {
      setConflicto(true);
      return;
    }

    const ramo = ramos.find((r) => r.id === ramoId);
    agregarSeccion(ramoId, ramo?.nombre, primeraSeccion);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F4F6F8" }}>

      {/* ── Navbar ── */}
      <header style={{ backgroundColor: "#1A2E4A" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-white text-xl font-semibold">Inscripción de Ramos</h1>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 border-2 border-white text-white text-sm rounded-md hover:bg-white/10 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex gap-6 items-start">

        {/* ── Lista de ramos ── */}
        <section className="w-64 shrink-0 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">Mis Ramos</h2>

          <ul className="flex flex-col gap-2">
            {ramos.map((r) => {
              const inscrito = !!inscripciones[r.id];
              return (
                <li
                  key={r.id}
                  onClick={() => handleSelectRamo(r.id)}
                  className={`
                    border-l-4 p-4 cursor-pointer transition-colors
                    ${r.id === 1 ? "border-blue-500" : ""}
                    ${r.id === 2 ? "border-emerald-500" : ""}
                    ${r.id === 3 ? "border-amber-500" : ""}
                    ${r.id === 1 && inscrito ? "bg-blue-50" : ""}
                    ${r.id === 2 && inscrito ? "bg-emerald-50" : ""}
                    ${r.id === 3 && inscrito ? "bg-amber-50" : ""}
                    ${r.id === 1 && !inscrito ? "hover:bg-blue-50" : ""}
                    ${r.id === 2 && !inscrito ? "hover:bg-emerald-50" : ""}
                    ${r.id === 3 && !inscrito ? "hover:bg-amber-50" : ""}
                  `}
                >
                  <p className="font-medium text-gray-900 text-sm">{r.nombre}</p>
                  <p className="text-xs text-gray-500">
                    {inscrito ? inscripciones[r.id].seccionId : r.id}
                  </p>
                </li>
              );
            })}
          </ul>

          {/* ── Alerta de conflicto ── */}
          {conflicto && (
            <section className="mt-4 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
              ⚠ Conflicto de horario. Este ramo se cruza con uno ya inscrito.
            </section>
          )}
        </section>

        {/* ── Tabla de horario ── */}
        <section className="flex-1 bg-white rounded-lg shadow-sm p-6">
          <div className="overflow-x-auto">
            <HorarioTable rows={rows} />
          </div>

          {/* ── Confirmar inscripción ── */}
          {hayInscritos && (
            <section className="flex justify-end mt-6">
              <button
                onClick={() => navigate("/alumno/horario")}
                className="px-6 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#1A2E4A" }}
              >
                Confirmar Inscripción
              </button>
            </section>
          )}
        </section>

      </main>

    </div>
  );
}