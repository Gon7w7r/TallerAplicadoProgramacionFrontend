import { useEffect, useState } from "react";
import HorarioTable from "../../components/common/HorarioTable";
import MainLayout from "../../layouts/MainLayout";
import HorarioLayout from "../../layouts/HorarioLayout";
import { PROFESOR_NAV } from "../../config/navConfig";
import { getSeccionesByProfesor } from "../../api/profesorApiRequest";
import { getEstiloRamo, DIA_MAP } from "../../config/ramosConfig";

export default function ProfesorHorarioScreen() {
  const usuario    = JSON.parse(sessionStorage.getItem("usuario"));
  const idProfesor = usuario?.idEntidad;

  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    cargarSecciones();
  }, []);

  const cargarSecciones = async () => {
    if (!idProfesor) return;
    try {
      const data = await getSeccionesByProfesor(idProfesor);
      if (!Array.isArray(data)) return;
      setSecciones(data);
    } catch (e) { console.error(e); }
  };

  const buildHorario = () => {
    const bloques = {};
    const norm = (s) => s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    secciones.forEach((seccion) => {
      seccion.horarios.forEach((h) => {
        const [hi, mi] = h.horario.horaInicio.split(":").map(Number);
        const [hf, mf] = h.horario.horaFin.split(":").map(Number);
        const span      = ((hf * 60 + mf) - (hi * 60 + mi)) / 60;
        const horaInicio = h.horario.horaInicio.slice(0, 5);
        const dia        = DIA_MAP[norm(h.horario.diaSemana)];
        if (!dia) return;

        if (!bloques[horaInicio]) bloques[horaInicio] = { hora: horaInicio };

        bloques[horaInicio][dia] = {
          ramo:    seccion.asignatura.nombre,
          sala:    seccion.sala.nombre,
          seccion: seccion.idSeccion,
          inicio:  horaInicio,
          fin:     h.horario.horaFin.slice(0, 5),
          span,
          estilo:  getEstiloRamo(seccion.asignatura.idAsignatura),
        };
      });
    });

    return Object.values(bloques).sort((a, b) => a.hora.localeCompare(b.hora));
  };

  const rows = buildHorario();

  const leftPanel = (
    <section className="rounded-2xl p-4 flex flex-col gap-2 shadow-sm
      bg-white dark:bg-[#1e1e2e] transition-colors duration-300">

      <p className="text-xs font-semibold uppercase mb-1
        text-gray-500 dark:text-gray-400">
        Mis clases
      </p>

      {secciones.length === 0 && (
        <p className="text-xs text-gray-400 dark:text-gray-500">
          No tienes clases asignadas.
        </p>
      )}

      {secciones.map((s) => {
        const estilo = getEstiloRamo(s.asignatura.idAsignatura);
        return (
          <div
            key={s.idSeccion}
            className={`
              border-l-4 rounded-lg p-3 text-xs
              ${estilo.border} ${estilo.bg} ${estilo.darkBg}
            `}
          >
            <p className={`font-medium ${estilo.text} ${estilo.darkText}`}>
              {s.asignatura.nombre}
            </p>
            <p className="text-gray-400 dark:text-gray-500 mt-0.5">
              Sección {s.idSeccion} — {s.sala.nombre}
            </p>
            {s.horarios.map((h) => (
              <p key={h.horario.idHorario} className="text-gray-400 dark:text-gray-500">
                {h.horario.diaSemana} {h.horario.horaInicio.slice(0, 5)}–{h.horario.horaFin.slice(0, 5)}
              </p>
            ))}
          </div>
        );
      })}
    </section>
  );

  const rightPanel = (
    <section className="rounded-2xl p-4 shadow-sm overflow-x-auto
      bg-white dark:bg-[#1e1e2e] transition-colors duration-300">
      {rows.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-12">
          No tienes clases asignadas aún.
        </p>
      ) : (
        <HorarioTable rows={rows} />
      )}
    </section>
  );

  return (
    <MainLayout navItems={PROFESOR_NAV}>
      <HorarioLayout
        title="Mi Horario"
        subtitle="Tus clases asignadas"
        left={leftPanel}
        right={rightPanel}
      />
    </MainLayout>
  );
}