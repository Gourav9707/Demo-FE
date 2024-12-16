import React, {
  PropsWithChildren,
  HTMLAttributes,
  useEffect,
} from "react";
import classNames from "classnames";
import Footer from "@/components/Footer";
import styles from "@/styles/components/appshell.module.css";
import Navbar from "@/components/Navbar";

type AppShellProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

const AppShell: React.FC<AppShellProps> = ({ children, ...props }) => {
  useEffect(() => {
    const setViewportHeight = () => {
      const viewportHeight = window.innerHeight-1;
      
      document.documentElement.style.setProperty(
        "--vh",
        `${viewportHeight * 0.01}px`
      );
    };

    // Initial setting of the --vh custom property
    setViewportHeight();

    // Recalculate the --vh value on window resize
    window.addEventListener("resize", setViewportHeight);

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <main className={classNames(styles.mainContainer, {})} {...props}>
      <Navbar />
      <section className={classNames(styles.children)}>{children}</section>
      <Footer />
    </main>
  );
};

export default AppShell;
