
import { GoogleGenAI, Type } from "@google/genai";
import { DeliveryInputs, CalculationResults } from "../types";

export const getAIAnalysis = async (inputs: DeliveryInputs, results: CalculationResults) => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY || '' });
  
  const prompt = `
    Как финансовый аналитик в сфере логистики, проанализируй следующие данные по доставке товара:
    
    Входные данные:
    - Расстояние: ${inputs.distance} км
    - Количество точек: ${inputs.outletCount}
    - Расход топлива: ${inputs.fuelConsumption} л/100км
    - Цена топлива: ${inputs.fuelPrice} руб/л
    - Зарплата водителя (день): ${inputs.driverSalary} руб
    - Обслуживание авто (день): ${inputs.vehicleMaintenance} руб
    
    Результаты расчета:
    - Общая себестоимость: ${results.totalCost.toFixed(2)} руб
    - Стоимость на 1 точку: ${results.costPerOutlet.toFixed(2)} руб
    - Стоимость на 1 км: ${results.costPerKm.toFixed(2)} руб
    
    Дай краткий анализ эффективности, выдели "узкие места" и предложи 3 конкретных совета по оптимизации затрат.
    Отвечай на русском языке.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "Не удалось получить анализ от ИИ.";
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Произошла ошибка при получении рекомендаций от ИИ.";
  }
};
