import { NavLink } from "react-router-dom";
import { FileText, Code } from "../assets/icons";

const LinkItem = ({ to, icon: IconCmp, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group flex items-center gap-3 px-3 py-2 rounded-lg transition
       ${
         isActive
           ? "bg-indigo-100 text-indigo-700"
           : "text-gray-700 hover:bg-gray-100"
       }`
    }
  >
    <IconCmp size={18} strokeWidth={1.75} className="shrink-0" />
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
);

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-700 tracking-tight">
          OCR AI
        </h1>
        <p className="text-xs text-gray-500">Plataforma de extracción</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <LinkItem to="/ocr" icon={FileText} label="Plataforma OCR" />
        <LinkItem to="/api-hub" icon={Code} label="API Hub" />
      </nav>
    </aside>
  );
};

export default Sidebar;
