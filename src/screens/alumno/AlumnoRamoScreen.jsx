import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HorarioTable from "../../components/common/HorarioTable";
import { useInscripcion } from "../../context/InscripcionContext";






export default function AlumnoRamoScreen() {

  const ESTILOS_RAMOS = [
    {
      border: "border-blue-500",
      bg: "bg-blue-100",
      hover: "hover:bg-blue-50",
      text: "text-blue-800"
    },
    {
      border: "border-emerald-500",
      bg: "bg-emerald-100",
      hover: "hover:bg-emerald-50",
      text: "text-emerald-800"
    },
    {
      border: "border-amber-500",
      bg: "bg-amber-100",
      hover: "hover:bg-amber-50",
      text: "text-amber-800"
    },
    {
      border: "border-purple-500",
      bg: "bg-purple-100",
      hover: "hover:bg-purple-50",
      text: "text-purple-800"
    },
    {
      border: "border-pink-500",
      bg: "bg-pink-100",
      hover: "hover:bg-pink-50",
      text: "text-pink-800"
    },
    {
      border: "border-cyan-500",
      bg: "bg-cyan-100",
      hover: "hover:bg-cyan-50",
      text: "text-cyan-800"
    }
  ];
  const [selected, setSelected] = useState(null);
  const [asignaturas, setAsignaturas] = useState([]);
  const [conflicto, setConflicto] = useState(false);
  const { inscripciones, agregarSeccion, quitarSeccion } = useInscripcion();
  const navigate = useNavigate();
  const usuario= JSON.parse(sessionStorage.getItem("usuario"));
  const [secciones, setSecciones] = useState({});

  const buildHorario = () => {

    const bloques = {};

    Object.values(inscripciones).forEach((inscripcion) => {

      const seccion = Object.values(secciones)
        .flat()
        .find((s) => s.idSeccion === inscripcion.seccionId);

      if (!seccion) return;

      seccion.horarios.forEach((h) => {

        const inicio = parseInt(h.horario.horaInicio.slice(0,2));
        const fin = parseInt(h.horario.horaFin.slice(0,2));

        const diaMap = {
          LUNES: "L",
          MARTES: "M",
          MIERCOLES: "X",
          JUEVES: "J",
          VIERNES: "V",
          SABADO: "S"
        };

        const dia = diaMap[h.horario.diaSemana];

        const horaInicio = `${inicio.toString().padStart(2,"0")}:30`;

        if (!bloques[horaInicio]) {
          bloques[horaInicio] = {
            hora: horaInicio
          };
        }
        const asignaturaIndex = asignaturas.findIndex(
          (a) => a.idAsignatura === inscripcion.ramoId
        );

        const estilo = ESTILOS_RAMOS[
          asignaturaIndex % ESTILOS_RAMOS.length
        ];
        bloques[horaInicio][dia] = {
          ramo: inscripcion.nombreRamo,
          sala: seccion.sala.nombre,
          inicio: h.horario.horaInicio.slice(0,5),
          fin: h.horario.horaFin.slice(0,5),
          span: fin - inicio,
          estilo
        };

      });

    });

    return Object.values(bloques).sort(
      (a, b) => a.hora.localeCompare(b.hora)
    );
  };
  
  useEffect(() => {

  const obtenerAsignaturas = async () => {

    try {

      const response = await fetch(
        `http://localhost:8080/alumnos/${usuario.idAlumno}/asignaturas-disponibles`
      );

      const data = await response.json();

      console.log("ASIGNATURAS:", data);

      setAsignaturas(data);
      data.forEach((asignatura) => {
        obtenerSecciones(asignatura.idAsignatura);
      });
      

    } catch (error) {

      console.error("Error:", error);

    }

  };

  obtenerAsignaturas();

  }, []);
  const obtenerSecciones = async (idAsignatura) => {

    try {

      const response = await fetch(
        `http://localhost:8080/secciones/asignatura/${idAsignatura}`
      );

      const data = await response.json();

      setSecciones(prev => ({
        ...prev,
        [idAsignatura]: data
      }));

    } catch (error) {
      console.error("Error obteniendo secciones:", error);
    }
  };


  const rows = buildHorario();
  const seccionesInscritas = Object.values(inscripciones).map(
  (i) => i.seccionId
  );
  const hayInscritos = seccionesInscritas.length > 0;

  const handleSelectRamo = (ramoId) => {

    setConflicto(false);

    if (selected === ramoId) {
      setSelected(null);
    } else {
      setSelected(ramoId);
    }

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
            {asignaturas.map((r, index) => {
              const estilo = ESTILOS_RAMOS[index % ESTILOS_RAMOS.length];
              const inscrito = !!inscripciones[r.idAsignatura];
              return (
                <li
                  key={r.idAsignatura}
                  onClick={() => handleSelectRamo(r.idAsignatura)}
                  className={`
                    border-l-4 p-4 cursor-pointer transition-colors
                    ${estilo.border}
                    ${inscrito ? estilo.bg : estilo.hover}
                  `}
                >

                  <p className="font-medium text-gray-900 text-sm">
                    {r.nombreAsignatura}
                  </p>

                  <p className="text-xs text-gray-500 mb-2">
                    {secciones[r.idAsignatura]?.length || 0} secciones disponibles
                  </p>

                  {selected === r.idAsignatura && (
                    <div className="flex flex-col gap-1">
                      {secciones[r.idAsignatura]?.map((s) => {

                          const seleccionada =
                            inscripciones[r.idAsignatura]?.seccionId === s.idSeccion;

                          return (
                            <button
                          key={s.idSeccion}
                          onClick={(e) => {
                            e.stopPropagation();

                            if (inscripciones[r.idAsignatura]?.seccionId === s.idSeccion) {
                              quitarSeccion(r.idAsignatura);
                              return;
                            }

                            agregarSeccion(
                              r.idAsignatura,
                              r.nombreAsignatura,
                              s.idSeccion
                            );
                          }}
                          className={`
                              text-xs border rounded px-2 py-1 text-left transition-colors
                              ${seleccionada
                                ? "bg-blue-100 border-blue-500"
                                : "hover:bg-gray-100"}
                            `}
                        >
                          Sección {s.idSeccion} — {s.profesor.usuario.nombre}

                          {s.horarios.map((h) => (
                            <div key={h.horario.idHorario}>
                              {h.horario.diaSemana}{" "}
                              {h.horario.horaInicio.slice(0,5)} -{" "}
                              {h.horario.horaFin.slice(0,5)}
                            </div>
                          ))}
                        </button>
                        );
                      })}
                    </div>
                  )}

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