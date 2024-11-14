// src/components/Header.js (o Header.tsx si estás usando TypeScript)
import styles from '../styles/components/Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>¿Eres un mutante?</h1>
      <h2 className={styles.subtitle}>¡Sabias que más del 50% de la población porta mutaciones genéticas!</h2>
    </header>
  );
}
