import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HorarioTable from "../../components/common/HorarioTable";
import MainLayout from "../../layouts/MainLayout";
import { useInscripcion } from "../../context/InscripcionContext";
import {
  getInscripcionesByAlumno,
  getSeccionesByAsignatura,
  actualizarHorario,
} from "../../api/inscripcionApiRequest";
import HorarioLayout from "../../layouts/HorarioLayout";
import { ALUMNO_NAV } from "../../config/navConfig";
import { ESTILOS_RAMOS, DIA_MAP, getEstiloRamo } from "../../config/ramosConfig";


export default function AlumnoModifyRamoScreen() {
  const navigate = useNavigate();
  const { inscripciones, agregarSeccion, quitarSeccion, limpiarInscripciones } = useInscripcion();

  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  const idAlumno = usuario?.idEntidad;

  const [selected, setSelected] = useState(null);
  const [asignaturas, setAsignaturas] = useState([]);
  const [secciones, setSecciones] = useState({});
  const [inscripcionesBackend, setInscripcionesBackend] = useState([]);

  // ── Carga inicial ────────────────────────────────────────────────────────
  useEffect(() => {
    cargarInscripciones();
  }, []);

  const cargarInscripciones = async () => {
    if (!idAlumno) return;
    try {
      limpiarInscripciones();
      const data = await getInscripcionesByAlumno(idAlumno);
      if (!Array.isArray(data)) return;

      setInscripcionesBackend(data);
      setAsignaturas(data);

      await Promise.all(
        data.map((i) => {
          agregarSeccion(i.idAsignatura, i.nombreAsignatura, i.idSeccion);
          return cargarSecciones(i.idAsignatura);
        })
      );
    } catch (e) { console.error(e); }
  };

  const cargarSecciones = async (idAsignatura) => {
    try {
      const data = await getSeccionesByAsignatura(idAsignatura);
      setSecciones((prev) => ({ ...prev, [idAsignatura]: data }));
    } catch (e) { console.error(e); }
  };

  // ── Guardar ──────────────────────────────────────────────────────────────
  const guardarCambios = async () => {
    try {
      const mensajes = await actualizarHorario({
        idAlumno,
        idPeriodo: 1,
        secciones: Object.values(inscripciones).map((i) => i.seccionId),
      });

      if (!Array.isArray(mensajes)) {
        alert("Error inesperado al guardar");
        return;
      }

      const errores = mensajes.filter((m) => !m.includes("exitosa"));
      if (errores.length > 0) {
        alert("Errores:\n\n" + errores.join("\n"));
        return;
      }

      alert("Horario actualizado correctamente");
      navigate("/alumno/ramos");
    } catch (e) {
      console.error(e);
      alert("Error actualizando horario");
    }
  };

  // ── Horario ──────────────────────────────────────────────────────────────
  const buildHorario = () => {
    const bloques = {};
    const norm = (s) => s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    Object.values(inscripciones).forEach((inscripcion) => {
      const seccion = Object.values(secciones)
        .flat()
        .find((s) => s.idSeccion === inscripcion.seccionId);
      if (!seccion) return;

      seccion.horarios.forEach((h) => {
        const [hi, mi] = h.horario.horaInicio.split(":").map(Number);
        const [hf, mf] = h.horario.horaFin.split(":").map(Number);
        const span = ((hf * 60 + mf) - (hi * 60 + mi)) / 60;
        const horaInicio = h.horario.horaInicio.slice(0, 5);
        const dia = DIA_MAP[norm(h.horario.diaSemana)];
        if (!dia) return;

        if (!bloques[horaInicio]) bloques[horaInicio] = { hora: horaInicio };

        bloques[horaInicio][dia] = {
          ramo: inscripcion.ramoNombre,
          sala: seccion.sala.nombre,
          seccion: seccion.idSeccion,
          inicio: horaInicio,
          fin: h.horario.horaFin.slice(0, 5),
          span,
          estilo: getEstiloRamo(inscripcion.ramoId),
        };
      });
    });

    return Object.values(bloques).sort((a, b) => a.hora.localeCompare(b.hora));
  };

  const rows = buildHorario();

  // ── Slots del layout ─────────────────────────────────────────────────────
  const leftPanel = (
    <section className="rounded-2xl p-4 flex flex-col gap-2 shadow-sm
      bg-white dark:bg-[#1e1e2e] transition-colors duration-300">

      <p className="text-xs font-semibold uppercase mb-1
        text-gray-500 dark:text-gray-400">
        Asignaturas inscritas
      </p>

      {asignaturas.map((r, index) => {
        const estilo = getEstiloRamo(r.idAsignatura); 
        const abierto = selected === r.idAsignatura;

        return (
          <div
            key={r.idAsignatura}
            className={`
              border-l-4 rounded-lg p-3 text-xs transition-colors
              ${estilo.border} ${estilo.bg} ${estilo.darkBg}
            `}
          >
            {/* Cabecera clickeable */}
            <div
              className="cursor-pointer"
              onClick={() => setSelected(abierto ? null : r.idAsignatura)}
            >
              <p className={`font-medium ${estilo.text} ${estilo.darkText}`}>
                {r.nombreAsignatura}
              </p>
              <p className="text-gray-400 dark:text-gray-500 mt-0.5">
                Sección actual: {inscripciones[r.idAsignatura]?.seccionId ?? "—"}
              </p>
            </div>

            {/* Opciones de sección */}
            {abierto && (
              <div className="flex flex-col gap-1 mt-2">
                {secciones[r.idAsignatura]?.map((s) => {
                  const seleccionada =
                    inscripciones[r.idAsignatura]?.seccionId === s.idSeccion;
                  return (
                    <button
                      key={s.idSeccion}
                      onClick={() =>
                        agregarSeccion(r.idAsignatura, r.nombreAsignatura, s.idSeccion)
                      }
                      className={`
                        text-left border rounded-lg px-2 py-1 transition-colors
                        ${seleccionada
                          ? "bg-blue-100 border-blue-400 dark:bg-blue-900/40 dark:border-blue-500 dark:text-blue-300"
                          : "border-gray-200 dark:border-gray-700 hover:bg-white/50 dark:hover:bg-white/5 dark:text-gray-300"}
                      `}
                    >
                      <div className="font-medium">Sección {s.idSeccion}</div>
                      <div className="opacity-70">{s.profesor.usuario.nombre}</div>
                    </button>
                  );
                })}

                <button
                  onClick={() => quitarSeccion(r.idAsignatura)}
                  className="mt-1 text-xs px-2 py-1 rounded-lg transition-colors
                    bg-red-100 text-red-700 hover:bg-red-200
                    dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                >
                  Eliminar del horario
                </button>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );

  const rightPanel = (
    <section className="rounded-2xl p-4 shadow-sm overflow-x-auto
      bg-white dark:bg-[#1e1e2e] transition-colors duration-300">
      <HorarioTable rows={rows} />
    </section>
  );

  const footerSlot = (
    <button
      onClick={guardarCambios}
      className="text-sm font-medium text-white px-5 py-2 rounded-xl
        bg-blue-500 hover:bg-blue-600 transition-colors"
    >
      Guardar cambios
    </button>
  );

  return (
    <MainLayout navItems={ALUMNO_NAV}>
      <HorarioLayout
        title="Modificar Horario"
        subtitle="Cambia tus secciones inscritas"
        left={leftPanel}
        right={rightPanel}
        footer={footerSlot}
      />
    </MainLayout>
  );
}