import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const dismiss = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  const show = (message, variant = "info", duration = 2400) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, variant }]);
    if (duration) setTimeout(() => dismiss(id), duration);
  };

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}

      {/* Contenedor de toasts (centro inferior) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] space-y-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto px-4 py-2 rounded-md border text-sm shadow-card bg-white
              ${
                t.variant === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : t.variant === "warning"
                  ? "bg-amber-50 border-amber-200 text-amber-700"
                  : t.variant === "error"
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-white border-neutral-200 text-neutral-700"
              }`}
          >
            <div className="flex items-center gap-3">
              <span>{t.message}</span>
              <button
                onClick={() => dismiss(t.id)}
                className="ml-auto px-2 py-1 text-xs rounded bg-neutral-100 hover:bg-neutral-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return ctx;
};
