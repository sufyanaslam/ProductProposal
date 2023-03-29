import * as React from "react";
import { ProductType } from "../types/product";
import Button from "./button";
import styles from "./product-proposal-form.module.css";

type IFormProps = {
  "on-submit": (payload: ProductType) => void;
}

const ProductProposalForm: React.FC<IFormProps> = (props) => {
  let formRef = React.useRef<HTMLFormElement>(null);
  let titleRef = React.useRef<HTMLInputElement>(null);
  let priceRef = React.useRef<HTMLInputElement>(null);
  let descriptionRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!titleRef.current?.value) {
      alert("Your product needs a title");

      return;
    }

    if (!descriptionRef.current?.value || !priceRef.current?.value) {
      alert("Your product needs some content");

      return;
    }

    if (typeof priceRef.current?.value !== 'number') {
      alert("Your product price needs to be a number");
      
      return;
    }
  
    props["on-submit"]({
      title: titleRef.current && titleRef.current.value,
      description: descriptionRef.current && descriptionRef.current.value,
      price: priceRef.current && priceRef.current.value,
    });

    formRef.current?.reset();
  };

  return (
    <form className={styles.form} onSubmit={(event) => handleSubmit(event)} ref={formRef}>
      <span className={styles.label}>Product title: *</span>

      <input
        ref={titleRef}
        placeholder="Title..."
        defaultValue=""
        className={styles.input}
      />

      <span className={styles.label}>Product details: *</span>

      <input
        ref={priceRef}
        placeholder="Price..."
        defaultValue=""
        type="number"
        className={styles.input}
      />

      <textarea
        ref={descriptionRef}
        placeholder="Start typing product description here..."
        defaultValue=""
        className={styles.textarea}
      />

      <Button>Add a product</Button>
    </form>
  );
};

export default ProductProposalForm