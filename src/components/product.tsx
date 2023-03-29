import * as React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./product.module.css"
import { ProductType } from "../types/product";

interface ProductProps {
 index: number
 product: ProductType
 onFav: any
}

export default class Product extends React.Component<ProductProps> {
  
  constructor(props: any) { super(props) }

  // Problem: Now product title can be too long, I just put overflowX as fix now
  render(){
    const {product: productClass, productBody, actionBarItem, actionBarItemLabel} = styles
    
    return (
      <span className={productClass} style={{display: 'inline-block', overflowX: 'scroll', float: 'none', clear: 'both'}}>
        <span className={styles['product-title']} style={{overflowX: 'hidden'}}>{this.props.product.title}</span>

        <p><strong>Rating: {this.props.product.rating ? `${this.props.product.rating.rate}/5` : ''}</strong></p>

        <p><b>Price: ${+this.props.product.price}</b></p>

        <p className={productBody}>
          <span><b>Description:</b></span>
          <br/>
          {this.props.product.description}
      </p>

        <span className={styles['action_bar']} style={{display: 'table', width: "100%"}}>
          <span
            className={`${actionBarItem} ${
              this.props.product.isFavorite ? "active" : ""
            }`}
            role="button"
            onClick={() => {
                this.props.onFav(this.props.product.title);
            }}
          >
            <FaStar /> <span className={actionBarItemLabel}>{!!(!!(this.props.product.isFavorite)) ? 'Remove from favorites' : 'Add to favorites'}</span>
          </span>
        </span>
      </span>
    );
  }
};