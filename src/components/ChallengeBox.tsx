import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox() {
  const { activeChallenge, resetChallenges, completedChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);


  function handleChallengeSucceeded() {
    completedChallenge();
    resetCountdown();
  }

  function handleChalledFailed() {
    resetChallenges();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge
        ? (
          <div className={styles.challengeActive}>
            <header>Ganhe {activeChallenge.amount}XP</header>

            <main>
              <img src={`icons/${activeChallenge.type}.svg`}/>
              <strong>Exercite-se</strong>
              <p>{activeChallenge.description}</p>
            </main>

            <footer>
              <button
                type="button"
                className={styles.challengeFailedButton}
                onClick={handleChalledFailed}
              >
                Falhou...
              </button>
              <button
                type="button"
                className={styles.challengeSucceededButton}
                onClick={handleChallengeSucceeded}
              >
                Completou!
              </button>
            </footer>
          </div>
        )
        : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber desafios</strong>

            <p>
              <img src="icons/level-up.svg" alt="level-up" />
              Complete os Desafios e ganhe XP.
            </p>
          </div>
        )
      }
    </div>
  );
}