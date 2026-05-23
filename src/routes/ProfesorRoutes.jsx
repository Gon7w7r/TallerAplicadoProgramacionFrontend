import { Routes, Route, Navigate } from "react-router-dom";
import ProfesorHorarioScreen from "../screens/profesor/ProfesorHorarioScreen";

export default function ProfesorRoutes() {
  return (
    <Routes>
      <Route path="horario" element={<ProfesorHorarioScreen />} />
      <Route path="*"       element={<Navigate to="horario" replace />} />
    </Routes>
  );
}