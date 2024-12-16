import React, { PropsWithChildren, HTMLAttributes } from "react";
import classNames from "classnames";
import styles from "@/styles/components/box.module.css";

type BoxProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    customStyle?: object;
    variant?: string;
  }
>;

const Box: React.FC<BoxProps> = ({
  children,
  customStyle = {},
  variant = "central",
  ...props
}) => {
  return (
    <section
      className={classNames(styles.root, {
        [styles.fullView]: variant === "fill",
        ...customStyle,
      })}
      {...props}
    >
      {children}
    </section>
  );
};

export default Box;
