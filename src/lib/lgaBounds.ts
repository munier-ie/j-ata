// Jigawa State LGA coordinates and boundaries
// Each LGA has approximate center coordinates and bounding box for map zoom

export interface LGABounds {
  name: string;
  center: [number, number]; // [latitude, longitude]
  bounds: [[number, number], [number, number]]; // [[south, west], [north, east]]
}

export const jigawaLGABounds: Record<string, LGABounds> = {
  'Auyo': {
    name: 'Auyo',
    center: [12.8333, 9.9167],
    bounds: [[12.65, 9.75], [13.00, 10.08]]
  },
  'Babura': {
    name: 'Babura',
    center: [12.7833, 9.0167],
    bounds: [[12.60, 8.85], [12.95, 9.18]]
  },
  'Birniwa': {
    name: 'Birniwa',
    center: [12.7833, 10.2167],
    bounds: [[12.60, 10.05], [12.95, 10.38]]
  },
  'Birnin Kudu': {
    name: 'Birnin Kudu',
    center: [11.4500, 9.4833],
    bounds: [[11.25, 9.30], [11.65, 9.67]]
  },
  'Buji': {
    name: 'Buji',
    center: [12.4167, 9.8000],
    bounds: [[12.22, 9.62], [12.61, 9.98]]
  },
  'Dutse': {
    name: 'Dutse',
    center: [11.7833, 9.3333],
    bounds: [[11.65, 9.20], [11.92, 9.47]]
  },
  'Gagarawa': {
    name: 'Gagarawa',
    center: [12.3667, 9.5667],
    bounds: [[12.18, 9.38], [12.55, 9.75]]
  },
  'Garki': {
    name: 'Garki',
    center: [11.6167, 9.6000],
    bounds: [[11.45, 9.43], [11.78, 9.77]]
  },
  'Gumel': {
    name: 'Gumel',
    center: [12.6333, 9.3833],
    bounds: [[12.45, 9.20], [12.82, 9.57]]
  },
  'Guri': {
    name: 'Guri',
    center: [11.9167, 9.6833],
    bounds: [[11.73, 9.50], [12.10, 9.87]]
  },
  'Gwaram': {
    name: 'Gwaram',
    center: [11.2667, 9.9000],
    bounds: [[11.08, 9.72], [11.45, 10.08]]
  },
  'Gwiwa': {
    name: 'Gwiwa',
    center: [12.2833, 10.3333],
    bounds: [[12.10, 10.15], [12.47, 10.52]]
  },
  'Hadejia': {
    name: 'Hadejia',
    center: [12.4500, 10.0500],
    bounds: [[12.28, 9.87], [12.62, 10.23]]
  },
  'Jahun': {
    name: 'Jahun',
    center: [12.0333, 9.6500],
    bounds: [[11.85, 9.47], [12.22, 9.83]]
  },
  'Kafin Hausa': {
    name: 'Kafin Hausa',
    center: [12.2167, 9.9500],
    bounds: [[12.03, 9.77], [12.40, 10.13]]
  },
  'Kaugama': {
    name: 'Kaugama',
    center: [12.2500, 9.7167],
    bounds: [[12.07, 9.53], [12.43, 9.90]]
  },
  'Kazaure': {
    name: 'Kazaure',
    center: [12.6500, 8.4167],
    bounds: [[12.47, 8.23], [12.83, 8.60]]
  },
  'Kiri Kasama': {
    name: 'Kiri Kasama',
    center: [12.9000, 9.3333],
    bounds: [[12.72, 9.15], [13.08, 9.52]]
  },
  'Kiyawa': {
    name: 'Kiyawa',
    center: [11.8000, 9.6167],
    bounds: [[11.62, 9.43], [11.98, 9.80]]
  },
  'Maigatari': {
    name: 'Maigatari',
    center: [12.8000, 9.4333],
    bounds: [[12.62, 9.25], [12.98, 9.62]]
  },
  'Malam Madori': {
    name: 'Malam Madori',
    center: [12.5500, 10.0333],
    bounds: [[12.37, 9.85], [12.73, 10.22]]
  },
  'Miga': {
    name: 'Miga',
    center: [12.1500, 9.8167],
    bounds: [[11.97, 9.63], [12.33, 10.00]]
  },
  'Ringim': {
    name: 'Ringim',
    center: [12.1500, 9.1667],
    bounds: [[11.97, 8.98], [12.33, 9.35]]
  },
  'Roni': {
    name: 'Roni',
    center: [12.8167, 8.5500],
    bounds: [[12.63, 8.37], [13.00, 8.73]]
  },
  'Sule Tankarkar': {
    name: 'Sule Tankarkar',
    center: [11.8500, 9.4500],
    bounds: [[11.67, 9.27], [12.03, 9.63]]
  },
  'Taura': {
    name: 'Taura',
    center: [12.0333, 9.2833],
    bounds: [[11.85, 9.10], [12.22, 9.47]]
  },
  'Yankwashi': {
    name: 'Yankwashi',
    center: [12.0833, 10.1333],
    bounds: [[11.90, 9.95], [12.27, 10.32]]
  }
};

// Default Jigawa State bounds (for when no LGA is selected)
export const jigawaStateBounds: LGABounds = {
  name: 'Jigawa State',
  center: [12.2, 9.5],
  bounds: [[11.0, 8.4], [13.1, 10.6]]
};

// Helper function to get bounds for a specific LGA
export function getLGABounds(lgaName: string): LGABounds {
  return jigawaLGABounds[lgaName] || jigawaStateBounds;
}
