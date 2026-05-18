import { useState } from "react";
import { ACCESSIBILITY_OPTIONS, COLOR_FILTERS } from "../../data/accessibilityConfig";
import { useSpeech } from "../../hooks/useSpeech";

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const { speaking, paused, speak, pause, resume, stop } = useSpeech();

  const applyFilter = (filterKey) => {
    if (activeFilter === filterKey) {
      document.documentElement.style.filter = "";
      setActiveFilter(null);
    } else {
      document.documentElement.style.filter = `url(#${filterKey})`;
      setActiveFilter(filterKey);
    }
    setShowFilterMenu(false);
  };

  const handleOption = (label) => {
    if (label === "Daltonismo") setShowFilterMenu((v) => !v);
    if (label === "Ceguera") speaking ? stop() : speak();
    if (label === "Dislexia") document.documentElement.classList.toggle("dyslexia");
    if (label === "Calma") document.documentElement.classList.toggle("calma");
  };

  const isActive = (label) => {
    if (label === "Daltonismo") return !!activeFilter;
    if (label === "Ceguera") return speaking;
    if (label === "Dislexia") return document.documentElement.classList.contains("dyslexia");
    if (label === "Calma") return document.documentElement.classList.contains("calma");
    return false;
  };

  return (
    <div data-accessibility-panel className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50">

      {/* Submenú tipos de daltonismo */}
      {showFilterMenu && (
        <div className="border border-black bg-white p-2 flex flex-col gap-1 shadow-md text-xs w-36">
          {Object.keys(COLOR_FILTERS).map((key) => (
            <button
              key={key}
              onClick={() => applyFilter(key)}
              className={`px-2 py-1 rounded capitalize hover:bg-gray-100 text-left
                ${activeFilter === key ? "bg-gray-200 font-semibold" : ""}`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Panel principal */}
      {open && (
        <div className="border border-black bg-white p-2 flex flex-col gap-3 text-center shadow-md">
          {ACCESSIBILITY_OPTIONS.map((o) => (
            <button
              key={o.label}
              onClick={() => handleOption(o.label)}
              className={`flex flex-col items-center text-xs hover:bg-gray-100 px-2 py-1
                ${isActive(o.label) ? "bg-gray-200 font-semibold" : ""}`}
            >
              <span className="text-lg leading-none">{o.icon}</span>
              <span className="whitespace-pre-line leading-tight">{o.label}</span>
            </button>
          ))}

          {/* Controles de voz */}
          {speaking && (
            <div className="border-t border-gray-200 pt-2 flex justify-center gap-2">
              <button
                onClick={paused ? resume : pause}
                className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
              >
                {paused ? "▶ Reanudar" : "⏸ Pausar"}
              </button>
              <button
                onClick={stop}
                className="text-xs px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-500"
              >
                ✕ Detener
              </button>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => {
          setOpen((v) => !v);
          setShowFilterMenu(false);
        }}
        className="w-10 h-10 rounded-full border border-black bg-gray-200 text-xl flex items-center justify-center hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
}