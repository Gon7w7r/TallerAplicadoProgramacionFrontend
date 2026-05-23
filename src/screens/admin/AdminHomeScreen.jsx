import { useEffect, useState } from "react";
import { Users, Building2, GraduationCap, BookOpen, LayoutList } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/common/StatCard";
import ChartCard from "../../components/common/ChartCard";
import DemandaBar from "../../components/common/DemandaBar";
import PieChartCard from "../../components/common/PieChartCard";
import BarChartCard from "../../components/common/BarChartCard";
import { ADMIN_NAV } from "../../config/navConfig";
import { getDashboardResumen, getDemanda } from "../../api/adminApiRequest";

export default function AdminHomeScreen() {
  const [resumen, setResumen] = useState(null);
  const [demanda, setDemanda] = useState([]);

  useEffect(() => {
    getDashboardResumen().then(setResumen).catch(console.error);
    getDemanda().then((d) => { if (Array.isArray(d)) setDemanda(d); }).catch(console.error);
  }, []);

  const alumnosPorCarrera      = resumen?.alumnosPorCarrera?.map((i) => ({ name: i.nombre, value: i.cantidad })) ?? [];
  const seccionesPorAsignatura = resumen?.seccionesPorAsignatura?.map((i) => ({ name: i.nombre, value: i.cantidad })) ?? [];

  return (
    <MainLayout navItems={ADMIN_NAV}>
      <DashboardLayout title="Dashboard" subtitle="Resumen general">
        <div className="flex flex-col gap-6">

          {/* ── Stat cards ── */}
          <div className="flex-1 flex items-center justify-center min-w-0">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <StatCard label="Alumnos con horario" value={resumen?.alumnosConHorario} icon={Users}         color="blue"    />
                <StatCard label="Departamentos"        value={resumen?.departamentos}     icon={Building2}     color="emerald" />
                <StatCard label="Carreras"             value={resumen?.carreras}          icon={GraduationCap} color="purple"  />
              </div>
              <div className="flex gap-4 self-center">
                <StatCard label="Asignaturas" value={resumen?.asignaturas} icon={BookOpen}   color="amber" />
                <StatCard label="Secciones"   value={resumen?.secciones}   icon={LayoutList} color="pink"  />
              </div>
            </div>
          </div>

          {/* ── Gráficos + Demanda ── */}
          <div className="grid grid-cols-3 gap-4">

            <ChartCard title="Alumnos por carrera">
              <PieChartCard data={alumnosPorCarrera} />
            </ChartCard>

            <ChartCard title="Secciones por asignatura">
              <BarChartCard data={seccionesPorAsignatura} label="Secciones" />
            </ChartCard>

            <ChartCard title="Predicción de demanda">
              <div className="flex flex-col gap-4 mt-2">
                {demanda.length === 0 ? (
                  <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
                    Sin datos disponibles.
                  </p>
                ) : (
                  demanda.map((d) => (
                    <DemandaBar
                      key={d.nombreAsignatura}
                      nombre={d.nombreAsignatura}
                      inscritos={d.totalInscritos}
                      cupos={d.totalCupos}
                      ratio={d.ratio}
                    />
                  ))
                )}
              </div>
            </ChartCard>

          </div>

        </div>
      </DashboardLayout>
    </MainLayout>
  );
}