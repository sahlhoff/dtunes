import styles from "./page.module.css";
import { DtunesHomepage } from "@/components/dtunes-homepage";

export default function Home() {
  return (
    <DtunesHomepage />
    // <div className={styles.page}>
    //   <main className={styles.main}>
    //     <h1 style={{ fontSize: 100 }}>dtunes.xyz</h1>
    //   </main>
    // </div>
  );
}
