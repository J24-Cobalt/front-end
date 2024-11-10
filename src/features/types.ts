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
  sdt_profileComp: SdtProfileComp;
  jobs: Job[];
  logo: string;
  description: string;
  hasMatchedCompanies?: HasMatchedCompanies[];
  hasMatchedApplicants?: HasMatchedApplicants[];
  hasMatchesWApplicants?: HasMatchesWApplicants[];
  hasMatchesWCompanies?: HasMatchesWCompanies[];
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
export interface HasMatchedCompanies {
  iscompany: boolean;
  logo: string;
  name: string;
  email: string;
  password: string;
  culture_metric: SdtProfileComp;
  jobs: Job[];
  description: string;
  location: string;
}

// HasMatched interface for matched companies
export interface HasMatched {
  iscompany: boolean;
  logo: string;
  name: string;
  email: string;
  password: string;
  sdt_profile: SdtProfile;
  jobs: Job[];
  description: string;
  location: string;
}

// HasMatched interface for matching companies
export interface HasMatchesWCompanies {
  iscompany: boolean;
  logo: string;
  name: string;
  email: string;
  password: string;
  sdt_profile: SdtProfile;
  culture_metric: SdtProfile;
  jobs: Job[];
  description: string;
  location: string;
}

// HasMatched interface for matched users
export interface HasMatchedApplicants {
  iscompany: boolean;
  logo: string;
  name: string;
  email: string;
  password: string;
  culture_metric: SdtProfile;
  jobs: Job[];
  description: string;
  location: string;
}

// HasMatched interface for matching users
export interface HasMatchesWApplicants {
  iscompany: boolean;
  logo: string;
  name: string;
  email: string;
  password: string;
  culture_metric: SdtProfile;
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
  sdt_profile: SdtProfile;
  jobs: Job[];
  logo: string;
  description: string;
}

// Additional interfaces for nested structures in CompanyData
export interface SdtProfileComp {
  [key: string]: string | number; // Adjust as needed; assumes flexible metric data types
}

export interface Job {
  title: string;
  description: string;
  location: string;
}
