
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { CalculationResults } from '../types';

interface Props {
  results: CalculationResults;
}

const ResultsDashboard: React.FC<Props> = ({ results }) => {
  const chartData = [
    { name: 'Топливо', value: results.breakdown.fuel, color: '#6366f1' },
    { name: 'Оплата труда', value: results.breakdown.labor, color: '#f59e0b' },
    { name: 'Обслуживание', value: results.breakdown.maintenance, color: '#10b981' },
  ];

  const efficiencyData = [
    { name: 'Себест/КМ', value: results.costPerKm },
    { name: 'Себест/Точка', value: results.costPerOutlet / 10 }, // scaled for visibility
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Общая стоимость</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{results.totalCost.toLocaleString('ru-RU')}</span>
            <span className="text-gray-400 font-medium">₽</span>
          </div>
          <div className="mt-4 text-xs text-green-600 bg-green-50 px-2 py-1 rounded inline-block w-fit">
            <i className="fas fa-arrow-right mr-1"></i>
            Весь маршрут
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Стоимость / Точка</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-indigo-600">{results.costPerOutlet.toLocaleString('ru-RU', { maximumFractionDigits: 1 })}</span>
            <span className="text-indigo-400 font-medium">₽</span>
          </div>
          <div className="mt-4 text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded inline-block w-fit">
             <i className="fas fa-bullseye mr-1"></i>
             Удельный расход
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Время работы</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-600">{results.totalTimeHours.toFixed(1)}</span>
            <span className="text-amber-400 font-medium">час.</span>
          </div>
          <div className="mt-4 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded inline-block w-fit">
            <i className="fas fa-hourglass-half mr-1"></i>
            Оценка смены
          </div>
        </div>
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Структура затрат</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)} ₽`, '']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Стоимость 1 км пути</h3>
          <div className="h-[250px] w-full">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-5xl font-extrabold text-indigo-700">
                {results.costPerKm.toFixed(2)}
                <span className="text-xl font-normal text-gray-400 ml-2">₽/км</span>
              </div>
              <p className="mt-4 text-center text-sm text-gray-500 max-w-[200px]">
                Это ключевой показатель операционной эффективности вашего транспорта.
              </p>
              <div className="mt-6 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, results.costPerKm * 2)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
