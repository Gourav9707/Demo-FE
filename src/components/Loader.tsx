import styles from "@/styles/components/loader.module.css";

const Loader = () => {
  return (
    <div className={styles["loader-container"]}>
      <svg className={styles.loader}></svg>
    </div>
  );
};

export default Loader;
