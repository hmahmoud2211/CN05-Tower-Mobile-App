import { create } from 'zustand';

interface SystemHealth {
  overall: number;
  hvac: number;
  power: number;
  water: number;
  elevators: number;
}

interface TowerState {
  health: SystemHealth;
  activeAlarms: number;
  powerConsumptionKw: number;
  waterConsumptionM3: number;
  updateData: (data: Partial<TowerState>) => void;
}

export const useTowerStore = create<TowerState>((set) => ({
  health: {
    overall: 94,
    hvac: 92,
    power: 98,
    water: 95,
    elevators: 88,
  },
  activeAlarms: 3,
  powerConsumptionKw: 4250,
  waterConsumptionM3: 124,
  updateData: (data) => set((state) => ({ ...state, ...data })),
}));
