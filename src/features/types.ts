// User authentication data interface (subset of user info for auth purposes)
export interface UserAuth {
  id: string;
  fullname: string;
  email: string;
  password: string;
  isCompany: boolean; // Added isCompany field
}

// Top-level interface for user data
export interface UserData {
  authData: UserAuth[];
  data: data[];
  id: string;
  fullname: string;
  email: string;
  years_of_employment: number;
  employment_status: "employed" | "unemployed" | "self-employed" | string;
  age: number;
  gender: "Male" | "Female" | "Other" | string;
  intro: string;
  avatar: string;
  work_experience: WorkExperience[];
  education: Education[];
  skills: string[];
  sdt_profile: SdtProfile; // Renamed here
  cv: string;
  applications: Applications;
}

export interface data {
  id: string;
  name: string;
  fullname: string;
  email: string;
  years_of_employment: number;
  employment_status: "employed" | "unemployed" | "self-employed" | string;
  age: number;
  gender: "Male" | "Female" | "Other" | string;
  intro: string;
  avatar: string;
  work_experience: WorkExperience[];
  education: Education[];
  skills: string[];
  sdt_profile: SdtProfile; // Renamed here
  cv: string;
  applications: Applications;
  culture_metric: CultureMetric;
  jobs: Job[];
  logo: string;
  description: string;
  hasMatched: HasMatched[];
}

// Interface for work experience entries
export interface WorkExperience {
  company: string;
  position: string;
  start_date: string; // Dates as strings for simplicity; use Date if handling date parsing
  end_date: string;
  description: string;
}

// Interface for education entries
export interface Education {
  institution: string;
  degree: string;
  start_date: string;
  end_date: string;
  score: number;
}

// Updated interface for SDT Profile
export interface SdtProfile {
  [key: string]: string;
}

// Interface for applications, allowing flexibility for dynamic keys and values
export interface Applications {
  [key: string]: string; // Example: {"1": "yes"} or {"Alphasense": "yes"}
}

// HasMatched interface for matched companies
export interface HasMatched {
  iscompany: boolean;
  logo: string;
  name: string;
  email: string;
  password: string;
  culture_metric: CultureMetric;
  jobs: Job[];
  description: string;
  location: string;
}

// Company data interface
export interface CompanyData {
  authData: UserAuth[];
  data: data[];
  name: string;
  email: string;
  password: string;
  culture_metric: CultureMetric;
  jobs: Job[];
  logo: string;
  description: string;
}

// Additional interfaces for nested structures in CompanyData
export interface CultureMetric {
  [key: string]: string | number; // Adjust as needed; assumes flexible metric data types
}

export interface Job {
  title: string;
  description: string;
  location: string;
}
