const NiceFallback = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="card max-w-md text-center">
      <h2 className="text-lg font-semibold text-red-700 mb-1">
        Algo no salió bien
      </h2>
      <p className="text-sm text-neutral-600 mb-4">
        Intenta recargar la página. Si el problema persiste, revisa la consola o
        abre un issue.
      </p>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Recargar
        </button>
        <button onClick={() => window.history.back()} className="btn-secondary">
          Volver
        </button>
      </div>
    </div>
  </div>
);

export default NiceFallback;
