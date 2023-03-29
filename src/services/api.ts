const fetchProducts = () => {
  return fetch("https://fakestoreapi.com/products").then((response) =>
    response.json()
  )
}

const updateProduct = (payload: any) => {
  return fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify({
      title: payload.title,
      price: payload.price,
      description: payload.description
    })
  }).then((res) => res.json())
}

export {fetchProducts, updateProduct}
