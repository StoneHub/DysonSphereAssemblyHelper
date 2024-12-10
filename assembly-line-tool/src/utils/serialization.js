export function exportAssembly(items, connections) {
    const data = { items, connections };
    const json = JSON.stringify(data);
    return btoa(json);
  }
  
  export const importAssembly = (seed) => {
    try {
      const decoded = atob(seed);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Failed to decode or parse seed:', error);
      throw error;
    }
  };
  