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
    <div className={styles.container}>
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
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
