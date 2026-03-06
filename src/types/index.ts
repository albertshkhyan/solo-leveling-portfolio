export type SkillCategory = 'primary' | 'secondary' | 'additional';

export interface SubSkill {
  name: string;
  proficiency: number;
}

export interface Skill {
  name: string;
  level: number;
  experience: string;
  description: string;
  category: SkillCategory;
  rarity: number;
  iconUrl?: string;
  tier?: 'ultimate' | 'advanced' | 'basic';
  fullName?: string;
  docsUrl?: string;
  websiteUrl?: string;
}

export interface EngineeringMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface ShadowSoldier {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  accentColor: string;
  expertise: { label: string; value: number }[];
  metrics: EngineeringMetric[];
  skills: Skill[];
  achievements: Achievement[];
  tooling: { category: string; tools: string[] }[];
  cta: { github?: string; demo?: string; portfolio?: string };
}

export interface CareerRole {
  id: string;
  title: string;
  company?: string;
  period: string;
  techStack: string[];
  shortDescription: string;
  responsibilities: string[];
  impact: string[];
  status: 'current' | 'past' | 'future';
  iconUrl?: string;
}

export interface Project {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  fallbackImage?: string;
  stack: string[];
  tier: string;
  tierColor: string;
  glowColor: string;
  borderColor: string;
  role: string;
  businessMetrics: { userGrowth: string; revenueImpact: string; retention: string };
  engineeringMetrics: {
    performance: string;
    scalability: string;
    uptime: string;
    codeQuality: string;
  };
  architecture: string;
  technicalHighlights: string[];
  github?: string;
  demo?: string;
}
