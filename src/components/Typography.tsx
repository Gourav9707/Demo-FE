import { HTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "@/styles/components/typography.module.css";

type Props = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    color?: string;
    fontFamily?: string;
    weight?: string;
    size?: string;
    transform?: boolean;
    hide?: boolean;
    addSpaceToRight?: boolean;
    noWrap?: boolean;
  }
>;

const Typography = ({
  size = "base",
  color = "black",
  weight = "font400",
  hide = false,
  transform = false,
  fontFamily = "popins",
  addSpaceToRight = false,
  noWrap = false,
  children,
  ...props
}: Props) => {
  return (
    <p
      className={classNames(styles.root, {
        [styles.avenirFont]: fontFamily === "popins", // for regular font weight 400

        [styles.font400]: weight === "font400",
        [styles.font500]: weight === "font500",
        [styles.font600]: weight === "font600",
        [styles.font700]: weight === "font700",
        [styles.font800]: weight === "font800",
        [styles.font900]: weight === "font900",

        [styles.lg]: size === "lg",
        [styles.sm]: size === "sm",
        [styles.xs]: size === "xs",
        
        [styles.hide]: hide,
        [styles.white]: color === "white",

        [styles.transform]: transform,
        [styles.addSpaceToRight]: addSpaceToRight,
        [styles.noWrap]: noWrap,
      })}
      {...props}
    >
      {children}
    </p>
  );
};

export default Typography;
