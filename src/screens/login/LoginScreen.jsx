import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AccessibilityPanel from "../../components/common/AccessibilityPanel";

export default function LoginScreen() {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (rut.trim()) {
      sessionStorage.setItem("rut", rut.trim());
      navigate("/alumno/ramos");
    }
  };

  return (
    <>
      <MainLayout title="Login" showLogout={false} singleColumn>
        <form
          onSubmit={handleLogin}
          className="bg-gray-100 border border-gray-300 p-8 flex flex-col items-center gap-5 w-72"
        >
          <h1 className="text-2xl font-bold tracking-wide">Login</h1>

          <div className="w-full flex flex-col items-center gap-1">
            <label className="text-xs">RUT</label>
            <input
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              required
              className="border border-black bg-white px-2 py-1 text-sm w-full"
            />
          </div>

          <div className="w-full flex flex-col items-center gap-1">
            <label className="text-xs">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black bg-white px-2 py-1 text-sm w-full"
            />
          </div>

          <button
            type="submit"
            className="border border-black bg-white px-8 py-1 text-sm hover:bg-gray-200 mt-1"
          >
            Login
          </button>
        </form>
      </MainLayout>

      <AccessibilityPanel />
    </>
  );
}