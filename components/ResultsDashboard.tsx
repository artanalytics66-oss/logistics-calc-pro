
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CalculationResults } from '../types';

interface Props {
  results: CalculationResults;
}

const ResultsDashboard: React.FC<Props> = ({ results }) => {
  const chartData = [
    { name: 'Топливо', value: results.breakdown.fuel, color: '#6366f1' },
    { name: 'З/П (база)', value: results.breakdown.labor, color: '#f59e0b' },
    { name: 'Налоги ФОТ', value: results.breakdown.taxes, color: '#ec4899' },
    { name: 'ТО и Ремонт', value: results.breakdown.maintenance, color: '#10b981' },
    { name: 'Накладные', value: results.breakdown.overheads, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Итоговая себестоимость</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{results.totalCost.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}</span>
            <span className="text-gray-400 font-medium">₽</span>
          </div>
          <div className="mt-4 text-xs text-green-600 bg-green-50 px-2 py-1 rounded inline-block w-fit">
            <i className="fas fa-check-double mr-1"></i>
            Полный расчет
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
             С учетом накладных
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Время рейса</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-600">{results.totalTimeHours.toFixed(1)}</span>
            <span className="text-amber-400 font-medium">час.</span>
          </div>
          <div className="mt-4 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded inline-block w-fit">
            <i className="fas fa-clock mr-1"></i>
            Путь + Разгрузка
          </div>
        </div>
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Детальная структура затрат</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
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
                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold mb-6 text-gray-800 self-start">Удельные показатели</h3>
          <div className="space-y-8 w-full">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Себестоимость 1 км</span>
                <span className="text-xl font-bold text-indigo-600">{results.costPerKm.toFixed(2)} ₽</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (results.costPerKm / 100) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
               <div className="flex gap-4">
                  <div className="flex-1">
                     <div className="text-xs text-indigo-500 uppercase font-bold tracking-tighter">Нагрузка ФОТ</div>
                     <div className="text-xl font-bold text-indigo-900">{((results.breakdown.taxes / results.totalCost) * 100).toFixed(1)}%</div>
                  </div>
                  <div className="flex-1 border-l border-indigo-200 pl-4">
                     <div className="text-xs text-indigo-500 uppercase font-bold tracking-tighter">Оверхед</div>
                     <div className="text-xl font-bold text-indigo-900">{((results.breakdown.overheads / results.totalCost) * 100).toFixed(1)}%</div>
                  </div>
               </div>
            </div>

            <p className="text-xs text-gray-500 italic text-center">
              Показатели рассчитаны с учетом налогов на ФОТ и коэффициента накладных расходов.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
