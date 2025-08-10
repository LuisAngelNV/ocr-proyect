import { useEffect, useRef, useState } from "react";
import UploadPdf from "../components/ocr/UploadPdf";
import AddTagForm from "../components/ocr/AddTagForm";
import TagsManager from "../components/ocr/TagsManager";
import SuggestedTags from "../components/ocr/SuggestedTags";
import TemplatesPanel from "../components/ocr/TemplatesPanel";
import PdfPreview from "../components/ocr/PdfPreview";
import ResultsPanel from "../components/ocr/ResultsPanel";
import RightEmptyState from "../components/ocr/RightEmptyState";
import { simulateExtraction } from "../utils/simulateExtraction";
import { Loader2 } from "../assets/icons";

const OcrPage = () => {
  // ----------------------------
  // Estado local del módulo OCR
  // ----------------------------
  const [file, setFile] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [extractedJson, setExtractedJson] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Tags: se inicializan desde localStorage si existen
  const [extractionTags, setExtractionTags] = useState(() => {
    try {
      const saved = localStorage.getItem("currentTags");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { key: "nombre", description: "Nombre completo de la persona" },
      { key: "fecha", description: "Fecha del documento" },
      {
        key: "numero_documento",
        description: "Número de identificación o documento",
      },
    ];
  });

  // Persistir tags en localStorage cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem("currentTags", JSON.stringify(extractionTags));
    } catch {}
  }, [extractionTags]);

  // Limpia preview URL al desmontar
  useEffect(() => {
    return () => {
      if (pdfPreviewUrl) URL.revokeObjectURL(pdfPreviewUrl);
    };
  }, [pdfPreviewUrl]);

  // Simulación de extracción (mini loader + latencia)
  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setTimeout(() => {
      setExtractedJson(simulateExtraction(extractionTags));
      setIsSimulating(false);
    }, 900);
  };

  // Atajo Ctrl+Enter para simular
  const simulateBtnRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        simulateBtnRef.current?.click();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="min-h-[calc(100vh-0px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Plataforma OCR AI</h1>
        <p className="text-gray-600">
          Extrae información de PDFs y prepara tus endpoints de integración.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 📤 Columna izquierda */}
        <div className="space-y-6">
          {/* Upload */}
          <div className="card">
            <UploadPdf
              file={file}
              setFile={setFile}
              pdfPreviewUrl={pdfPreviewUrl}
              setPdfPreviewUrl={setPdfPreviewUrl}
              showPdfPreview={showPdfPreview}
              setShowPdfPreview={setShowPdfPreview}
            />
          </div>

          {/* Form para agregar tags */}
          <AddTagForm
            extractionTags={extractionTags}
            setExtractionTags={setExtractionTags}
          />

          {/* Manager con drag & drop y prioridades */}
          <div className="card">
            <TagsManager
              extractionTags={extractionTags}
              setExtractionTags={setExtractionTags}
            />
          </div>

          {/* Sugeridos */}
          <div className="card">
            <SuggestedTags
              extractionTags={extractionTags}
              setExtractionTags={setExtractionTags}
            />
          </div>

          {/* Plantillas (guardar/cargar/duplicar/renombrar/aplicar) */}
          <div className="card">
            <TemplatesPanel setExtractionTags={setExtractionTags} />
          </div>

          {/* Simular extracción */}
          <button
            ref={simulateBtnRef}
            onClick={handleSimulate}
            disabled={isSimulating || extractionTags.length === 0}
            className={`w-full px-4 py-2 rounded-md text-white transition-colors
              ${
                isSimulating
                  ? "bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }
            `}
          >
            {isSimulating ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="animate-spin" size={16} />
                Procesando…
              </span>
            ) : (
              "Simular extracción OCR (Ctrl+Enter)"
            )}
          </button>
        </div>

        {/* 📄 Columna derecha */}
        <div className="space-y-6">
          {/* Vista previa PDF (grande por defecto; expandible en el componente) */}
          {showPdfPreview && pdfPreviewUrl && (
            <div className="card">
              <PdfPreview pdfPreviewUrl={pdfPreviewUrl} />
            </div>
          )}

          {/* Resultados + resumen */}
          {extractedJson && (
            <div className="card">
              <ResultsPanel
                extractedJson={extractedJson}
                setExtractedJson={setExtractedJson}
                extractionTags={extractionTags}
              />
            </div>
          )}

          {/* Empty state si no hay nada que mostrar */}
          {!showPdfPreview && !extractedJson && <RightEmptyState />}
        </div>
      </div>
    </div>
  );
};

export default OcrPage;
