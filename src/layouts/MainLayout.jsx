import { useLocation } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import AccessibilityPanel from "../components/common/AccessibilityPanel";

export default function MainLayout({ navItems = [], children }) {
  const location = useLocation();

  return (
    <>
      <div className="h-screen flex overflow-hidden bg-[#eef0f7] dark:bg-[#0f1117] transition-colors duration-300">

        <div className="h-full shrink-0">
          <Sidebar navItems={navItems} activePath={location.pathname} />
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto min-w-0">
          {children}
        </div>

      </div>

      <AccessibilityPanel />
    </>
  );
}