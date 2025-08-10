import { FileText } from "../../assets/icons";

const RightEmptyState = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 mb-4">
        <FileText size={28} />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">
        Aún no hay vista previa
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        Sube un PDF y haz clic en “Ver” para mostrar la vista previa. Luego
        simula la extracción.
      </p>
      <ul className="text-left mx-auto mt-4 space-y-1 text-sm text-gray-600 max-w-md">
        <li>• Define tus tags clave en el panel izquierdo.</li>
        <li>• Puedes reordenarlos por prioridad (ALTA / MEDIA / BAJA).</li>
        <li>• Guarda una plantilla para reutilizar la configuración.</li>
      </ul>
    </div>
  );
};

export default RightEmptyState;
