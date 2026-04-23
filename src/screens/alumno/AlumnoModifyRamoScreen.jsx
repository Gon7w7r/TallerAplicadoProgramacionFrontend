import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import RadioList from "../../components/common/RadioList";
import HorarioTable from "../../components/common/HorarioTable";
import { ramos, horarioInscrito } from "../../data/mockData";

export default function AlumnoModifyRamoScreen() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <MainLayout
      title="AlumnoModifyRamoScreen"
      left={
        <RadioList
          title="Selecciona un ramo"
          items={ramos.map((r) => ({ id: r.id, nombre: r.nombre }))}
          selected={selected}
          onChange={setSelected}
        />
      }
      right={<HorarioTable rows={horarioInscrito} />}
      footer={
        <button
          disabled={!selected}
          onClick={() =>
            navigate("/alumno/modificar/secciones", { state: { ramoId: selected } })
          }
          className="border border-black px-4 py-1 text-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Modificar Horario
        </button>
      }
    />
  );
}