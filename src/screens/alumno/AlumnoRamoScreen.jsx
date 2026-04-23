import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import HorarioTable from "../../components/common/HorarioTable";
import { ramos, secciones, buildHorario, bloquesPorSeccion } from "../../data/mockData";
import { useInscripcion } from "../../context/InscripcionContext";

export default function AlumnoRamoScreen() {
  const [selected, setSelected] = useState(null);
  const { inscripciones, agregarSeccion, quitarSeccion } = useInscripcion();
  const [conflicto, setConflicto] = useState(false);
  const navigate = useNavigate();

  const seccionesInscritas = Object.values(inscripciones).map((i) => i.seccionId);
  const rows = buildHorario(seccionesInscritas);

  const handleSelectRamo = (ramoId) => {
    setConflicto(false);

    // Si ya está inscrito, quitarlo (toggle)
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

  const hayInscritos = seccionesInscritas.length > 0;

  return (
    <MainLayout
      title="AlumnoRamoScreen"
      left={
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-sm">Selecciona un ramo</p>

          <ul>
            {ramos.map((r) => {
              const inscrito = !!inscripciones[r.id];
              return (
                <li
                  key={r.id}
                  className="flex items-center gap-2 border-b border-gray-300 py-2 px-1 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSelectRamo(r.id)}
                >
                  <input
                    type="radio"
                    name="ramo"
                    checked={inscrito}
                    onChange={() => handleSelectRamo(r.id)}
                    className="accent-black"
                  />
                  <span className="text-sm">
                    {r.nombre}
                    {inscrito && (
                      <span className="text-xs text-gray-500 ml-1">
                        ({inscripciones[r.id].seccionId})
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          {conflicto && (
            <p className="text-xs border border-black px-2 py-1 bg-gray-100">
              ⚠ Conflicto de horario. Este ramo se cruza con uno ya inscrito.
            </p>
          )}
        </div>
      }
      right={<HorarioTable rows={rows} />}
      footer={
        hayInscritos && (
          <button
            onClick={() => navigate("/alumno/horario")}
            className="border border-black px-4 py-1 text-sm hover:bg-gray-100"
          >
            Confirmar Inscripción
          </button>
        )
      }
    />
  );
}