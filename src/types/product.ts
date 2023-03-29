type RatingType = {
  count: number
  rate: number
}

export type ProductType = {
  id?: number
  title: string
  isFavorite?: boolean
  category?: string
  description: string
  image?: string
  price: number
  rating?: RatingType
}

