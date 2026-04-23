import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import RadioList from "../../components/common/RadioList";
import HorarioTable from "../../components/common/HorarioTable";
import { secciones, horarioPreviewSeccion, horarioInscrito } from "../../data/mockData";

export default function AlumnoModifySeccionScreen() {
  const { state } = useLocation();
  const ramoId = state?.ramoId ?? 3;
  const navigate = useNavigate();

  const seccionesList = (secciones[ramoId] || []).map((s) => ({ id: s, nombre: s }));
  const [selected, setSelected] = useState(null);

  const rows = selected && horarioPreviewSeccion[selected]
    ? horarioPreviewSeccion[selected]
    : horarioInscrito;

  return (
    <MainLayout
      title="AlumnoModifySeccionScreen"
      left={
        <RadioList
          title="Selecciona una Seccion"
          items={seccionesList}
          selected={selected}
          onChange={setSelected}
        />
      }
      right={<HorarioTable rows={rows} />}
      footer={
        <button
          disabled={!selected}
          onClick={() => navigate("/alumno/modificar/confirmado")}
          className="border border-black px-4 py-1 text-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Modificar Horario
        </button>
      }
    />
  );
}