import { useEffect, useMemo, useRef, useState } from "react";
import { useToast } from "../components/ui/ToastProvider";
import Tooltip from "../components/ui/Tooltip";

const ApiHubPage = () => {
  const { show } = useToast();
  const [tags, setTags] = useState([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Carga de tags desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("currentTags");
      setTags(saved ? JSON.parse(saved) : []);
    } catch {
      setTags([]);
    }
  }, []);

  // Atajo Ctrl+K para enfocar el buscador
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tags;
    return tags.filter(
      (t) =>
        t.key.toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q)
    );
  }, [tags, query]);

  const copy = (text, label = "Copiado al portapapeles") => {
    navigator.clipboard.writeText(text);
    show(label, "success");
  };

  return (
    <div className="min-h-[calc(100vh-0px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">API Hub</h1>
        <p className="text-gray-600">
          Endpoints simulados generados con tus campos. Presiona{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">
            Ctrl
          </kbd>
          +
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">
            K
          </kbd>{" "}
          para buscar.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
        {/* Buscador */}
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por clave o descripción… (Ctrl+K)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />
          <span className="text-xs text-gray-500">
            {filtered.length} resultados
          </span>
        </div>

        {tags.length === 0 ? (
          <p className="text-gray-500">
            No hay tags. Ve a OCR y define algunos.
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No hay resultados para “{query}”.</p>
        ) : (
          filtered.map((tag, i) => {
            const endpoint = `/api/${tag.key}`;
            const sample = { [tag.key]: `Valor de ejemplo para ${tag.key}` };
            return (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-indigo-700 font-semibold">
                    GET {endpoint}
                  </h3>
                  <div className="flex gap-2">
                    <Tooltip content="Copiar endpoint">
                      <button
                        onClick={() => copy(endpoint, "Endpoint copiado")}
                        className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        Copiar endpoint
                      </button>
                    </Tooltip>
                    <Tooltip content="Copiar ejemplo JSON">
                      <button
                        onClick={() =>
                          copy(
                            JSON.stringify(sample, null, 2),
                            "Ejemplo JSON copiado"
                          )
                        }
                        className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        Copiar JSON
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{tag.description}</p>
                <div className="mt-3 bg-gray-50 border border-gray-200 rounded p-3 text-xs overflow-x-auto">
                  <pre>{JSON.stringify(sample, null, 2)}</pre>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ApiHubPage;
