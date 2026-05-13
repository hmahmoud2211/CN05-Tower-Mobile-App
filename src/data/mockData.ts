export const mockData = {
  tower: {
    name: 'CN-05 Tower',
    status: 'ONLINE',
    lastUpdate: new Date().toISOString(),
  },
  health: {
    overall: 94,
    hvac: 92,
    power: 98,
    water: 95,
    elevators: 88,
  },
  energy: {
    currentLoadKw: 4250,
    peakLoadKw: 6500,
    dailyConsumptionKwh: 34500,
    budgetUtilizationPct: 82,
    solarGenerationKw: 450,
  },
  hvac: {
    avgTemperature: 22.4,
    avgHumidity: 45,
    activeZones: 112,
    totalZones: 120,
    airQualityIndex: 95, // out of 100
  },
  elevators: [
    { id: 'E1', floor: 12, direction: 'up', status: 'active', loadPct: 65 },
    { id: 'E2', floor: 45, direction: 'down', status: 'active', loadPct: 30 },
    { id: 'E3', floor: 1, direction: 'idle', status: 'active', loadPct: 0 },
    { id: 'E4', floor: 22, direction: 'up', status: 'active', loadPct: 85 },
    { id: 'E5', floor: 8, direction: 'idle', status: 'maintenance', loadPct: 0 },
    { id: 'E6', floor: 55, direction: 'down', status: 'active', loadPct: 40 },
  ],
  security: {
    activeCameras: 245,
    offlineCameras: 3,
    accessEventsToday: 4521,
    activeAlerts: 2,
  },
  aiInsights: [
    {
      id: 'insight1',
      title: 'Energy Optimization Opportunity',
      description: 'Reducing HVAC load in zones 40-45 can save 12% energy without impacting comfort.',
      type: 'optimization',
    },
    {
      id: 'insight2',
      title: 'Predictive Maintenance',
      description: 'Elevator E5 showing abnormal vibration patterns. Maintenance recommended within 48h.',
      type: 'warning',
    }
  ]
};

export const getFloorData = (floorNumber: number) => {
  // Generate deterministic but pseudo-random data based on the floor number
  const seed = floorNumber * 13;
  const isResidential = floorNumber > 40;
  const isCommercial = floorNumber > 10 && floorNumber <= 40;
  
  let type = 'Mixed Use';
  if (isResidential) type = 'Residential';
  else if (isCommercial) type = 'Commercial';
  else type = 'Retail / Lobby';

  const baseTemp = 21.0;
  const tempVariance = (seed % 30) / 10; // 0 to 3.0
  const occupancy = 30 + (seed % 65); // 30% to 95%
  const airQuality = 85 + (seed % 15); // 85 to 99

  return {
    floor: floorNumber,
    type,
    status: occupancy > 85 ? 'HIGH TRAFFIC' : 'NORMAL',
    occupancy,
    temperature: (baseTemp + tempVariance).toFixed(1),
    airQuality,
    activeSystems: {
      hvac: true,
      lighting: true,
      security: true
    },
    nodes: [
      { id: 'n1', type: 'hvac', x: 20 + (seed % 20), y: 30 + (seed % 10), status: 'normal' },
      { id: 'n2', type: 'security', x: 70 - (seed % 15), y: 40 + (seed % 20), status: occupancy > 80 ? 'warning' : 'normal' },
      { id: 'n3', type: 'power', x: 40 + (seed % 30), y: 70 - (seed % 10), status: 'normal' }
    ]
  };
};
