export type SeverityLevel = 'critical' | 'warning' | 'normal';

export interface SensorReading {
  id: string;
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: SeverityLevel;
  icon: string;
}

export interface AlertLog {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  timestamp: string;
  sector: string;
  resolved: boolean;
}

export interface NasaApod {
  date: string;
  title: string;
  url: string;
  hdurl?: string;
  explanation: string;
  media_type: 'image' | 'video';
  copyright?: string;
}

export interface FavoriteItem {
  id: string;
  type: 'apod';
  data: NasaApod;
  savedAt: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ColorPalette;
}

export interface ColorPalette {
  background: string;
  surface: string;
  surfaceAlt: string;
  primary: string;
  accent: string;
  text: string;
  textSecondary: string;
  border: string;
  critical: string;
  warning: string;
  normal: string;
}

// Navigation types
export type HomeStackParamList = {
  HomeMain: undefined;
  ApodDetail: { apod: NasaApod };
};

export type RootTabParamList = {
  HomeStack: undefined;
  Alerts: undefined;
  Favorites: undefined;
  Settings: undefined;
};
