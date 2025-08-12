export interface ProductFormData {
  sku: string;
  name: string;
  description: string;
  price: number;
  material: string;
  weight: string;
  categoryId: string;
  images: string[];
  stockQuantity: number;
}

export interface PlatformFormData {
  platform: string;
  url?: string;
  isActive: boolean;
}

export interface CategoryFormData {
  name: string;
  code: string;
  gender: string;
  description?: string;
}
