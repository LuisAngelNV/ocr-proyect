const defaultSuggestions = [
  { key: "nombre", description: "Nombre completo de la persona" },
  { key: "fecha", description: "Fecha del documento" },
  { key: "direccion", description: "Dirección completa del domicilio" },
  { key: "rfc", description: "Registro Federal del Contribuyente" },
  { key: "curp", description: "Clave Única de Registro de Población" },
  { key: "monto_total", description: "Monto total del documento" },
];

const SuggestedTags = ({ extractionTags = [], setExtractionTags }) => {
  const addSuggestion = (suggestedTag) => {
    const exists = extractionTags.some((tag) => tag.key === suggestedTag.key);
    if (!exists) {
      const updatedTags = [...extractionTags, suggestedTag];
      setExtractionTags(updatedTags);
      localStorage.setItem("currentTags", JSON.stringify(updatedTags));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        🧠 Tags sugeridos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {defaultSuggestions.map((tag, index) => (
          <button
            key={index}
            onClick={() => addSuggestion(tag)}
            className="text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 text-sm transition"
          >
            <span className="block font-medium text-gray-700">{tag.key}</span>
            <span className="block text-gray-500">{tag.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedTags;
