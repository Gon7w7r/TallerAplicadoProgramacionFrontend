const BASE = "http://localhost:8080";

// Lee el rol guardado en sessionStorage tras el login
const headers = () => {
    const usuario = JSON.parse(sessionStorage.getItem("usuario") || "{}");
    return {
        "Content-Type": "application/json",
        "X-Tipo-Usuario": usuario.tipoUsuario ?? "",
    };
};

export const getAsignaturasDisponibles = (idAlumno) =>
    fetch(`${BASE}/alumnos/${idAlumno}/asignaturas-disponibles`, { headers: headers() })
        .then((r) => r.json());

export const getSeccionesByAsignatura = (idAsignatura) =>
    fetch(`${BASE}/secciones/asignatura/${idAsignatura}`, { headers: headers() })
        .then((r) => r.json());

export const getInscripcionesByAlumno = (idAlumno) =>
    fetch(`${BASE}/inscripciones/alumno/${idAlumno}`, { headers: headers() })
        .then((r) => r.json());

export const postInscribirMultiple = ({ idAlumno, idPeriodo, secciones }) =>
    fetch(`${BASE}/inscripciones/inscribir-multiple`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ idAlumno, idPeriodo, secciones }),
    }).then((r) => r.json());