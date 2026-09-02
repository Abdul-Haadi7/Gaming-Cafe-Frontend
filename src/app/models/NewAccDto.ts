export interface NewAccDTO {
  Name: string;
  Email: string;
  Phone: string;
  password: string;
  role: string;
}

export interface newAccResponse 
{
  token: string;
}