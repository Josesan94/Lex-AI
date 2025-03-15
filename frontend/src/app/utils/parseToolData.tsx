export function cleanAndParseData(rawOutput: string): unknown | null {
    const cleaned = rawOutput.replace(/(^"|"$)/g, "").replace(/```/g, "");
  
    const jsonStr = cleaned.replace(/'/g, '"');
  
    try {
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Error al parsear data:", error);
      return null;
    }
  }
  