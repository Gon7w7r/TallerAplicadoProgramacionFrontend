import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen    from "../screens/login/LoginScreen";
import AdminHomeScreen from "../screens/admin/AdminHomeScreen";
import AlumnoRoutes   from "./AlumnoRoutes";
import AuthRoute      from "./AuthRoute";

function RoleRedirect() {
  const usuario = JSON.parse(sessionStorage.getItem("usuario") || "{}");
  if (usuario?.tipoUsuario === "ALUMNO") return <Navigate to="/alumno/ramos" replace />;
  if (usuario?.tipoUsuario === "ADMINISTRATIVO") return <Navigate to="/admin/home" replace />;
  if (usuario?.tipoUsuario === "SUPERADMIN") return <Navigate to="/admin/home" replace />;
  return <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />

      {/* Redirige / según rol */}
      <Route path="/" element={<RoleRedirect />} />

      {/* Rutas alumno */}
      <Route
        path="/alumno/*"
        element={<AuthRoute><AlumnoRoutes /></AuthRoute>}
      />

      {/* Rutas admin */}
      <Route
        path="/admin/home"
        element={<AuthRoute><AdminHomeScreen /></AuthRoute>}
      />

      <Route path="*" element={<RoleRedirect />} />
    </Routes>
  );
}