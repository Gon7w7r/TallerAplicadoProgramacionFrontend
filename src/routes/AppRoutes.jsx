import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "../screens/login/LoginScreen";
import AlumnoRoutes from "./AlumnoRoutes";
import AuthRoute from "./AuthRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<LoginScreen />} />

      {/* Rutas protegidas del alumno */}
      <Route
        path="/alumno/*"
        element={
          <AuthRoute>
            <AlumnoRoutes />
          </AuthRoute>
        }
      />

      {/* Redirect por defecto */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}