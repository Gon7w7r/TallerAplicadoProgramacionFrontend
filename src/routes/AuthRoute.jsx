import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {

  const usuario = sessionStorage.getItem("usuario");

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}