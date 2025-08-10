import { NavLink, useLocation } from "react-router-dom";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";

const getMeta = (path) => {
  if (path.startsWith("/api-hub")) {
    return {
      title: "API Hub",
      subtitle: "Explora endpoints simulados y ejemplos JSON.",
    };
  }
  return {
    title: "Plataforma OCR AI",
    subtitle:
      "Extrae información de PDFs y prepara tus endpoints de integración.",
  };
};

const Header = ({
  sidebarEnabled = false,
  collapsed,
  setCollapsed,
  openMobile,
}) => {
  const { pathname } = useLocation();
  const meta = getMeta(pathname);

  return (
    <header className="sticky top-0 z-30 bg-neutral-50/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-50/70 border-b border-neutral-200">
      <div className="px-4 md:px-6 lg:px-10 py-3 flex items-center gap-3">
        {/* Móvil: hamburger (solo si hay sidebar) */}
        {sidebarEnabled && (
          <button
            className="md:hidden p-2 rounded-md bg-neutral-100 hover:bg-neutral-200"
            onClick={openMobile}
            aria-label="Abrir menú"
          >
            <Menu size={18} />
          </button>
        )}

        {/* Desktop: toggle colapso (solo si hay sidebar) */}
        {sidebarEnabled && (
          <button
            className="hidden md:inline-flex p-2 rounded-md bg-neutral-100 hover:bg-neutral-200"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}

        {/* Títulos */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-neutral-800 truncate">
            {meta.title}
          </h1>
          <p className="text-sm text-neutral-600 truncate">{meta.subtitle}</p>
        </div>

        {/* Botones de navegación (segmented) */}
        <nav className="hidden sm:flex bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <NavLink
            to="/ocr"
            className={({ isActive }) =>
              `px-4 py-2 text-sm ${
                isActive ? "bg-brand-600 text-white" : "hover:bg-neutral-100"
              }`
            }
          >
            Plataforma OCR
          </NavLink>
          <NavLink
            to="/api-hub"
            className={({ isActive }) =>
              `px-4 py-2 text-sm ${
                isActive ? "bg-brand-600 text-white" : "hover:bg-neutral-100"
              }`
            }
          >
            API Hub
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
