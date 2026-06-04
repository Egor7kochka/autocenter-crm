export interface Client {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
  car_brand?: string;
  car_model?: string;
  created_at?: string;
}

export interface CreateClientDto {
  full_name: string;
  phone: string;
  email?: string;
  car_brand?: string;
  car_model?: string;
}