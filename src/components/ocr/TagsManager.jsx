import { useState, useRef } from "react";
import { X, GripVertical, ArrowUp, ArrowDown, Star } from "../../assets/icons";
import Tooltip from "../ui/Tooltip";

const priorityInfo = (index) => {
  if (index < 3)
    return { label: "ALTA", cls: "bg-red-100 text-red-700 border-red-200" };
  if (index < 6)
    return {
      label: "MEDIA",
      cls: "bg-amber-100 text-amber-700 border-amber-200",
    };
  return { label: "BAJA", cls: "bg-gray-100 text-gray-700 border-gray-200" };
};

const TagsManager = ({ extractionTags = [], setExtractionTags }) => {
  const [dragIndex, setDragIndex] = useState(null);
  const overIndexRef = useRef(null);

  const removeTag = (key) => {
    const updated = extractionTags.filter((t) => t.key !== key);
    setExtractionTags(updated);
    localStorage.setItem("currentTags", JSON.stringify(updated));
  };

  const swap = (i, j) => {
    const arr = [...extractionTags];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setExtractionTags(arr);
    localStorage.setItem("currentTags", JSON.stringify(arr));
  };

  const moveUp = (i) => i > 0 && swap(i, i - 1);
  const moveDown = (i) => i < extractionTags.length - 1 && swap(i, i + 1);

  const onDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = (e, index) => {
    e.preventDefault();
    overIndexRef.current = index;
  };
  const onDrop = (e) => {
    e.preventDefault();
    const di = dragIndex;
    const oi = overIndexRef.current;
    setDragIndex(null);
    overIndexRef.current = null;
    if (di == null || oi == null || di === oi) return;

    const arr = [...extractionTags];
    const [moved] = arr.splice(di, 1);
    arr.splice(oi, 0, moved);
    setExtractionTags(arr);
    localStorage.setItem("currentTags", JSON.stringify(arr));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          🏷️ Tags de extracción
        </h2>
        {extractionTags.length > 0 && (
          <p className="text-xs text-gray-500">
            Arrastra para reordenar • 1-3{" "}
            <span className="font-medium">ALTA</span>, 4-6{" "}
            <span className="font-medium">MEDIA</span>, 7+{" "}
            <span className="font-medium">BAJA</span>
          </p>
        )}
      </div>

      {extractionTags.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay tags definidos.</p>
      ) : (
        <ul
          className="space-y-2"
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {extractionTags.map((tag, index) => {
            const pr = priorityInfo(index);
            const isHigh = index < 3;

            return (
              <li
                key={tag.key ?? index}
                className="flex items-start gap-3 bg-white border rounded-lg p-3 shadow-sm"
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={(e) => onDragOver(e, index)}
              >
                <div className="pt-1" aria-label="Arrastrar para reordenar">
                  <Tooltip content="Arrastrar para reordenar">
                    <span role="button" tabIndex={0}>
                      <GripVertical
                        size={16}
                        strokeWidth={1.75}
                        className="text-gray-400"
                      />
                    </span>
                  </Tooltip>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{tag.key}</span>
                    <span
                      className={`text-[10px] px-2 py-[2px] border rounded-full ${pr.cls}`}
                    >
                      {pr.label}
                    </span>
                    {isHigh && (
                      <Star
                        size={14}
                        className="text-red-500"
                        fill="currentColor"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{tag.description}</p>
                </div>

                <div className="flex items-center gap-1">
                  <Tooltip content="Subir prioridad">
                    <button
                      aria-label="Subir prioridad"
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
                      title="Subir"
                    >
                      <ArrowUp size={16} />
                    </button>
                  </Tooltip>
                  <Tooltip content="Bajar prioridad">
                    <button
                      aria-label="Bajar prioridad"
                      onClick={() => moveDown(index)}
                      disabled={index === extractionTags.length - 1}
                      className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
                      title="Bajar"
                    >
                      <ArrowDown size={16} />
                    </button>
                  </Tooltip>
                  <Tooltip content="Eliminar tag">
                    <button
                      aria-label="Eliminar tag"
                      onClick={() => removeTag(tag.key)}
                      className="p-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
                      title="Eliminar"
                    >
                      <X size={16} />
                    </button>
                  </Tooltip>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TagsManager;
