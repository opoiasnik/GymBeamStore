export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    oldPrice?: number;
    onSale?: boolean;
    promoBadge?: {
      label: string;
      color: string;
      iconName: 'star' | 'fire' | 'thumb' | 'badge';
    };
    image: string;
    rating?: { rate: number; count: number };
    category: string;
  }