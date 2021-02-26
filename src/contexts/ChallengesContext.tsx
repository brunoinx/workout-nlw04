import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  xpToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenges: () => void;
  completedChallenge: () => void;
}

interface ChallengesProviderProps {
 children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }:ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState<any>(null);

  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission(); 
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Você tem um novo desafio! 🏋‍♂️️😍️', {
        body: `Valendo ${challenge.amount}xp.`
      });
    }
  }

  function resetChallenges() {
    setActiveChallenge(null);
  }

  function completedChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let totalExperience = currentExperience + amount;

    if (totalExperience >= xpToNextLevel) {
      totalExperience = totalExperience - xpToNextLevel;
      levelUp();
    }

    setCurrentExperience(totalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{ 
        level,
        levelUp,
        currentExperience,
        xpToNextLevel,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenges,
        completedChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}