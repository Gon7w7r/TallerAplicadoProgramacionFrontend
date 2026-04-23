import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const isAuthenticated = !!sessionStorage.getItem("rut");
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}