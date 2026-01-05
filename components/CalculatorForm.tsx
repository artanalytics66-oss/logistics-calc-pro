
import React from 'react';
import { DeliveryInputs } from '../types';

interface Props {
  inputs: DeliveryInputs;
  onChange: (name: keyof DeliveryInputs, value: number) => void;
}

const CalculatorForm: React.FC<Props> = ({ inputs, onChange }) => {
  const fields: { label: string; name: keyof DeliveryInputs; icon: string; suffix: string }[] = [
    { label: 'Цена топлива', name: 'fuelPrice', icon: 'fa-gas-pump', suffix: '₽/л' },
    { label: 'Расход топлива', name: 'fuelConsumption', icon: 'fa-tachometer-alt', suffix: 'л/100км' },
    { label: 'Зарплата водителя', name: 'driverSalary', icon: 'fa-user-tie', suffix: '₽/день' },
    { label: 'Амортизация/ТО', name: 'vehicleMaintenance', icon: 'fa-tools', suffix: '₽/день' },
    { label: 'Дистанция маршрута', name: 'distance', icon: 'fa-route', suffix: 'км' },
    { label: 'Кол-во точек', name: 'outletCount', icon: 'fa-store', suffix: 'шт' },
    { label: 'Время на точку', name: 'avgStopDuration', icon: 'fa-clock', suffix: 'мин' },
    { label: 'Вес груза', name: 'totalWeight', icon: 'fa-weight-hanging', suffix: 'кг' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
        <i className="fas fa-sliders-h text-indigo-600"></i>
        Параметры доставки
      </h2>
      
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              <i className={`fas ${field.icon} w-4 text-gray-400 text-xs`}></i>
              {field.label}
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                value={inputs[field.name]}
                onChange={(e) => onChange(field.name, parseFloat(e.target.value) || 0)}
                className="block w-full rounded-lg border-gray-300 pl-3 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 transition-all outline-none hover:border-indigo-300"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-400 sm:text-sm">{field.suffix}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
        <p className="text-xs text-indigo-700 leading-relaxed italic">
          <i className="fas fa-info-circle mr-1"></i>
          Изменяйте значения, чтобы мгновенно увидеть результат пересчета себестоимости в правой панели.
        </p>
      </div>
    </div>
  );
};

export default CalculatorForm;
