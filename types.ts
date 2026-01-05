
export interface DeliveryInputs {
  fuelPrice: number;
  fuelConsumption: number; // L/100km
  driverSalary: number; // daily
  vehicleMaintenance: number; // daily
  distance: number; // km
  outletCount: number;
  avgStopDuration: number; // minutes
  totalWeight: number; // kg
}

export interface CalculationResults {
  fuelCost: number;
  totalCost: number;
  costPerOutlet: number;
  costPerKm: number;
  totalTimeHours: number;
  breakdown: {
    fuel: number;
    labor: number;
    maintenance: number;
  };
}

export interface AIAdvice {
  summary: string;
  recommendations: string[];
  optimizationTips: string[];
}
