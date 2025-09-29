// types.ts

export interface Chemical {
  name: string;
  description: string;
  epp: string;
  firstAid: string;
}

export interface ChemicalGroup {
  title: string;
  chemicals: Chemical[];
}

export enum HierarchicalRole {
  Director = 'Director',
  Intendente = 'Intendente',
  Mayordomo = 'Mayordomo',
  PersonalDeServicio = 'Personal de Servicio',
  Autoridades = 'Autoridades',
}

export interface User {
  id: number;
  name: string;
  role: HierarchicalRole;
  dni: string;
  email: string;
  password?: string;
  avatarUrl?: string;
}

export enum RiskLevel {
  Verde = 'Verde',
  Amarillo = 'Amarillo',
  Rojo = 'Rojo',
}

export interface ReportData {
  id?: string;
  riskLevel: RiskLevel;
  anomalyDescription: string;
  ppeRecommendation: string;
  infrastructureSuggestion: string;
  legalReference: string;
  location: string;
  date: string;
  imageUrl: string;
  user: User;
}

// Add login and register to the View type
export type View = 'scan' | 'history' | 'chemicals' | 'users' | 'guide' | 'login' | 'register';