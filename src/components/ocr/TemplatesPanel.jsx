import { useEffect, useRef, useState } from "react";
import { useToast } from "../ui/ToastProvider";

const LS_KEY = "ocrTemplates";

const TemplatesPanel = ({ setExtractionTags }) => {
  const { show } = useToast();

  const [templates, setTemplates] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [isLoadOpen, setIsLoadOpen] = useState(false);

  const [menuOpenId, setMenuOpenId] = useState(null);
  const [renameTarget, setRenameTarget] = useState(null);
  const [newName, setNewName] = useState("");

  const menusRef = useRef({});
  const importRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      setTemplates(saved ? JSON.parse(saved) : []);
    } catch {
      setTemplates([]);
    }
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuOpenId) return;
      const node = menusRef.current[menuOpenId];
      if (node && !node.contains(e.target)) setMenuOpenId(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpenId]);

  const persist = (arr) => {
    setTemplates(arr);
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
  };

  const getCurrentTags = () => {
    try {
      const raw = localStorage.getItem("currentTags");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const saveTemplate = () => {
    const name = (templateName || "").trim();
    const tags = getCurrentTags();
    if (!name) return show("Escribe un nombre para la plantilla.", "warning");
    if (!tags.length) return show("No hay tags para guardar.", "warning");
    if (templates.some((t) => t.name.toLowerCase() === name.toLowerCase()))
      return show("Ya existe una plantilla con ese nombre.", "error");

    const newTpl = {
      id: Date.now(),
      name,
      tags,
      createdAt: new Date().toISOString(),
      usageCount: 0,
      lastUsed: null,
    };
    const updated = [...templates, newTpl];
    persist(updated);
    setTemplateName("");
    show("Plantilla guardada.", "success");
  };

  const applyTemplate = (tpl) => {
    if (!Array.isArray(tpl.tags) || tpl.tags.length === 0)
      return show("Esta plantilla no tiene tags.", "warning");

    typeof setExtractionTags === "function" && setExtractionTags(tpl.tags);
    localStorage.setItem("currentTags", JSON.stringify(tpl.tags));

    const updated = templates.map((t) =>
      t.id === tpl.id
        ? {
            ...t,
            usageCount: (t.usageCount || 0) + 1,
            lastUsed: new Date().toISOString(),
          }
        : t
    );
    persist(updated);
    show(`Plantilla "${tpl.name}" aplicada.`, "success");
    setIsLoadOpen(false);
  };

  const deleteTemplate = (tplId) => {
    const updated = templates.filter((t) => t.id !== tplId);
    persist(updated);
    show("Plantilla eliminada.", "success");
    if (menuOpenId === tplId) setMenuOpenId(null);
  };

  const duplicateTemplate = (tpl) => {
    const base = `${tpl.name} (copia)`;
    let candidate = base;
    let i = 2;
    const lowerNames = templates.map((t) => t.name.toLowerCase());
    while (lowerNames.includes(candidate.toLowerCase())) {
      candidate = `${tpl.name} (copia ${i})`;
      i++;
    }

    const copy = {
      ...tpl,
      id: Date.now(),
      name: candidate,
      createdAt: new Date().toISOString(),
      usageCount: 0,
      lastUsed: null,
    };

    const updated = [...templates, copy];
    persist(updated);
    show(`Plantilla duplicada como "${candidate}".`, "success");
    setMenuOpenId(null);
  };

  const openRename = (tpl) => {
    setRenameTarget(tpl);
    setNewName(tpl.name);
    setMenuOpenId(null);
  };

  const confirmRename = () => {
    const name = (newName || "").trim();
    if (!name) return show("El nombre no puede estar vacío.", "warning");
    if (
      templates.some(
        (t) =>
          t.id !== renameTarget.id &&
          t.name.toLowerCase() === name.toLowerCase()
      )
    )
      return show("Ya existe otra plantilla con ese nombre.", "error");

    const updated = templates.map((t) =>
      t.id === renameTarget.id ? { ...t, name } : t
    );
    persist(updated);
    show("Plantilla renombrada.", "success");
    setRenameTarget(null);
    setNewName("");
  };

  // ---- Exportar / Importar ----
  const exportTemplates = () => {
    const blob = new Blob([JSON.stringify(templates, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    a.download = `templates_${ts}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    show("Plantillas exportadas.", "success");
  };

  const importTemplates = async (file) => {
    if (!file) return;
    try {
      const text = await file.text();
      const incoming = JSON.parse(text);
      if (!Array.isArray(incoming)) throw new Error("Formato inválido");

      // Fusiona por nombre (sin duplicar)
      const byName = new Map(templates.map((t) => [t.name.toLowerCase(), t]));
      for (const tpl of incoming) {
        if (!tpl?.name || !Array.isArray(tpl.tags)) continue;
        const key = tpl.name.toLowerCase();
        if (!byName.has(key)) {
          byName.set(key, {
            id: Date.now() + Math.random(),
            name: tpl.name,
            tags: tpl.tags,
            createdAt: new Date().toISOString(),
            usageCount: 0,
            lastUsed: null,
          });
        }
      }
      const merged = Array.from(byName.values());
      persist(merged);
      show("Plantillas importadas y fusionadas.", "success");
    } catch (e) {
      show("No se pudo importar. Verifica el JSON.", "error");
    } finally {
      if (importRef.current) importRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">📑 Plantillas</h2>

      {/* Guardar + Cargar + Import/Export */}
      <div className="flex flex-wrap gap-2">
        <input
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Nombre de la plantilla (ej. Factura SAT)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          aria-label="Nombre de la plantilla"
        />
        <button
          onClick={saveTemplate}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
        >
          Guardar
        </button>
        <button
          onClick={() => setIsLoadOpen(true)}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200"
        >
          Cargar
        </button>
        <button
          onClick={exportTemplates}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200"
        >
          Exportar
        </button>
        <label className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200 cursor-pointer">
          Importar
          <input
            ref={importRef}
            type="file"
            accept="application/json"
            onChange={(e) => importTemplates(e.target.files?.[0])}
            className="hidden"
          />
        </label>
      </div>

      {/* Últimas plantillas (resumen) */}
      {templates.length === 0 ? (
        <p className="text-sm text-gray-500">No hay plantillas guardadas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {templates
            .slice()
            .reverse()
            .slice(0, 4)
            .map((tpl) => (
              <div
                key={tpl.id}
                className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm relative"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="font-medium text-gray-800 truncate"
                      title={tpl.name}
                    >
                      {tpl.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {tpl.tags?.length || 0} tags •{" "}
                      {new Date(tpl.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div
                    className="relative"
                    ref={(el) => (menusRef.current[tpl.id] = el)}
                  >
                    <button
                      onClick={() =>
                        setMenuOpenId((prev) =>
                          prev === tpl.id ? null : tpl.id
                        )
                      }
                      className="px-2 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                      aria-haspopup="menu"
                      aria-expanded={menuOpenId === tpl.id}
                      aria-label={`Acciones para ${tpl.name}`}
                    >
                      ⋯
                    </button>

                    {menuOpenId === tpl.id && (
                      <div
                        role="menu"
                        className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
                      >
                        <button
                          onClick={() => applyTemplate(tpl)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                          role="menuitem"
                        >
                          Aplicar
                        </button>
                        <button
                          onClick={() => openRename(tpl)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                          role="menuitem"
                        >
                          Renombrar
                        </button>
                        <button
                          onClick={() => duplicateTemplate(tpl)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                          role="menuitem"
                        >
                          Duplicar
                        </button>
                        <button
                          onClick={() => deleteTemplate(tpl.id)}
                          className="w-full text-left px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                          role="menuitem"
                        >
                          Borrar
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {(tpl.tags || []).slice(0, 6).map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-[2px] text-[11px] rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {t.key}
                    </span>
                  ))}
                  {tpl.tags?.length > 6 && (
                    <span className="px-2 py-[2px] text-[11px] rounded-full bg-gray-50 text-gray-500 border border-gray-200">
                      +{tpl.tags.length - 6} más
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Modal de carga */}
      {isLoadOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-800">
                Cargar Plantilla
              </h3>
              <button
                onClick={() => setIsLoadOpen(false)}
                className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
              >
                Cerrar
              </button>
            </div>

            {templates.length === 0 ? (
              <p className="text-sm text-gray-500">
                No hay plantillas guardadas.
              </p>
            ) : (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="border border-gray-200 rounded-lg p-3 bg-white"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 truncate">
                          {tpl.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {tpl.tags?.length || 0} tags • Creada el{" "}
                          {new Date(tpl.createdAt).toLocaleDateString()}
                        </p>
                        {tpl.lastUsed && (
                          <p className="text-xs text-gray-400">
                            Último uso:{" "}
                            {new Date(tpl.lastUsed).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => applyTemplate(tpl)}
                          className="px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                          Aplicar
                        </button>
                        <button
                          onClick={() => deleteTemplate(tpl.id)}
                          className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Borrar
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {(tpl.tags || []).slice(0, 8).map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-[2px] text-[11px] rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                        >
                          {t.key}
                        </span>
                      ))}
                      {tpl.tags?.length > 8 && (
                        <span className="px-2 py-[2px] text-[11px] rounded-full bg-gray-50 text-gray-500 border border-gray-200">
                          +{tpl.tags.length - 8} más
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Renombrar */}
      {renameTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Renombrar plantilla
            </h3>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              placeholder="Nuevo nombre"
              aria-label="Nuevo nombre de la plantilla"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setRenameTarget(null)}
                className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRename}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesPanel;
