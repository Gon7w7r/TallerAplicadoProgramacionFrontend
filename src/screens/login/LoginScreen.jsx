import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccessibilityPanel from "../../components/common/AccessibilityPanel";

export default function LoginScreen() {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rut,
          password,
        }),
      });

      if (!response.ok) {
        alert("RUT o contraseña incorrectos");
        return;
      }

      const usuario = await response.json();

      sessionStorage.setItem("usuario", JSON.stringify(usuario));

      navigate("/alumno/ramos");

    } catch (error) {
      console.error(error);
      alert("Error conectando con el servidor");
    }
  };

  return (
    <>
      <main className="min-h-screen flex">

        {/* ── Branding ── */}
        <section className="hidden lg:flex w-1/2 flex-col items-center justify-center gap-6"
          style={{ backgroundColor: "#1A2E4A" }}>
          <div className="w-24 h-24 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#243d5e" }}>
            <span className="text-white text-2xl font-bold">LOGO</span>
          </div>
          <p className="text-white text-xl font-semibold">Nombre Empresa</p>
        </section>

        {/* ── Formulario ── */}
        <section className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white px-12">
          <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-5">

            <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>

            <section className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">RUT</label>
              <input
                type="text"
                placeholder="12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </section>

            <section className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </section>

            <button
              type="submit"
              className="w-full py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#1A2E4A" }}
            >
              Login
            </button>

          </form>
        </section>

      </main>

      <AccessibilityPanel />
    </>
  );
}