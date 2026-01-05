
import React, { useState, useMemo, useCallback } from 'react';
import { DeliveryInputs, CalculationResults } from './types';
import CalculatorForm from './components/CalculatorForm';
import ResultsDashboard from './components/ResultsDashboard';
import AIConsultant from './components/AIConsultant';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<DeliveryInputs>({
    fuelPrice: 60.5,
    fuelConsumption: 12,
    driverSalary: 3500,
    vehicleMaintenance: 1200,
    distance: 150,
    outletCount: 10,
    avgStopDuration: 20,
    totalWeight: 500,
    avgSpeed: 45,
    repairTiresPerKm: 5.5,
    payrollTaxRate: 30.2,
    overheadRate: 15
  });

  const results = useMemo((): CalculationResults => {
    // 1. Fuel Cost
    const fuelCost = (inputs.distance / 100) * inputs.fuelConsumption * inputs.fuelPrice;
    
    // 2. Labor Cost with Taxes
    const laborBase = inputs.driverSalary;
    const taxes = laborBase * (inputs.payrollTaxRate / 100);
    const laborTotal = laborBase + taxes;
    
    // 3. Maintenance (Fixed Daily + Variable per KM)
    const maintenanceTotal = inputs.vehicleMaintenance + (inputs.distance * inputs.repairTiresPerKm);
    
    // 4. Subtotal (Direct costs)
    const directCosts = fuelCost + laborTotal + maintenanceTotal;
    
    // 5. Final Total with Overheads
    const overheads = directCosts * (inputs.overheadRate / 100);
    const totalCost = directCosts + overheads;
    
    // 6. Time Calculation
    const drivingTime = inputs.distance / Math.max(1, inputs.avgSpeed);
    const stopTime = (inputs.outletCount * inputs.avgStopDuration) / 60;
    const totalTimeHours = drivingTime + stopTime;

    return {
      fuelCost,
      totalCost,
      costPerOutlet: inputs.outletCount > 0 ? totalCost / inputs.outletCount : 0,
      costPerKm: inputs.distance > 0 ? totalCost / inputs.distance : 0,
      totalTimeHours,
      breakdown: {
        fuel: fuelCost,
        labor: laborBase,
        maintenance: maintenanceTotal,
        taxes: taxes,
        overheads: overheads
      }
    };
  }, [inputs]);

  const handleInputChange = useCallback((name: keyof DeliveryInputs, value: number) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-8 shadow-lg mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <i className="fas fa-truck-fast"></i>
                LogisticsCalc Pro
              </h1>
              <p className="mt-2 text-indigo-100 opacity-90">
                Профессиональный расчет себестоимости доставки по торговым точкам
              </p>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-sm bg-indigo-600 px-3 py-1 rounded-full border border-indigo-400">
                v1.1.0 Detail Edition
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-4">
            <CalculatorForm inputs={inputs} onChange={handleInputChange} />
          </div>

          {/* Right Column: Results & AI */}
          <div className="lg:col-span-8 space-y-8">
            <ResultsDashboard results={results} />
            <AIConsultant inputs={inputs} results={results} />
          </div>

        </div>
      </main>

      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>&copy; 2024 LogisticsCalc. Инструмент для финансового планирования логистики.</p>
      </footer>
    </div>
  );
};

export default App;
