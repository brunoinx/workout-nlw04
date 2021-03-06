import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/components/Sidebar.module.css';

export default function Sidebar() {
  const [activeButtonHome, setAcvtiveButtonHome] = useState(false);
  const [activeButtonRanking, setAcvtiveButtonRanking] = useState(false);

  function handleButtonActiveHome() {
    setAcvtiveButtonHome(true);
    setAcvtiveButtonRanking(false);
  }
  
  function handleButtonActiveRanking() {
    setAcvtiveButtonRanking(true);
    setAcvtiveButtonHome(false);
  }

  return (
    <aside className={styles.aside}>
      <img src="logo.svg" alt="Logo da Workout"/>

      <div className={styles.buttonsContainer}>
        {!activeButtonHome
          ? (
            <Link href='/home'>
              <button
                type="button"
                onClick={handleButtonActiveHome}
              >
                <img src="/icons/home.svg" alt="Home" />
              </button>
            </Link>
          )
          : (
            <Link href='/home'>
              <button
                type="button"
                style={{ borderLeft: '4px solid var(--blue-dark)'}}
                onClick={handleButtonActiveHome}
              >
                <img src="/icons/home-active.svg" alt="Home" />
              </button>
            </Link>
          )
        }

        {!activeButtonRanking
          ? (
            <Link href='/ranking'>
              <button
                type="button"
                onClick={handleButtonActiveRanking}
              >
                <img src="/icons/award.svg" alt="Ranking" />
              </button>
            </Link>
          )
          : (
            <Link href='/ranking'>
              <button
                type="button"
                style={{ borderLeft: '4px solid var(--blue-dark)' }}
                onClick={handleButtonActiveRanking}
              >
                <img src="/icons/award-active.svg" alt="Ranking" />
              </button>
            </Link>
          )
        }
      </div>

      <div />
    </aside>
  );
}