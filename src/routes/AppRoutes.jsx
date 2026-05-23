import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen    from "../screens/login/LoginScreen";
import AlumnoRoutes   from "./AlumnoRoutes";
import ProfesorRoutes from "./ProfesorRoutes";
import AdminRoutes    from "./AdminRoutes";
import AuthRoute      from "./AuthRoute";

function RoleRedirect() {
  const usuario = JSON.parse(sessionStorage.getItem("usuario") || "{}");
  if (usuario?.tipoUsuario === "ALUMNO")         return <Navigate to="/alumno/ramos"     replace />;
  if (usuario?.tipoUsuario === "PROFESOR")       return <Navigate to="/profesor/horario" replace />;
  if (usuario?.tipoUsuario === "ADMINISTRATIVO") return <Navigate to="/admin/home"       replace />;
  if (usuario?.tipoUsuario === "SUPERADMIN")     return <Navigate to="/admin/home"       replace />;
  return <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/"      element={<RoleRedirect />} />

      <Route path="/alumno/*"   element={<AuthRoute><AlumnoRoutes /></AuthRoute>} />
      <Route path="/profesor/*" element={<AuthRoute><ProfesorRoutes /></AuthRoute>} />
      <Route path="/admin/*"    element={<AuthRoute><AdminRoutes /></AuthRoute>} />

      <Route path="*" element={<RoleRedirect />} />
    </Routes>
  );
}