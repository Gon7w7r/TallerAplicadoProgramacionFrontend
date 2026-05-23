import { useEffect, useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import CrudLayout from "../../layouts/CrudLayout";
import CrudSection from "../../components/common/CrudSection";
import CrudTable from "../../components/common/CrudTable";
import CrudTableRow from "../../components/common/CrudTableRow";
import CrudInput from "../../components/common/CrudInput";
import { ADMIN_NAV } from "../../config/navConfig";
import {
  getDepartamentos,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} from "../../api/adminApiRequest";

const COLUMNS = [
  { label: "Nombre" },
  { label: "Acciones", width: "80px" },
];

export default function AdminDepartamentosScreen() {
  const [departamentos, setDepartamentos]   = useState([]);
  const [nuevoNombre, setNuevoNombre]       = useState("");
  const [editandoId, setEditandoId]         = useState(null);
  const [editandoNombre, setEditandoNombre] = useState("");

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    try {
      const data = await getDepartamentos();
      if (Array.isArray(data)) setDepartamentos(data);
    } catch (e) { console.error(e); }
  };

  const handleCrear = async () => {
    if (!nuevoNombre.trim()) return;
    await createDepartamento(nuevoNombre.trim());
    setNuevoNombre("");
    await cargar();
  };

  const handleEditar = (dep) => {
    setEditandoId(dep.idDepartamento);
    setEditandoNombre(dep.nombre);
  };

  const handleGuardar = async (id) => {
    if (!editandoNombre.trim()) return;
    await updateDepartamento(id, editandoNombre.trim());
    setEditandoId(null);
    await cargar();
  };

  const handleCancelar = () => setEditandoId(null);

  const handleEliminar = async (id) => {
    await deleteDepartamento(id);
    await cargar();
  };

  return (
    <MainLayout navItems={ADMIN_NAV}>
      <CrudLayout title="Departamentos" subtitle="Gestión de departamentos">

        <CrudSection title="Nuevo departamento">
          <div className="w-72">
            <CrudInput
              value={nuevoNombre}
              onChange={setNuevoNombre}
              onKeyEnter={handleCrear}
              onSubmit={handleCrear}
              placeholder="Nombre del departamento"
              buttonLabel="Crear"
              disabled={!nuevoNombre.trim()}
            />
          </div>
        </CrudSection>

        <CrudTable columns={COLUMNS} empty="No hay departamentos registrados.">
          {departamentos.map((dep) => {
            const editando = editandoId === dep.idDepartamento;
            return (
              <CrudTableRow key={dep.idDepartamento} columns={COLUMNS}>
                {editando ? (
                  <input
                    autoFocus
                    type="text"
                    value={editandoNombre}
                    onChange={(e) => setEditandoNombre(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")  handleGuardar(dep.idDepartamento);
                      if (e.key === "Escape") handleCancelar();
                    }}
                    className="w-72 border border-blue-400 rounded-lg px-3 py-1.5
                      text-sm bg-white dark:bg-[#13131f] text-gray-800 dark:text-gray-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      transition-colors duration-300"
                  />
                ) : (
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {dep.nombre}
                  </span>
                )}

                <div className="flex items-center gap-1">
                  {editando ? (
                    <>
                      <button onClick={() => handleGuardar(dep.idDepartamento)}
                        className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={handleCancelar}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditar(dep)}
                        className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEliminar(dep.idDepartamento)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </CrudTableRow>
            );
          })}
        </CrudTable>

      </CrudLayout>
    </MainLayout>
  );
}