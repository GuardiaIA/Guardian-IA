import { GoogleGenAI, Type } from "@google/genai";
import { ReportData, RiskLevel } from "../types";

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const safetyReportSchema = {
    type: Type.OBJECT,
    properties: {
        riskLevel: {
            type: Type.STRING,
            enum: ["Verde", "Amarillo", "Rojo"],
            description: "Clasificación del riesgo: Verde (Seguro), Amarillo (Precaución), Rojo (Peligro)."
        },
        anomalyDescription: {
            type: Type.STRING,
            description: "Descripción detallada de todas las anomalías y riesgos de seguridad identificados para el personal de servicio (limpieza, mantenimiento)."
        },
        ppeRecommendation: {
            type: Type.STRING,
            description: "Listado detallado del Equipamiento de Protección Personal (EPP) requerido para realizar tareas de forma segura."
        },
        infrastructureSuggestion: {
            type: Type.STRING,
            description: "Sugerencias para reparaciones o mejoras de infraestructura a largo plazo para eliminar los riesgos."
        },
        legalReference: {
            type: Type.STRING,
            description: "Cita de los artículos, capítulos o secciones pertinentes de las leyes argentinas 19.587 y 24.557 que fundamentan el análisis."
        }
    },
    required: ["riskLevel", "anomalyDescription", "ppeRecommendation", "infrastructureSuggestion", "legalReference"]
};

export const analyzeImageForSafety = async (imageFile: File, location: string, apiKey: string): Promise<ReportData> => {
    if (!apiKey) {
        throw new Error("La clave de API de Gemini no está configurada.");
    }
    const ai = new GoogleGenAI({ apiKey });

    try {
        const imagePart = await fileToGenerativePart(imageFile);

        const prompt = `
        Actúa como 'Guarían IA', un experto en seguridad e higiene laboral en Argentina. Tu análisis debe basarse en la imagen provista y cumplir estrictamente con las leyes argentinas: Ley 19.587 (Higiene y Seguridad) y Ley 24.557 (Riesgos del Trabajo).
        El objetivo es identificar riesgos para el personal no docente (mantenimiento, limpieza) en la ubicación: "${location}".

        Analiza la imagen adjunta y genera un informe de riesgo profesional. Identifica todas las anomalías de seguridad visibles.
        
        Debes devolver únicamente un objeto JSON válido con la siguiente estructura:
        - riskLevel: Clasificación del riesgo general (Verde, Amarillo, o Rojo).
        - anomalyDescription: Descripción detallada de los peligros.
        - ppeRecommendation: EPP recomendado.
        - infrastructureSuggestion: Sugerencias de mejora.
        - legalReference: Citas legales específicas de las leyes mencionadas que justifiquen el riesgo.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ parts: [{ text: prompt }, imagePart] }],
            config: {
                responseMimeType: "application/json",
                responseSchema: safetyReportSchema,
                temperature: 0.2
            }
        });
        
        // FIX: Use nullish coalescing operator (??) to provide a safe default ('')
        // if response.text is null or undefined. This permanently resolves the TS18048 error.
        const jsonString = (response.text ?? '').trim();
        
        if (!jsonString) {
            throw new Error("La respuesta de la API estaba vacía. Intente de nuevo.");
        }
        
        const reportData = JSON.parse(jsonString);

        const apiRiskLevel = reportData.riskLevel;
        if (!Object.values(RiskLevel).includes(apiRiskLevel)) {
            console.warn(`Received invalid riskLevel: ${apiRiskLevel}. Defaulting to Amarillo.`);
            reportData.riskLevel = RiskLevel.Amarillo;
        }

        return reportData as ReportData;

    } catch (error) {
        console.error("Error analyzing image with Gemini:", error);
        if (error instanceof Error && error.message.includes("API key not valid")) {
             throw new Error("La clave de API no es válida. Por favor, verifíquela.");
        }
        throw new Error("No se pudo analizar la imagen. Verifique la clave de API y la imagen subida.");
    }
};