import { create } from 'zustand';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
}

interface AlertsState {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  dismissAlert: (id: string) => void;
}

export const useAlertsStore = create<AlertsState>((set) => ({
  alerts: [
    {
      id: '1',
      title: 'Elevator C2 Anomaly',
      description: 'Vibration signature indicates potential bearing wear.',
      severity: 'warning',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'HVAC Zone 4 Efficiency Drop',
      description: 'Cooling efficiency dropped by 15% in the last 2 hours.',
      severity: 'info',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    }
  ],
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
  dismissAlert: (id) => set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) })),
}));
