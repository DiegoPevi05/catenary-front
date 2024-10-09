export interface User {
  token: string;
  id:number;
  username: string;
  password?:string;
  email: string;
}

export interface SignIn {
  email:string;
  password:string;
}

export interface SignUp {
  email:string;
  password:string;
  confirmPassword?:string;
  firstName:string;
  lastName:string;
  phoneNumber:string;
}
