export const ramos = [
  { id: 1, nombre: "Programación" },
  { id: 2, nombre: "Matemáticas" },
  { id: 3, nombre: "Lenguaje" },
];

export const secciones = {
  1: ["PRG_001", "PRG_002", "PRG_003"],
  2: ["MTM_001", "MTM_002"],
  3: ["LNG_001", "LNG_002", "LNG_003"],
};

// Horario base vacío
const diasKeys = ["L", "M", "X", "J", "V", "S"];
const horas = ["8:30", "10:50", "11:20", "12:50", "13:20"];

// Horario inscrito del alumno (post inscripción)
export const horarioInscrito = [
  { hora: "8:30",  L: "PRG1_001\nSALA-2", M: "LNG_003\nSALA-4", X: "",              J: "LNG_003\nSALA-4", V: "", S: "" },
  { hora: "10:50", L: "PRG1_001\nSALA-2", M: "LNG_003\nSALA-4", X: "",              J: "LNG_003\nSALA-4", V: "", S: "" },
  { hora: "11:20", L: "PRG1_001\nSALA-2", M: "PRG1_001\nSALA-2", X: "",             J: "",                V: "", S: "" },
  { hora: "12:50", L: "",                 M: "PRG1_001\nSALA-2", X: "MTM_001\nSala-4", J: "",             V: "", S: "" },
  { hora: "13:20", L: "",                 M: "",                 X: "MTM_001\nSala-4", J: "",             V: "", S: "" },
];

// Horario preview al seleccionar Lenguaje (AlumnoRamoScreen)
export const horarioPreviewRamo = {
  // Programación (id: 1) — muestra PRG1_001
  1: [
    { hora: "8:30",  L: "PRG1_001\nSALA-2", M: "",                 X: "",                J: "",  V: "", S: "" },
    { hora: "10:50", L: "PRG1_001\nSALA-2", M: "",                 X: "",                J: "",  V: "", S: "" },
    { hora: "11:20", L: "PRG1_001\nSALA-2", M: "PRG1_001\nSALA-2", X: "",               J: "",  V: "", S: "" },
    { hora: "12:50", L: "",                 M: "PRG1_001\nSALA-2", X: "",                J: "",  V: "", S: "" },
    { hora: "13:20", L: "",                 M: "",                 X: "",                J: "",  V: "", S: "" },
  ],
  // Matemáticas (id: 2) — muestra MTM_001
  2: [
    { hora: "8:30",  L: "", M: "", X: "",                  J: "", V: "", S: "" },
    { hora: "10:50", L: "", M: "", X: "",                  J: "", V: "", S: "" },
    { hora: "11:20", L: "", M: "", X: "",                  J: "", V: "", S: "" },
    { hora: "12:50", L: "", M: "", X: "MTM_001\nSala-4",  J: "", V: "", S: "" },
    { hora: "13:20", L: "", M: "", X: "MTM_001\nSala-4",  J: "", V: "", S: "" },
  ],
  // Lenguaje (id: 3) — ya estaba
  3: [
    { hora: "8:30",  L: "PRG1_001\nSALA-2", M: "",                  X: "", J: "",  V: "", S: "" },
    { hora: "10:50", L: "PRG1_001\nSALA-2", M: "",                  X: "", J: "",  V: "", S: "" },
    { hora: "11:20", L: "PRG1_001\nSALA-2", M: "PRG1_001\nSALA-2", X: "", J: "",  V: "", S: "" },
    { hora: "12:50", L: "",                 M: "PRG1_001\nSALA-2",  X: "MTM_001\nSala-4", J: "", V: "", S: "" },
    { hora: "13:20", L: "",                 M: "",                  X: "MTM_001\nSala-4", J: "", V: "", S: "" },
  ],
};

// Horario preview al seleccionar sección LNG_003
export const horarioPreviewSeccion = {
  "LNG_003": [
    { hora: "8:30",  L: "PRG1_001\nSALA-2", M: "LNG_003\nSALA-4", X: "",              J: "LNG_003\nSALA-4", V: "", S: "" },
    { hora: "10:50", L: "PRG1_001\nSALA-2", M: "LNG_003\nSALA-4", X: "",              J: "LNG_003\nSALA-4", V: "", S: "" },
    { hora: "11:20", L: "PRG1_001\nSALA-2", M: "PRG1_001\nSALA-2", X: "",             J: "",               V: "", S: "" },
    { hora: "12:50", L: "",                 M: "PRG1_001\nSALA-2", X: "MTM_001\nSala-4", J: "",            V: "", S: "" },
    { hora: "13:20", L: "",                 M: "",                 X: "MTM_001\nSala-4", J: "",            V: "", S: "" },
  ],
  "LNG_002": [
    { hora: "8:30",  L: "PRG1_001\nSALA-2", M: "",               X: "LNG_002\nSALA-6", J: "",             V: "", S: "" },
    { hora: "10:50", L: "PRG1_001\nSALA-2", M: "",               X: "LNG_002\nSALA-6", J: "",             V: "", S: "" },
    { hora: "11:20", L: "PRG1_001\nSALA-2", M: "PRG1_001\nSALA-2", X: "",             J: "",             V: "", S: "" },
    { hora: "12:50", L: "",                 M: "PRG1_001\nSALA-2", X: "MTM_001\nSala-4", J: "LNG_002\nSALA-6", V: "", S: "" },
    { hora: "13:20", L: "",                 M: "",                 X: "MTM_001\nSala-4", J: "LNG_002\nSALA-6", V: "", S: "" },
  ],
};

export const bloquesPorSeccion = {
  "PRG_001": [
    { hora: "8:30",  dia: "L" }, { hora: "10:50", dia: "L" },
    { hora: "11:20", dia: "L" }, { hora: "11:20", dia: "M" },
    { hora: "12:50", dia: "M" },
  ],
  "PRG_002": [
    { hora: "8:30",  dia: "M" }, { hora: "10:50", dia: "M" },
    { hora: "11:20", dia: "M" }, { hora: "11:20", dia: "X" },
    { hora: "12:50", dia: "X" },
  ],
  "PRG_003": [
    { hora: "8:30",  dia: "J" }, { hora: "10:50", dia: "J" },
    { hora: "11:20", dia: "J" }, { hora: "11:20", dia: "V" },
    { hora: "12:50", dia: "V" },
  ],
  "MTM_001": [
    { hora: "12:50", dia: "X" }, { hora: "13:20", dia: "X" },
  ],
  "MTM_002": [
    { hora: "12:50", dia: "J" }, { hora: "13:20", dia: "J" },
  ],
  "LNG_001": [
    { hora: "8:30",  dia: "M" }, { hora: "10:50", dia: "M" },
    { hora: "8:30",  dia: "J" }, { hora: "10:50", dia: "J" },
  ],
  "LNG_002": [
    { hora: "8:30",  dia: "X" }, { hora: "10:50", dia: "X" },
    { hora: "12:50", dia: "J" }, { hora: "13:20", dia: "J" },
  ],
  "LNG_003": [
    { hora: "8:30",  dia: "M" }, { hora: "10:50", dia: "M" },
    { hora: "8:30",  dia: "J" }, { hora: "10:50", dia: "J" },
  ],
};

export function buildHorario(seccionIds = []) {
  // Inicializa grilla vacía
  const grilla = {};
  horasList.forEach((h) => {
    grilla[h] = { hora: h, L: "", M: "", X: "", J: "", V: "", S: "" };
  });

  seccionIds.forEach((seccionId) => {
    const bloques = bloquesPorSeccion[seccionId] || [];
    bloques.forEach(({ hora, dia }) => {
      if (grilla[hora]) {
        grilla[hora][dia] = seccionId + "\n" + getSala(seccionId);
      }
    });
  });

  return horasList.map((h) => grilla[h]);
}

function getSala(seccionId) {
  if (seccionId.startsWith("PRG")) return "SALA-2";
  if (seccionId.startsWith("MTM")) return "Sala-4";
  if (seccionId.startsWith("LNG")) return "SALA-4";
  return "SALA-1";
}


export const dias = diasKeys;
export const horasList = horas;

