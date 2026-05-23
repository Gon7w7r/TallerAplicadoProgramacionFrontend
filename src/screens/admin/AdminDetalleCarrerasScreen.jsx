import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import CrudLayout from "../../layouts/CrudLayout";
import CrudSection from "../../components/common/CrudSection";
import CrudTable from "../../components/common/CrudTable";
import CrudTableRow from "../../components/common/CrudTableRow";
import CrudList from "../../components/common/CrudList";
import { ADMIN_NAV } from "../../config/navConfig";
import {
  getCarreras,
  getAsignaturas,
  getAsignaturasByCarrera,
  addAsignaturaToCarrera,
  removeAsignaturaFromCarrera,
} from "../../api/adminApiRequest";

const COLUMNS = [
  { label: "Asignatura" },
  { label: "Acciones", width: "80px" },
];

export default function AdminDetalleCarrerasScreen() {
  const [carreras, setCarreras]                       = useState([]);
  const [asignaturas, setAsignaturas]                 = useState([]);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState(null);
  const [asignaturasCarrera, setAsignaturasCarrera]   = useState([]);
  const [asignaturaAgregar, setAsignaturaAgregar]     = useState("");

  useEffect(() => { cargarIniciales(); }, []);

  useEffect(() => {
    if (carreraSeleccionada) cargarAsignaturasCarrera(carreraSeleccionada.idCarrera);
  }, [carreraSeleccionada]);

  const cargarIniciales = async () => {
    try {
      const [c, a] = await Promise.all([getCarreras(), getAsignaturas()]);
      if (Array.isArray(c)) setCarreras(c);
      if (Array.isArray(a)) setAsignaturas(a);
    } catch (e) { console.error(e); }
  };

  const cargarAsignaturasCarrera = async (id) => {
    try {
      const data = await getAsignaturasByCarrera(id);
      if (Array.isArray(data)) setAsignaturasCarrera(data);
    } catch (e) { console.error(e); }
  };

  const handleAgregar = async () => {
    if (!asignaturaAgregar || !carreraSeleccionada) return;
    await addAsignaturaToCarrera(carreraSeleccionada.idCarrera, asignaturaAgregar);
    setAsignaturaAgregar("");
    await cargarAsignaturasCarrera(carreraSeleccionada.idCarrera);
  };

  const handleQuitar = async (idAsignatura) => {
    await removeAsignaturaFromCarrera(carreraSeleccionada.idCarrera, idAsignatura);
    await cargarAsignaturasCarrera(carreraSeleccionada.idCarrera);
  };

  const asignaturasDisponibles = asignaturas.filter(
    (a) => !asignaturasCarrera.some((ac) => ac.idAsignatura === a.idAsignatura)
  );

  return (
    <MainLayout navItems={ADMIN_NAV}>
      <CrudLayout title="Detalle Carreras" subtitle="Asignaturas por carrera">
        <div className="flex gap-4 w-full items-start">

          {/* ── Lista carreras ── */}
          <div className="w-64 shrink-0">
            <CrudList
              items={carreras}
              selected={carreraSeleccionada}
              onSelect={setCarreraSeleccionada}
              getKey={(c) => c?.idCarrera}
              getLabel={(c) => c.nombre}
            />
          </div>

          {/* ── Detalle ── */}
          {carreraSeleccionada ? (
            <div className="flex-1 flex flex-col gap-4">

              <CrudSection title="Agregar asignatura">
                <div className="flex gap-2">
                  <select
                    value={asignaturaAgregar}
                    onChange={(e) => setAsignaturaAgregar(e.target.value)}
                    className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2
                      text-sm bg-white dark:bg-[#13131f] text-gray-800 dark:text-gray-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      transition-colors duration-300"
                  >
                    <option value="">Seleccionar asignatura...</option>
                    {asignaturasDisponibles.map((a) => (
                      <option key={a.idAsignatura} value={a.idAsignatura}>
                        {a.nombre}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAgregar}
                    disabled={!asignaturaAgregar}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white
                      bg-blue-500 hover:bg-blue-600 disabled:opacity-40
                      disabled:cursor-not-allowed transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </CrudSection>

              <CrudTable columns={COLUMNS} empty="No hay asignaturas asignadas.">
                {asignaturasCarrera.map((a) => (
                  <CrudTableRow key={a.idAsignatura} columns={COLUMNS}>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {a.nombre}
                    </span>
                    <button
                      onClick={() => handleQuitar(a.idAsignatura)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-50
                        dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </CrudTableRow>
                ))}
              </CrudTable>

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center py-20
              text-sm text-gray-400 dark:text-gray-500">
              Selecciona una carrera para ver sus asignaturas.
            </div>
          )}

        </div>
      </CrudLayout>
    </MainLayout>
  );
}