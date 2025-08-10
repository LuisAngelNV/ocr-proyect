export function simulateExtraction(tags = []) {
  const simulatedData = {};

  tags.forEach((tag) => {
    switch (tag.key) {
      case "nombre":
        simulatedData[tag.key] = "Juan Pérez";
        break;
      case "fecha":
        simulatedData[tag.key] = "2025-08-06";
        break;
      case "direccion":
        simulatedData[tag.key] = "Calle Falsa 123, CDMX";
        break;
      case "rfc":
        simulatedData[tag.key] = "JUPE800101XXX";
        break;
      case "curp":
        simulatedData[tag.key] = "JUPE800101HDFRRN01";
        break;
      case "monto_total":
        simulatedData[tag.key] = "$12,450.00";
        break;
      case "numero_documento":
        simulatedData[tag.key] = "DOC-8921348";
        break;
      default:
        simulatedData[tag.key] = `Valor de ejemplo para ${tag.key}`;
        break;
    }
  });

  return simulatedData;
}
