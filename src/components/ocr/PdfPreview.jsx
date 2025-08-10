import { useEffect, useState } from "react";

const PdfPreview = ({ pdfPreviewUrl }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const normalHeights = "w-full h-[78vh] md:h-[82vh] lg:h-[86vh]";
  const expandedHeights = "w-[92vw] h-[90vh] md:w-[94vw] md:h-[92vh]";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Vista previa</h2>
        <button
          onClick={() => setExpanded(true)}
          className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          Expandir
        </button>
      </div>

      {!expanded && (
        <iframe
          src={pdfPreviewUrl}
          title="Vista previa PDF"
          className={`border border-gray-200 rounded ${normalHeights}`}
        />
      )}

      {expanded && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-3 shadow-2xl">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-700">
                Vista previa (expandida)
              </h3>
              <button
                onClick={() => setExpanded(false)}
                className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Cerrar (Esc)
              </button>
            </div>
            <iframe
              src={pdfPreviewUrl}
              title="Vista previa PDF expandida"
              className={`border border-gray-200 rounded ${expandedHeights}`}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfPreview;
