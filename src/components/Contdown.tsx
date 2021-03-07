import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';


export default function Countdown() {
  const {
    minutes,
    seconds, 
    hasFinished,
    isActive,
    isPause,
    resetCountdown,
    playCountdown,
    pauseCountdown,
    startCountdown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={`${styles.countdownContainer} ${isPause && styles.pauseCountdown}`}>
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
              <div className={styles.groupButton}>
                {!isPause 
                  ? (
                    <button
                      type='button'
                      className={styles.btnCountdownActive}
                      onClick={pauseCountdown}
                    >
                      Pause
                      <img src="/icons/pause.svg" alt="Pausar Ciclo" />
                    </button>)
                  : (
                    <button
                      type='button'
                      className={styles.btnCountdownActive}
                      onClick={playCountdown}
                    >
                      Play
                      <img src="/icons/play.svg" alt="Pausar Ciclo" />
                    </button>
                  )
                }

                <button
                  type='button'
                  className={styles.btnCountdownActive}
                  onClick={resetCountdown}
                >
                  Stop
                  <img src="/icons/stop.svg" alt="Resetar Ciclo" />
                </button>
              </div>
            )
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