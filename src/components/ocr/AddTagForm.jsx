import { useState } from "react";
import { useToast } from "../ui/ToastProvider";

const AddTagForm = ({ extractionTags = [], setExtractionTags }) => {
  const [keyInput, setKeyInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const { show } = useToast();

  const addTag = () => {
    const key = keyInput.trim();
    const description = descInput.trim();
    if (!key || !description) {
      show("Completa clave y descripción", "warning");
      return;
    }
    const exists = extractionTags.some((t) => t.key === key);
    if (exists) {
      show("Ya existe un tag con esa clave.", "error");
      return;
    }
    const updated = [...extractionTags, { key, description }];
    setExtractionTags(updated);
    localStorage.setItem("currentTags", JSON.stringify(updated));
    setKeyInput("");
    setDescInput("");
    show("Tag agregado", "success");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        ➕ Agregar tag
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="clave (ej. nombre)"
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
        />
        <input
          value={descInput}
          onChange={(e) => setDescInput(e.target.value)}
          placeholder="descripción"
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
        />
        <button
          onClick={addTag}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default AddTagForm;
