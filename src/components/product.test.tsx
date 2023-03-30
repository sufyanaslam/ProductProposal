import React from "react";
import Product from "./product";
import { render, screen } from "@testing-library/react";

const mockProduct = {
  title: "Mens Casual Premium Slim Fit T-Shirts",
  category: "men's clothing",
  description:
    "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  id: 7,
  price: 22.3,
  image:
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  rating: { rate: 4.1, count: 259 },
};

const mockFunc = jest.fn();

describe("Product Card Component", () => {
  const renderProduct = () =>
    render(
      <Product index={1} key={1} product={mockProduct} onFav={mockFunc} />
    );

  test("product card should be rendered", () => {
    renderProduct();
    const productContainer = screen.getByTestId("product");
    expect(productContainer).toBeInTheDocument();
  });

  test("title element should be rendered and have value", () => {
    renderProduct();
    const titleEl = screen.getByTestId("title");
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).not.toBeNull();
    expect(titleEl).toHaveTextContent(mockProduct.title);
  });

  test("rating element should be rendered and have value", () => {
    renderProduct();
    const ratingEl = screen.getByTestId("rating");
    expect(ratingEl).toBeInTheDocument();
    expect(ratingEl).not.toBeNull();
    expect(ratingEl).toHaveTextContent(mockProduct.rating.rate.toString());
  });

  test("price element should be rendered and have value", () => {
    renderProduct();
    const priceEl = screen.getByTestId("price");
    expect(priceEl).toBeInTheDocument();
    expect(priceEl).not.toBeNull();
    expect(priceEl).toHaveTextContent(mockProduct.price.toString());
  });

  test("description element should be rendered and have value", () => {
    renderProduct();
    const descriptonEL = screen.getByTestId("descripton");
    expect(descriptonEL).toBeInTheDocument();
    expect(descriptonEL).not.toBeNull();
    expect(descriptonEL).toHaveTextContent(mockProduct.description);
  });

  test("button element should be rendered and have value", () => {
    renderProduct();
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).not.toBeNull();
    expect(buttonEl).toHaveTextContent(/Add to favorites/i);
  });
});
