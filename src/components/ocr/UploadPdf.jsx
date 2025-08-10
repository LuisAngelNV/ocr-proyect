import { useRef, useState } from "react";
import { Upload, FileText, Eye } from "../../assets/icons";
import Tooltip from "../ui/Tooltip";
import { useToast } from "../ui/ToastProvider";

const UploadPdf = ({
  file,
  setFile,
  setPdfPreviewUrl,
  showPdfPreview,
  setShowPdfPreview,
}) => {
  const inputRef = useRef(null);
  const { show } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const onPick = () => inputRef.current?.click();

  const handleFile = (f) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      show("Selecciona un PDF válido", "warning");
      return;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setPdfPreviewUrl(url);
    setShowPdfPreview(true);
  };

  const onChange = (e) => handleFile(e.target.files?.[0]);

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Upload size={18} strokeWidth={1.75} className="shrink-0" />
        Subir Documento PDF
      </h2>

      {!file ? (
        <div
          onClick={onPick}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`w-full border-2 border-dashed rounded-xl p-10 transition cursor-pointer
            ${
              isDragging
                ? "border-indigo-400 bg-indigo-50/40"
                : "border-gray-300 bg-gray-50 hover:border-indigo-300"
            }
          `}
        >
          <div className="flex flex-col items-center gap-3 text-gray-600">
            <FileText size={36} strokeWidth={1.5} />
            <div className="text-center">
              <p className="font-medium text-gray-700">
                Haz clic o suelta aquí un PDF
              </p>
              <p className="text-sm text-gray-500">Solo archivos .pdf</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium text-gray-800 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Tooltip
              content={
                showPdfPreview ? "Ocultar vista previa" : "Ver vista previa"
              }
            >
              <button
                onClick={() => setShowPdfPreview(!showPdfPreview)}
                className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-2"
              >
                <Eye size={16} />
                {showPdfPreview ? "Ocultar" : "Ver"}
              </button>
            </Tooltip>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
};

export default UploadPdf;
