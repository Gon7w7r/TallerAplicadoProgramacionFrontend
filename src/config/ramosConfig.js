export const ESTILOS_RAMOS = [
  { border: "border-blue-500",    bg: "bg-blue-100",    darkBg: "dark:bg-blue-900/30",    text: "text-blue-800",    darkText: "dark:text-blue-300"    },
  { border: "border-emerald-500", bg: "bg-emerald-100", darkBg: "dark:bg-emerald-900/30", text: "text-emerald-800", darkText: "dark:text-emerald-300" },
  { border: "border-amber-500",   bg: "bg-amber-100",   darkBg: "dark:bg-amber-900/30",   text: "text-amber-800",   darkText: "dark:text-amber-300"   },
  { border: "border-purple-500",  bg: "bg-purple-100",  darkBg: "dark:bg-purple-900/30",  text: "text-purple-800",  darkText: "dark:text-purple-300"  },
  { border: "border-pink-500",    bg: "bg-pink-100",    darkBg: "dark:bg-pink-900/30",    text: "text-pink-800",    darkText: "dark:text-pink-300"    },
  { border: "border-cyan-500",    bg: "bg-cyan-100",    darkBg: "dark:bg-cyan-900/30",    text: "text-cyan-800",    darkText: "dark:text-cyan-300"    },
];

export const DIA_MAP = {
  LUNES:     "Lunes",
  MARTES:    "Martes",
  MIERCOLES: "Miércoles",
  JUEVES:    "Jueves",
  VIERNES:   "Viernes",
  SABADO:    "Sábado",
};

export const getEstiloRamo = (idAsignatura) => {
  return ESTILOS_RAMOS[idAsignatura % ESTILOS_RAMOS.length];
};