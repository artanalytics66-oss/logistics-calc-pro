
import React, { useState } from 'react';
import { DeliveryInputs, CalculationResults } from '../types';
import { getAIAnalysis } from '../services/geminiService';

interface Props {
  inputs: DeliveryInputs;
  results: CalculationResults;
}

const AIConsultant: React.FC<Props> = ({ inputs, results }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await getAIAnalysis(inputs, results);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <i className="fas fa-robot text-white text-xl"></i>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">AI Логист-Консультант</h3>
            <p className="text-indigo-100 text-xs opacity-80">Умный анализ вашего маршрута</p>
          </div>
        </div>
        {!analysis && !loading && (
          <button
            onClick={handleAnalyze}
            className="bg-white text-indigo-700 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Анализировать
          </button>
        )}
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-500 text-sm animate-pulse">Искусственный интеллект изучает ваши данные...</p>
          </div>
        ) : analysis ? (
          <div className="space-y-4">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {analysis}
              </div>
            </div>
            <button
              onClick={() => setAnalysis(null)}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              <i className="fas fa-sync-alt"></i> Обновить данные и пересчитать
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-300 mb-4">
              <i className="fas fa-brain text-5xl opacity-20"></i>
            </div>
            <h4 className="text-gray-700 font-medium mb-2">Готовы оптимизировать затраты?</h4>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Нажмите кнопку выше, чтобы получить персональные рекомендации по снижению себестоимости и повышению эффективности доставки.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIConsultant;
