import { createContext, useContext, useState } from "react";

const InscripcionContext = createContext();

export function InscripcionProvider({ children }) {
  const [inscripciones, setInscripciones] = useState({});

  const agregarSeccion = (ramoId, ramoNombre, seccionId) => {
    setInscripciones((prev) => ({
      ...prev,
      [ramoId]: { ramoId, ramoNombre, seccionId },
    }));
  };

  const quitarSeccion = (ramoId) => {
    setInscripciones((prev) => {
      const next = { ...prev };
      delete next[ramoId];
      return next;
    });
  };

  const limpiarInscripciones = () => setInscripciones({});

  return (
    <InscripcionContext.Provider value={{ inscripciones, agregarSeccion, quitarSeccion, limpiarInscripciones }}>
      {children}
    </InscripcionContext.Provider>
  );
}

export function useInscripcion() {
  return useContext(InscripcionContext);
}