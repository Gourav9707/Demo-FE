import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

import styles from "@/styles/components/button.module.css";

type Props = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: string;
  }
>;

const Button = ({
  color = "greenBtn",
  children,
  ...props
}: Props) => {
  return (
    <button
      className={classNames(styles.root, {
        [styles.blueBtn]: color === "blueBtn",
        [styles.redBtn]: color === "redBtn"
      })}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
