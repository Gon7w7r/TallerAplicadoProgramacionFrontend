const BASE = import.meta.env.VITE_API_URL;

const headers = () => {
    const usuario = JSON.parse(sessionStorage.getItem("usuario") || "{}");
    return {
        "Content-Type": "application/json",
        "X-Tipo-Usuario": usuario.tipoUsuario ?? "",
    };
};

export const getDashboardResumen = () =>
    fetch(`${BASE}/dashboard/resumen`, { headers: headers() })
        .then((r) => r.json());

export const getDepartamentos = () =>
    fetch(`${BASE}/departamentos`, { headers: headers() })
        .then((r) => r.json());

export const createDepartamento = (nombre) =>
    fetch(`${BASE}/departamentos`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ nombre }),
    }).then((r) => r.json());

export const updateDepartamento = (id, nombre) =>
    fetch(`${BASE}/departamentos/${id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ nombre }),
    }).then((r) => r.text());

export const deleteDepartamento = (id) =>
    fetch(`${BASE}/departamentos/${id}`, {
        method: "DELETE",
        headers: headers(),
    }).then((r) => r.text());

// Carreras
export const getCarreras = () =>
    fetch(`${BASE}/carreras`, { headers: headers() })
        .then((r) => r.json());

export const createCarrera = (nombre, tipo) =>
    fetch(`${BASE}/carreras`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ nombre, tipo }),
    }).then((r) => r.json());

export const updateCarrera = (id, nombre, tipo) =>
    fetch(`${BASE}/carreras/${id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ nombre, tipo }),
    }).then((r) => r.text());

export const deleteCarrera = (id) =>
    fetch(`${BASE}/carreras/${id}`, {
        method: "DELETE",
        headers: headers(),
    }).then((r) => r.text());

// Detalle carreras
export const getAsignaturasByCarrera = (idCarrera) =>
    fetch(`${BASE}/carreras/${idCarrera}/asignaturas`, { headers: headers() })
        .then((r) => r.json());

export const addAsignaturaToCarrera = (idCarrera, idAsignatura) =>
    fetch(`${BASE}/carreras/${idCarrera}/asignaturas/${idAsignatura}`, {
        method: "POST",
        headers: headers(),
    }).then((r) => r.text());

export const removeAsignaturaFromCarrera = (idCarrera, idAsignatura) =>
    fetch(`${BASE}/carreras/${idCarrera}/asignaturas/${idAsignatura}`, {
        method: "DELETE",
        headers: headers(),
    }).then((r) => r.text());

// Asignaturas
export const getAsignaturas = () =>
    fetch(`${BASE}/asignaturas`, { headers: headers() })
        .then((r) => r.json());

// Secciones
export const getSecciones = () =>
    fetch(`${BASE}/secciones`, { headers: headers() })
        .then((r) => r.json());

export const getAlumnosInscritos = (idSeccion) =>
    fetch(`${BASE}/secciones/${idSeccion}/alumnos-inscritos`, { headers: headers() })
        .then((r) => r.json());

export const getDemanda = () =>
    fetch(`${BASE}/dashboard/demanda`, { headers: headers() })
        .then((r) => r.json());

export const getDisponibilidadSalas = (dia) =>
    fetch(`${BASE}/salas/disponibilidad?dia=${dia}`, { headers: headers() })
        .then((r) => r.json());