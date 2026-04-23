import { useNavigate } from "react-router-dom";

export default function MainLayout({
  title,
  showLogout = true,
  left,
  right,
  footer,
  singleColumn = false,
  children,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("rut");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Borde exterior que simula el frame del mockup */}
      <div className="m-4 border border-black flex flex-col flex-1 min-h-[calc(100vh-2rem)]">

        {/* Header */}
        <header className="border-b border-black px-3 py-1 flex items-center justify-between bg-white shrink-0">
          <span className="text-xs">{title}</span>
          {showLogout && (
            <button
              onClick={handleLogout}
              className="text-xs border border-black px-2 py-0.5 hover:bg-gray-100"
            >
              Logout
            </button>
          )}
        </header>

        {/* Body */}
        <main className="flex-1 flex flex-col p-6">
          {singleColumn ? (
            <div className="flex-1 flex items-center justify-center">
              {children}
            </div>
          ) : (
            <div className="flex gap-8 flex-1">
              {/* Columna izquierda */}
              {left && (
                <div className="w-64 shrink-0">
                  {left}
                </div>
              )}
              {/* Columna derecha */}
              {right && (
                <div className="flex-1">
                  {right}
                </div>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        {footer && (
          <div className="shrink-0 px-6 py-3 flex justify-end border-t border-gray-200">
            {footer}
          </div>
        )}

      </div>
    </div>
  );
}