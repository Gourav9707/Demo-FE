import React, { PropsWithChildren, HTMLAttributes } from "react";
import classNames from "classnames";
import Loader from "@/components/Loader";
import styles from "@/styles/components/contentShell.module.css";

interface ContentShellProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  loading?: boolean;
}

const ContentShell: React.FC<ContentShellProps> = ({
  children,
  loading = false,
  ...props
}) => {
  return (
    <main id="contentShell" className={classNames(styles.root, {})} {...props}>
      {loading ? <Loader /> : <>{children}</>}
    </main>
  );
};

export default ContentShell;
