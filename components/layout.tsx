import styles from "./layout.module.css";
import Link from "next/link";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className={home ? styles.container : styles.postContainer}>
      <header className={styles.header}>
        <h3 className={styles.headerTitle}>
          <a href="/" title="Home" className={styles.headerTitleA}>
            Johan Jern
          </a>{" "}
          <small className={styles.headerTitleSmall}>Software Engineer</small>
        </h3>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
