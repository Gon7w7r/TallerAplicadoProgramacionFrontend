import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HorarioTable from "../../components/common/HorarioTable";
import { useInscripcion } from "../../context/InscripcionContext";

export default function AlumnoModifyRamoScreen() {

  const navigate = useNavigate();

  const usuario = JSON.parse(
    sessionStorage.getItem("usuario")
  );

  const {
    inscripciones,
    agregarSeccion,
    quitarSeccion,
    limpiarInscripciones
  } = useInscripcion();

  const [selected, setSelected] = useState(null);

  const [asignaturas, setAsignaturas] = useState([]);

  const [secciones, setSecciones] = useState({});

  const [inscripcionesBackend, setInscripcionesBackend] =
    useState([]);

  const ESTILOS_RAMOS = [
    {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-500"
    },
    {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      border: "border-emerald-500"
    },
    {
      bg: "bg-amber-100",
      text: "text-amber-800",
      border: "border-amber-500"
    },
    {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-500"
    }
  ];

  useEffect(() => {

    const cargarDatos = async () => {

      await obtenerInscripciones();

    };

    cargarDatos();

  }, []);

  const obtenerInscripciones = async () => {

    try {

      limpiarInscripciones();

      const response = await fetch(
        `http://localhost:8080/inscripciones/alumno/${usuario.idAlumno}`
      );

      const data = await response.json();

      setInscripcionesBackend(data);

      setAsignaturas(data);

      data.forEach((i) => {

        agregarSeccion(
          i.idAsignatura,
          i.nombreAsignatura,
          i.idSeccion
        );

        obtenerSecciones(i.idAsignatura);

      });

    } catch (error) {

      console.error(error);

    }

  };

  const obtenerSecciones = async (idAsignatura) => {

    try {

      const response = await fetch(
        `http://localhost:8080/secciones/asignatura/${idAsignatura}`
      );

      const data = await response.json();

      setSecciones((prev) => ({
        ...prev,
        [idAsignatura]: data
      }));

    } catch (error) {

      console.error(error);

    }

  };

  const buildHorario = () => {

    const bloques = {};

    Object.values(inscripciones).forEach((inscripcion) => {

      const seccion = Object.values(secciones)
        .flat()
        .find(
          (s) => s.idSeccion === inscripcion.seccionId
        );

      if (!seccion) return;

      seccion.horarios.forEach((h) => {

        const horaInicio =
          h.horario.horaInicio.slice(0, 5);

        const [inicioHora, inicioMin] =
          h.horario.horaInicio.split(":").map(Number);

        const [finHora, finMin] =
          h.horario.horaFin.split(":").map(Number);

        const span =
          ((finHora * 60 + finMin) -
          (inicioHora * 60 + inicioMin)) / 60;

        const diaMap = {
          LUNES: "L",
          MARTES: "M",
          MIERCOLES: "X",
          JUEVES: "J",
          VIERNES: "V",
          SABADO: "S"
        };

        const normalizar = (str) =>
          str
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const dia =
          diaMap[normalizar(h.horario.diaSemana)];

        if (!dia) return;

        if (!bloques[horaInicio]) {
          bloques[horaInicio] = {
            hora: horaInicio
          };
        }

        const asignaturaIndex =
          asignaturas.findIndex(
            (a) =>
              a.idAsignatura === inscripcion.ramoId
          );

        const estilo =
          ESTILOS_RAMOS[
            asignaturaIndex % ESTILOS_RAMOS.length
          ];

        bloques[horaInicio][dia] = {
          ramo: inscripcion.nombreRamo,
          sala: seccion.sala.nombre,
          seccion: seccion.idSeccion,
          inicio: h.horario.horaInicio.slice(0, 5),
          fin: h.horario.horaFin.slice(0, 5),
          span,
          estilo
        };

      });

    });

    return Object.values(bloques).sort(
      (a, b) => a.hora.localeCompare(b.hora)
    );
  };

  const rows = buildHorario();

  const guardarCambios = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/inscripciones/actualizar-horario",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idAlumno: usuario.idAlumno,
            idPeriodo: 1,
            secciones: Object.values(inscripciones)
              .map((i) => i.seccionId)
          })
        }
      );

      const mensajes = await response.json();

      const errores = mensajes.filter(
        (m) => !m.includes("exitosa")
      );

      if (errores.length > 0) {

        alert(
          "Errores:\n\n" +
          errores.join("\n")
        );

        return;
      }

      alert("Horario actualizado correctamente");

      navigate("/alumno/ramos");

    } catch (error) {

      console.error(error);

      alert("Error actualizando horario");

    }

  };

  return (

    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F4F6F8" }}
    >

      <header style={{ backgroundColor: "#1A2E4A" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-white text-xl font-semibold">
            Modificar Horario
          </h1>

          <button
            onClick={() => navigate("/alumno/ramos")}
            className="px-4 py-2 border-2 border-white text-white text-sm rounded-md hover:bg-white/10"
          >
            Volver
          </button>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex gap-6 items-start">

        <section className="w-72 bg-white rounded-lg shadow-sm p-6">

          <h2 className="font-bold mb-4">
            Ramos Inscritos
          </h2>

          <ul className="flex flex-col gap-3">

            {asignaturas.map((r, index) => {

              const estilo =
                ESTILOS_RAMOS[
                  index % ESTILOS_RAMOS.length
                ];

              return (

                <li
                  key={r.idAsignatura}
                  className={`
                    border-l-4 p-4 rounded
                    ${estilo.border}
                    ${estilo.bg}
                  `}
                >

                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      setSelected(
                        selected === r.idAsignatura
                          ? null
                          : r.idAsignatura
                      )
                    }
                  >

                    <p className="font-medium">
                      {r.nombreAsignatura}
                    </p>

                    <p className="text-xs text-gray-500">
                      Sección actual: {inscripciones[r.idAsignatura]?.seccionId}
                    </p>

                  </div>

                  {selected === r.idAsignatura && (

                    <div className="mt-3 flex flex-col gap-2">

                      {secciones[r.idAsignatura]?.map((s) => {

                        const seleccionada =
                          inscripciones[r.idAsignatura]
                            ?.seccionId === s.idSeccion;

                        return (

                          <button
                            key={s.idSeccion}
                            onClick={() => {

                              agregarSeccion(
                                r.idAsignatura,
                                r.nombreAsignatura,
                                s.idSeccion
                              );

                            }}
                            className={`
                              text-left text-xs border rounded px-2 py-2
                              ${seleccionada
                                ? "bg-blue-100 border-blue-500"
                                : "hover:bg-gray-100"}
                            `}
                          >

                            <div>
                              Sección {s.idSeccion}
                            </div>

                            <div>
                              {s.profesor.usuario.nombre}
                            </div>

                          </button>

                        );

                      })}

                      <button
                        onClick={() =>
                          quitarSeccion(r.idAsignatura)
                        }
                        className="
                          mt-2 text-xs
                          bg-red-100
                          text-red-700
                          px-2 py-2
                          rounded
                          hover:bg-red-200
                        "
                      >
                        Eliminar ramo del horario
                      </button>

                    </div>

                  )}

                </li>

              );

            })}

          </ul>

        </section>

        <section className="flex-1 bg-white rounded-lg shadow-sm p-6">

          <HorarioTable rows={rows} />

          <div className="flex justify-end mt-6">

            <button
              onClick={guardarCambios}
              className="
                px-6 py-3
                rounded-lg
                text-white
                font-medium
                hover:opacity-90
              "
              style={{ backgroundColor: "#1A2E4A" }}
            >
              Guardar Cambios
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}