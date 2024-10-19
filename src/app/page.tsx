import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 style={{ fontSize: 100 }}>dtunes.xyz</h1>
      </main>
    </div>
  );
}
