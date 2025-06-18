export interface ILogin {
  email: string;
  password: string;
}
export interface ISignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
export interface ISendMail {
  mailTo: string;
  link: string;
}
export interface IUpdate {
  fullname?: string;
  age?: number;
  email?: string;
  role?: string;
}
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  age?: number;
  height?: number;
  weight?: number;
  weightTarget?: number;
  activityLevel?: string;
  allergies?: string[];
  goal: "gain" | "loss" | "maintenance";
  is_prenium: boolean;
}
