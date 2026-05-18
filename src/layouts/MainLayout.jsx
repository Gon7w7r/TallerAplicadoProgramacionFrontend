import { useLocation } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import AccessibilityPanel from "../components/common/AccessibilityPanel";

export default function MainLayout({
  title,
  subtitle,
  navItems = [],
  left,
  right,
  footer,
  singleColumn = false,
  children,
}) {
  const location = useLocation();

  return (
    <>
      <div className="min-h-screen flex bg-[#eef0f7] dark:bg-[#0f1117] transition-colors duration-300">

        <Sidebar navItems={navItems} activePath={location.pathname} />

        <div className="flex-1 flex flex-col min-w-0 p-6 gap-4">

          {(title || subtitle) && (
            <header className="flex items-center gap-3 shrink-0">
              {title && (
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {title}
                </span>
              )}
              {subtitle && (
                <>
                  <span className="text-sm text-gray-300 dark:text-gray-600">—</span>
                  <span className="text-sm text-gray-400 dark:text-gray-500">{subtitle}</span>
                </>
              )}
            </header>
          )}

          <main className="flex-1 flex flex-col min-w-0">
            {singleColumn ? (
              <div className="flex-1 flex items-center justify-center">
                {children}
              </div>
            ) : (
              <div className="flex gap-4 flex-1 items-start">
                {left && <div className="w-60 shrink-0">{left}</div>}
                {right && <div className="flex-1 min-w-0">{right}</div>}
              </div>
            )}
          </main>

          {footer && (
            <div className="shrink-0 flex justify-end pt-2">
              {footer}
            </div>
          )}

        </div>
      </div>

      <AccessibilityPanel />
    </>
  );
}