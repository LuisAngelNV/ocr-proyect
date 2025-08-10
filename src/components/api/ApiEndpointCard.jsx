import { useState } from "react";

const ApiEndpointCard = ({ tag }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`/api/${tag.key}`);
    alert("¡Copiado al portapapeles!");
  };

  return (
    <div className="bg-gray-50 border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-indigo-600">
        GET /api/{tag.key}
      </h3>
      <p className="text-gray-600 text-sm">{tag.description}</p>

      <button
        onClick={copyToClipboard}
        className="mt-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Copiar Endpoint
      </button>
    </div>
  );
};

export default ApiEndpointCard;
