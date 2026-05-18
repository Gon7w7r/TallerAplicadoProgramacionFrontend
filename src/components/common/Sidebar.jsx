import { useNavigate } from "react-router-dom";
import { useInscripcion } from "../../context/InscripcionContext";
import DarkModeToggle from "./DarkModeToggle";

export default function Sidebar({ navItems = [], activePath }) {
  const navigate = useNavigate();
  const { limpiarInscripciones } = useInscripcion();
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  const handleLogout = () => {
    limpiarInscripciones();
    sessionStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <aside className="w-56 shrink-0 min-h-screen flex flex-col px-3 py-4 gap-3
      bg-[#13131f] dark:bg-[#0a0a12] transition-colors duration-300">

      {/* Brand */}
      <div className="px-3 py-2 mb-1">
        <span className="text-white text-sm font-semibold tracking-wide">
          Nexus Materia
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = activePath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                w-full text-left text-xs font-medium px-3 py-2 rounded-lg
                transition-colors duration-150
                ${isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"}
              `}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Dark mode toggle */}
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-xs text-gray-500">Tema</span>
        <DarkModeToggle />
      </div>

      {/* Profile card */}
      <div className="rounded-xl p-3 flex flex-col gap-2 bg-[#1e1e2e] dark:bg-[#13131f]
        transition-colors duration-300">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-white text-xs font-medium truncate">
              {usuario?.nombre ?? "Usuario"}
            </span>
            <span className="text-gray-500 text-[10px] truncate">
              {usuario?.rut ?? ""}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full text-xs text-gray-400 hover:text-white text-left
            hover:bg-white/10 rounded px-2 py-1 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

    </aside>
  );
}