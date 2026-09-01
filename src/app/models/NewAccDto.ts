export interface NewAccDTO {
  Name: string;
  Email: string;
  Phone: string;
  dateOfBirth: Date;
  password: string;
  role: string;
}

export interface newAccResponse 
{
  token: string;
}