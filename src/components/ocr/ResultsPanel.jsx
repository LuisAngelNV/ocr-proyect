import ExtractionSummary from "./ExtractionSummary";
import { Clipboard, X } from "../../assets/icons";
import { useToast } from "../ui/ToastProvider";

const ResultsPanel = ({
  extractedJson,
  setExtractedJson,
  extractionTags = [],
}) => {
  const { show } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(extractedJson, null, 2));
    show("Resultado copiado", "success");
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(extractedJson, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const ts = new Date().toISOString().split("T")[0];
    a.download = `ocr_result_${ts}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    show("Descarga iniciada", "success");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Resultados OCR</h2>
        <div className="flex gap-2">
          <button onClick={downloadJson} className="btn-secondary">
            Descargar JSON
          </button>
          <button
            onClick={copyToClipboard}
            className="btn-ghost"
            title="Copiar JSON"
          >
            <Clipboard size={18} />
          </button>
          <button
            onClick={() => setExtractedJson(null)}
            className="btn-danger"
            title="Cerrar"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <ExtractionSummary
        extractionTags={extractionTags}
        extractedJson={extractedJson}
      />

      <pre className="bg-gray-50 rounded p-3 text-sm overflow-auto max-h-96 border border-gray-200">
        {JSON.stringify(extractedJson, null, 2)}
      </pre>
    </div>
  );
};

export default ResultsPanel;
