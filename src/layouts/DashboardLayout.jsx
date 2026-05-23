export default function DashboardLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="flex-1 flex flex-col min-w-0 p-6 gap-4">

      {/* Título */}
      {(title || subtitle) && (
        <header className="flex items-center gap-3 shrink-0">
          {title && (
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {title}
            </span>
          )}
          {subtitle && (
            <>
              <span className="text-sm text-gray-300 dark:text-gray-600">—</span>
              <span className="text-sm text-gray-400 dark:text-gray-500">{subtitle}</span>
            </>
          )}
        </header>
      )}

      {/* Contenido libre */}
      <main className="flex-1 min-w-0">
        {children}
      </main>

    </div>
  );
}