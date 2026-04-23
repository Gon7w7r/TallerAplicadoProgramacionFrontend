import { useState } from "react";

const options = [
  { icon: "Tt", label: "Font\nText" },
  { icon: "👁", label: "Color\nblindness" },
  { icon: "🚫", label: "Blindness" },
  { icon: "T",  label: "Dyslexia" },
];

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50">
      {open && (
        <div className="border border-black bg-white p-2 flex flex-col gap-3 text-center shadow-md">
          {options.map((o) => (
            <button
              key={o.label}
              className="flex flex-col items-center text-xs hover:bg-gray-100 px-2 py-1"
            >
              <span className="text-lg leading-none">{o.icon}</span>
              <span className="whitespace-pre-line leading-tight">{o.label}</span>
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-10 h-10 rounded-full border border-black bg-gray-200 text-xl flex items-center justify-center hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
}