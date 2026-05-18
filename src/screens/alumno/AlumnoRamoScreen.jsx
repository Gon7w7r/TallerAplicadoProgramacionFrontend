import { useEffect, useState } from "react";
import HorarioTable from "../../components/common/HorarioTable";
import MainLayout from "../../layouts/MainLayout";
import { useInscripcion } from "../../context/InscripcionContext";
import {
  getAsignaturasDisponibles,
  getSeccionesByAsignatura,
  getInscripcionesByAlumno,
  postInscribirMultiple,
} from "../../api/inscripcionApiRequest";

const ESTILOS_RAMOS = [
  { border: "border-blue-500",    bg: "bg-blue-100",    hover: "hover:bg-blue-50",    text: "text-blue-800"    },
  { border: "border-emerald-500", bg: "bg-emerald-100", hover: "hover:bg-emerald-50", text: "text-emerald-800" },
  { border: "border-amber-500",   bg: "bg-amber-100",   hover: "hover:bg-amber-50",   text: "text-amber-800"   },
  { border: "border-purple-500",  bg: "bg-purple-100",  hover: "hover:bg-purple-50",  text: "text-purple-800"  },
  { border: "border-pink-500",    bg: "bg-pink-100",    hover: "hover:bg-pink-50",    text: "text-pink-800"    },
  { border: "border-cyan-500",    bg: "bg-cyan-100",    hover: "hover:bg-cyan-50",    text: "text-cyan-800"    },
];

const NAV_ITEMS = [
  { label: "Inscripción", path: "/alumno/ramos"          },
  { label: "Mi Horario",  path: "/alumno/horario"        },
  { label: "Modificar",   path: "/alumno/modificar-ramos"},
];

export default function AlumnoRamoScreen() {
  const { inscripciones, agregarSeccion, quitarSeccion } = useInscripcion();
  const usuario  = JSON.parse(sessionStorage.getItem("usuario"));
  const idAlumno = usuario?.idEntidad; // ← campo correcto del nuevo LoginResponse

  const [selected, setSelected]                         = useState(null);
  const [asignaturas, setAsignaturas]                   = useState([]);
  const [secciones, setSecciones]                       = useState({});
  const [inscripcionesBackend, setInscripcionesBackend] = useState([]);

  // ── Carga inicial ────────────────────────────────────────────────────────
  useEffect(() => {
    const cargar = async () => {
      await cargarAsignaturas();
      await cargarInscripciones();
    };
    cargar();
  }, []);

  const cargarAsignaturas = async () => {
    if (!idAlumno) return;
    try {
      const data = await getAsignaturasDisponibles(idAlumno);
      if (!Array.isArray(data)) return;
      setAsignaturas(data);
      await Promise.all(data.map((a) => cargarSecciones(a.idAsignatura)));
    } catch (e) { console.error(e); }
  };

  const cargarSecciones = async (idAsignatura) => {
    try {
      const data = await getSeccionesByAsignatura(idAsignatura);
      setSecciones((prev) => ({ ...prev, [idAsignatura]: data }));
    } catch (e) { console.error(e); }
  };

  const cargarInscripciones = async () => {
    if (!idAlumno) return;
    try {
      const data = await getInscripcionesByAlumno(idAlumno);
      if (!Array.isArray(data)) return;
      setInscripcionesBackend(data);
      data.forEach((i) => agregarSeccion(i.idAsignatura, i.nombreAsignatura, i.idSeccion));
    } catch (e) { console.error(e); }
  };

  // ── Confirmar ────────────────────────────────────────────────────────────
  const confirmarInscripcion = async () => {
    try {
      const seccionesIds = Object.values(inscripciones).map((i) => i.seccionId);
      const mensajes = await postInscribirMultiple({
        idAlumno,
        idPeriodo: 1,
        secciones: seccionesIds,
      });
      if (!Array.isArray(mensajes)) {
        alert("Error inesperado al confirmar");
        return;
      }
      const errores = mensajes.filter((m) => !m.includes("exitosa"));
      if (errores.length > 0) {
        alert("Ocurrieron errores:\n\n" + errores.join("\n"));
        return;
      }
      alert("Inscripción realizada correctamente");
      await cargarInscripciones();
    } catch (e) {
      console.error(e);
      alert("Error al realizar inscripción");
    }
  };

  // ── Horario ──────────────────────────────────────────────────────────────
  const buildHorario = () => {
    const bloques = {};
    const diaMap  = { LUNES:"L", MARTES:"M", MIERCOLES:"X", JUEVES:"J", VIERNES:"V", SABADO:"S" };
    const norm    = (s) => s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    Object.values(inscripciones).forEach((inscripcion) => {
      const seccion = Object.values(secciones)
        .flat()
        .find((s) => s.idSeccion === inscripcion.seccionId);
      if (!seccion) return;

      seccion.horarios.forEach((h) => {
        const [hi, mi] = h.horario.horaInicio.split(":").map(Number);
        const [hf, mf] = h.horario.horaFin.split(":").map(Number);
        const span      = ((hf * 60 + mf) - (hi * 60 + mi)) / 60;
        const horaInicio = h.horario.horaInicio.slice(0, 5);
        const dia        = diaMap[norm(h.horario.diaSemana)];
        if (!dia) return;

        if (!bloques[horaInicio]) bloques[horaInicio] = { hora: horaInicio };

        const idx = asignaturas.findIndex((a) => a.idAsignatura === inscripcion.ramoId);
        bloques[horaInicio][dia] = {
          ramo:    inscripcion.ramoNombre,
          sala:    seccion.sala.nombre,
          seccion: seccion.idSeccion,
          inicio:  horaInicio,
          fin:     h.horario.horaFin.slice(0, 5),
          span,
          estilo:  ESTILOS_RAMOS[idx % ESTILOS_RAMOS.length],
        };
      });
    });

    return Object.values(bloques).sort((a, b) => a.hora.localeCompare(b.hora));
  };

  // ── Derivados ────────────────────────────────────────────────────────────
  const rows = buildHorario();
  const seccionesOriginales = [...inscripcionesBackend.map((i) => i.idSeccion)].sort();
  const seccionesActuales   = [...Object.values(inscripciones).map((i) => i.seccionId)].sort();
  const hayCambios = JSON.stringify(seccionesOriginales) !== JSON.stringify(seccionesActuales);

  // ── Slots del layout ─────────────────────────────────────────────────────
  const leftPanel = (
    <section
      className="rounded-2xl p-4 flex flex-col gap-2 shadow-sm"
      style={{ backgroundColor: "#ffffff" }}
    >
      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
        Asignaturas
      </p>

      {asignaturas.map((r, index) => {
        const estilo = ESTILOS_RAMOS[index % ESTILOS_RAMOS.length];
        const inscripcionExistente = inscripcionesBackend.find(
          (i) => i.idAsignatura === r.idAsignatura
        );
        const inscrito = !!inscripciones[r.idAsignatura] || !!inscripcionExistente;
        const abierto  = selected === r.idAsignatura;

        return (
          <div
            key={r.idAsignatura}
            onClick={() => setSelected(abierto ? null : r.idAsignatura)}
            className={`
              border-l-4 rounded-lg p-3 cursor-pointer text-xs transition-colors
              ${estilo.border}
              ${inscrito ? estilo.bg : "hover:bg-gray-50"}
            `}
          >
            <p className="font-medium text-gray-900">{r.nombreAsignatura}</p>
            <p className="text-gray-400 mt-0.5">
              {secciones[r.idAsignatura]?.length ?? 0} secciones
            </p>

            {abierto && (
              inscripcionExistente ? (
                <p className="mt-2 text-gray-500">
                  Inscrito — sección {inscripcionExistente.idSeccion}
                </p>
              ) : (
                <div
                  className="flex flex-col gap-1 mt-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {secciones[r.idAsignatura]?.map((s) => {
                    const seleccionada =
                      inscripciones[r.idAsignatura]?.seccionId === s.idSeccion;
                    return (
                      <button
                        key={s.idSeccion}
                        onClick={() =>
                          seleccionada
                            ? quitarSeccion(r.idAsignatura)
                            : agregarSeccion(r.idAsignatura, r.nombreAsignatura, s.idSeccion)
                        }
                        className={`
                          border rounded-lg px-2 py-1 text-left transition-colors
                          ${seleccionada
                            ? "bg-blue-100 border-blue-400"
                            : "border-gray-200 hover:bg-gray-100"}
                        `}
                      >
                        <span className="font-medium">Sección {s.idSeccion}</span>
                        {" — "}
                        {s.profesor.usuario.nombre}
                        {s.horarios.map((h) => (
                          <div key={h.horario.idHorario} className="opacity-60">
                            {h.horario.diaSemana}{" "}
                            {h.horario.horaInicio.slice(0, 5)}–
                            {h.horario.horaFin.slice(0, 5)}
                          </div>
                        ))}
                      </button>
                    );
                  })}
                </div>
              )
            )}
          </div>
        );
      })}
    </section>
  );

  const rightPanel = (
    <section
      className="rounded-2xl p-4 shadow-sm overflow-x-auto"
      style={{ backgroundColor: "#ffffff" }}
    >
      <HorarioTable rows={rows} />
    </section>
  );

  const footerSlot = hayCambios ? (
    <button
      onClick={confirmarInscripcion}
      className="text-sm font-medium text-white px-5 py-2 rounded-xl
        bg-blue-500 hover:bg-blue-600 transition-colors"
    >
      Confirmar inscripción
    </button>
  ) : null;

  return (
    <MainLayout
      title="Inscripción de Ramos"
      subtitle="Selecciona tus secciones"
      navItems={NAV_ITEMS}
      left={leftPanel}
      right={rightPanel}
      footer={footerSlot}
    />
  );
}