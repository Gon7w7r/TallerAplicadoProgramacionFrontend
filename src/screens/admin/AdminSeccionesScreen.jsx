import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import CrudLayout from "../../layouts/CrudLayout";
import CrudTable from "../../components/common/CrudTable";
import CrudTableRow from "../../components/common/CrudTableRow";
import { ADMIN_NAV } from "../../config/navConfig";
import { getSecciones, getAlumnosInscritos } from "../../api/adminApiRequest";

const COLUMNS = [
  { label: "Asignatura" },
  { label: "Profesor"   },
  { label: "Sala",      width: "120px" },
  { label: "Cupos",     width: "80px"  },
  { label: "Inscritos", width: "80px"  },
];

export default function AdminSeccionesScreen() {
  const [secciones, setSecciones] = useState([]);
  const [inscritos, setInscritos] = useState({});

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    try {
      const data = await getSecciones();
      if (!Array.isArray(data)) return;
      setSecciones(data);
      const counts = await Promise.all(
        data.map((s) =>
          getAlumnosInscritos(s.idSeccion).then((c) => ({ id: s.idSeccion, count: c }))
        )
      );
      const map = {};
      counts.forEach(({ id, count }) => { map[id] = count; });
      setInscritos(map);
    } catch (e) { console.error(e); }
  };

  return (
    <MainLayout navItems={ADMIN_NAV}>
      <CrudLayout title="Secciones" subtitle="Listado de secciones">

        <CrudTable columns={COLUMNS} empty="No hay secciones registradas.">
          {secciones.map((s) => (
            <CrudTableRow key={s.idSeccion} columns={COLUMNS}>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {s.asignatura.nombre}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {s.profesor.usuario.nombre}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {s.sala.nombre}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {s.cupos}
              </span>
              <span className={`text-sm font-medium
                ${inscritos[s.idSeccion] >= s.cupos
                  ? "text-red-500"
                  : "text-emerald-500"}`}>
                {inscritos[s.idSeccion] ?? "—"}
              </span>
            </CrudTableRow>
          ))}
        </CrudTable>

      </CrudLayout>
    </MainLayout>
  );
}