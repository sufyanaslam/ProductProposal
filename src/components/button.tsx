import * as React from "react";
import styles from "./button.module.css";

interface IButtonProps {
  children: any;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({ children, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);

export default Button
