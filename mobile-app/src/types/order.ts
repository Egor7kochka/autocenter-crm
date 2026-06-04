export interface Order {
  id: number;
  client_id: number;

  title: string;
  description: string;

  price: number;

  status: string;

  full_name: string;

  created_at: string;
}