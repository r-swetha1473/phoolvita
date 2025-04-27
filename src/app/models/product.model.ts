export interface SizeOption {
  value: string;
  label: string;
  isDefault?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  thumbnails: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  sizeOptions: SizeOption[];
}