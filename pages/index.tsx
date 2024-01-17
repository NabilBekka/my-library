import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useAppSelector } from '@/lib/redux/hooks';

export default function Home() {
  const mode = useAppSelector(state => state.mode.darkMode);
  const { name } = useAppSelector(state => state.user);
  return (
    <>
      <Head>
        <title>MY LIBRARY</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <h1>Bonjour {name}</h1>
      </main>
    </>
  )
}
