import { useEffect, useState, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export default function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  // lógica do contador
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1*60);
  }

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished
        ? (
          <button
          disabled
          className={styles.btnCountdown}
          >
            Ciclo encerrado
            <img src="icons/check-circle.svg" alt="check" />
          </button>
        )
        : (<>
          { isActive
            ? (
            <button
              type='button'
              className={`${styles.btnCountdown} ${styles.btnCountdownActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>)
            : (
            <button
              type='button'
              className={styles.btnCountdown}
              onClick={startCountdown}
            >
              Iniciar ciclo
            </button>)
          }
          </>)
      }
    </div>
  );
}