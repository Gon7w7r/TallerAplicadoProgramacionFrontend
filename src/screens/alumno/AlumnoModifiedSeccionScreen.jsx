import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import HorarioTable from "../../components/common/HorarioTable";
import { horarioPreviewSeccion } from "../../data/mockData";

// Usamos LNG_002 como resultado del cambio (mockup imagen 9)
const horarioFinal = horarioPreviewSeccion["LNG_002"];

export default function AlumnoModifiedSeccionScreen() {
  const navigate = useNavigate();

  return (
    <MainLayout
      title="AlumnoModifiedSeccionScreen"
      left={
        <div className="flex flex-col gap-6 pt-2">
          <p className="text-sm leading-snug">
            Ya tienes tus asignaturas inscritas.
          </p>
          <button
            onClick={() => navigate("/alumno/modificar/ramos")}
            className="border border-black bg-white px-4 py-1 text-sm hover:bg-gray-100 w-fit"
          >
            Modificar Horario
          </button>
        </div>
      }
      right={<HorarioTable rows={horarioFinal} />}
    />
  );
}