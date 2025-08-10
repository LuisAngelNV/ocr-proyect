export const simulateOCRRequest = (tags) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = {};
      tags.forEach((tag) => {
        result[tag.key] = `Ejemplo de ${tag.key}`;
      });
      resolve(result);
    }, 1500); 
  });
};
