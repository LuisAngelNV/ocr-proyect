import { NavLink } from "react-router-dom";
import { FileText, Code } from "../../assets/icons";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-bold mb-6">Menú</h2>
      <nav className="space-y-2">
        <NavLink
          to="/ocr"
          className={({ isActive }) =>
            `flex items-center p-2 rounded ${
              isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
            }`
          }
        >
          <FileText className="mr-2" size={18} /> OCR
        </NavLink>
        <NavLink
          to="/api-hub"
          className={({ isActive }) =>
            `flex items-center p-2 rounded ${
              isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
            }`
          }
        >
          <Code className="mr-2" size={18} /> API Hub
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
