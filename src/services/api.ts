import { ProductType } from "../types/product"

// We can also read API_BASE_URL from env according to application mode.
const API_BASE_URL = 'https://fakestoreapi.com';

const fetchProducts = () => {
  return fetch(`${API_BASE_URL}/products`).then((response) =>
    response.json()
  )
}

const updateProduct = (payload: ProductType)  => {
  return fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    body: JSON.stringify({
      title: payload.title,
      price: payload.price,
      description: payload.description
    })
  }).then((res) => res.json())
}

export {fetchProducts, updateProduct}
