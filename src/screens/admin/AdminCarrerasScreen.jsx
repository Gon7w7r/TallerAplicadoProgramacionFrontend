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
  getCarreras,
  createCarrera,
  updateCarrera,
  deleteCarrera,
} from "../../api/adminApiRequest";

const TIPOS = ["Universitaria", "Técnica"];

const COLUMNS = [
  { label: "Nombre" },
  { label: "Tipo",     width: "140px" },
  { label: "Acciones", width: "80px"  },
];

export default function AdminCarrerasScreen() {
  const [carreras, setCarreras]             = useState([]);
  const [nuevoNombre, setNuevoNombre]       = useState("");
  const [nuevoTipo, setNuevoTipo]           = useState(TIPOS[0]);
  const [editandoId, setEditandoId]         = useState(null);
  const [editandoNombre, setEditandoNombre] = useState("");
  const [editandoTipo, setEditandoTipo]     = useState("");

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    try {
      const data = await getCarreras();
      if (Array.isArray(data)) setCarreras(data);
    } catch (e) { console.error(e); }
  };

  const handleCrear = async () => {
    if (!nuevoNombre.trim()) return;
    await createCarrera(nuevoNombre.trim(), nuevoTipo);
    setNuevoNombre("");
    setNuevoTipo(TIPOS[0]);
    await cargar();
  };

  const handleEditar = (c) => {
    setEditandoId(c.idCarrera);
    setEditandoNombre(c.nombre);
    setEditandoTipo(c.tipo);
  };

  const handleGuardar = async (id) => {
    if (!editandoNombre.trim()) return;
    await updateCarrera(id, editandoNombre.trim(), editandoTipo);
    setEditandoId(null);
    await cargar();
  };

  const handleCancelar = () => setEditandoId(null);

  const handleEliminar = async (id) => {
    await deleteCarrera(id);
    await cargar();
  };

  return (
    <MainLayout navItems={ADMIN_NAV}>
      <CrudLayout title="Carreras" subtitle="Gestión de carreras">

        <CrudSection title="Nueva carrera">
          <div className="flex gap-2">
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCrear()}
              placeholder="Nombre de la carrera"
              className="w-72 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2
                text-sm bg-white dark:bg-[#13131f] text-gray-800 dark:text-gray-200
                focus:outline-none focus:ring-2 focus:ring-blue-500
                placeholder:text-gray-400 dark:placeholder:text-gray-600
                transition-colors duration-300"
            />
            <select
              value={nuevoTipo}
              onChange={(e) => setNuevoTipo(e.target.value)}
              className="border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2
                text-sm bg-white dark:bg-[#13131f] text-gray-800 dark:text-gray-200
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-300"
            >
              {TIPOS.map((t) => <option key={t}>{t}</option>)}
            </select>
            <button
              onClick={handleCrear}
              disabled={!nuevoNombre.trim()}
              className="px-4 py-2 rounded-xl text-sm font-medium text-white
                bg-blue-500 hover:bg-blue-600 disabled:opacity-40
                disabled:cursor-not-allowed transition-colors"
            >
              Crear
            </button>
          </div>
        </CrudSection>

        <CrudTable columns={COLUMNS} empty="No hay carreras registradas.">
          {carreras.map((c) => {
            const editando = editandoId === c.idCarrera;
            return (
              <CrudTableRow key={c.idCarrera} columns={COLUMNS}>
                {editando ? (
                  <input
                    autoFocus
                    type="text"
                    value={editandoNombre}
                    onChange={(e) => setEditandoNombre(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")  handleGuardar(c.idCarrera);
                      if (e.key === "Escape") handleCancelar();
                    }}
                    className="w-72 border border-blue-400 rounded-lg px-3 py-1.5
                      text-sm bg-white dark:bg-[#13131f] text-gray-800 dark:text-gray-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      transition-colors duration-300"
                  />
                ) : (
                  <span className="text-sm text-gray-700 dark:text-gray-300">{c.nombre}</span>
                )}

                {editando ? (
                  <select
                    value={editandoTipo}
                    onChange={(e) => setEditandoTipo(e.target.value)}
                    className="border border-blue-400 rounded-lg px-3 py-1.5
                      text-sm bg-white dark:bg-[#13131f] text-gray-800 dark:text-gray-200
                      focus:outline-none transition-colors duration-300"
                  >
                    {TIPOS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                ) : (
                  <span className="text-xs px-3 py-1 rounded-full
                    bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                    {c.tipo}
                  </span>
                )}

                <div className="flex items-center gap-1">
                  {editando ? (
                    <>
                      <button onClick={() => handleGuardar(c.idCarrera)}
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
                      <button onClick={() => handleEditar(c)}
                        className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEliminar(c.idCarrera)}
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