import * as React from "react";
import lodash from 'lodash'
import Product from "./product";
interface IPostsProps {
  products: any;
  onFav: (title: string) => void;
}

export default class ProductList extends React.Component<IPostsProps, {}> {
  render(){
    let productsarr = []
      for (const [i, p] of this.props.products.entries()) {
        productsarr.push(
          <Product key={i} index={i} product={p} onFav={this.props.onFav} />
        );
    }
    return <div>{lodash.reverse(productsarr)}</div>
  }
}

