import { NavLink } from "react-router-dom";
import { FileText, Key, X } from "lucide-react";
import Tooltip from "../components/ui/Tooltip";

const nav = [
  { to: "/ocr", label: "Plataforma OCR", icon: FileText },
  { to: "/api-hub", label: "API Hub", icon: Key },
];

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  // estilos base
  const base =
    "fixed md:static top-0 left-0 h-full md:h-auto z-40 bg-white border-r border-neutral-200";
  const width = collapsed ? "md:w-16" : "md:w-60";
  const hiddenMobile = mobileOpen ? "translate-x-0" : "-translate-x-full";
  const transition = "transition-transform md:transition-none";

  return (
    <>
      {/* overlay móvil */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`${base} ${width} ${hiddenMobile} ${transition}`}>
        {/* header del sidebar (móvil) */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-neutral-200">
          <div className="font-semibold">Menú</div>
          <button
            className="p-2 rounded-md bg-neutral-100 hover:bg-neutral-200"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-3 md:px-2 py-4">
          {/* branding mini */}
          <div className={`px-2 mb-4 ${collapsed ? "text-center" : ""}`}>
            <div className="text-brand-700 font-bold">
              {collapsed ? "OCR" : "OCR AI"}
            </div>
            {!collapsed && (
              <div className="text-xs text-neutral-500">
                Plataforma de extracción
              </div>
            )}
          </div>

          <nav className="space-y-1">
            {nav.map(({ to, label, icon: Icon }) => {
              const link = (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg border border-transparent
                    ${
                      isActive
                        ? "bg-brand-50 text-brand-700 border-brand-200"
                        : "hover:bg-neutral-100"
                    }`
                  }
                >
                  <Icon size={18} />
                  {!collapsed && <span className="text-sm">{label}</span>}
                </NavLink>
              );

              return collapsed ? (
                <Tooltip key={to} content={label} side="right">
                  <div>{link}</div>
                </Tooltip>
              ) : (
                link
              );
            })}
          </nav>

          {/* colapsar/expandir (desktop) */}
          <div className="hidden md:block mt-6">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full px-3 py-2 text-xs rounded-md bg-neutral-100 hover:bg-neutral-200"
            >
              {collapsed ? "Expandir" : "Colapsar"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
