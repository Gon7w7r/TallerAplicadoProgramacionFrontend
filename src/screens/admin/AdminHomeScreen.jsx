import MainLayout from "../../layouts/MainLayout";

const NAV_ITEMS = [
  { label: "Inicio", path: "/admin/home" },
];

export default function AdminHomeScreen() {
  return (
    <MainLayout
      title="Panel Administrativo"
      subtitle="Bienvenido"
      navItems={NAV_ITEMS}
      singleColumn
    >
      <div className="flex flex-col items-center gap-3 text-gray-500">
        <span className="text-5xl">🏫</span>
        <p className="text-lg font-medium text-gray-700">Bienvenido al panel administrativo</p>
        <p className="text-sm">Selecciona una opción del menú para continuar.</p>
      </div>
    </MainLayout>
  );
}