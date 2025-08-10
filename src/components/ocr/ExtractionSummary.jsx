const ExtractionSummary = ({ extractionTags = [], extractedJson = {} }) => {
  const totalTags = extractionTags.length;
  const high = Math.min(3, totalTags);
  const extractedCount = Object.values(extractedJson || {}).filter(
    (v) => v !== null && v !== undefined && v !== ""
  ).length;
  const success =
    totalTags > 0 ? Math.round((extractedCount / totalTags) * 100) : 0;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-blue-800 mb-2">
        📊 Resumen de extracción
      </h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="text-blue-700">
          Tags procesados:{" "}
          <span className="font-semibold text-blue-900">{totalTags}</span>
        </div>
        <div className="text-blue-700">
          Datos extraídos:{" "}
          <span className="font-semibold text-blue-900">{extractedCount}</span>
        </div>
        <div className="text-blue-700">
          Alta prioridad:{" "}
          <span className="font-semibold text-blue-900">{high}</span>
        </div>
        <div className="text-blue-700">
          Tasa de éxito:{" "}
          <span className="font-semibold text-blue-900">{success}%</span>
        </div>
      </div>
    </div>
  );
};

export default ExtractionSummary;
