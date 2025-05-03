// types.ts
export interface Product {
    id: number
    title: string
    description: string
    price: number
    oldPrice?: number
    onSale?: boolean
    image: string
    category: string
    rating?: { rate: number; count: number }
    promoBadge?: {
      label: string
      color: string
      iconName: 'star' | 'fire' | 'thumb' | 'badge'
    }
  }
  