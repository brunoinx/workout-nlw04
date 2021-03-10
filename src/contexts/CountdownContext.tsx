import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  isPause: boolean;
  startCountdown: () => void;
  playCountdown: () => void;
  pauseCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountDownProvider({ children }: CountdownProviderProps) {
  let countdownTimeout: NodeJS.Timeout;

  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isPause, setIsPause] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  // lógica do contador
  useEffect(() => {
    if (isActive && time > 0 && !isPause) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time, isPause]);

  function startCountdown() {
    setIsActive(true);
  }

  const playCountdown = () => {
    setIsActive(true);
    setIsPause(false);
  }

  const pauseCountdown = () => {
    setIsPause(true);
    clearTimeout(countdownTimeout);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(25 * 60);
    setIsPause(false);
  }

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        isPause,
        startCountdown,
        playCountdown,
        pauseCountdown,
        resetCountdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}