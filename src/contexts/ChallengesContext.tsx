import Cookies from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';

import LevelUpModal from '../components/LevelUpModal';
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
  closeLevelUpModal: () => void;
  startNewChallenge: () => void;
  resetChallenges: () => void;
  completedChallenge: () => void;
}

interface ChallengesProviderProps {
 children: ReactNode;
 level: number;
 currentExperience: number;
 challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

// rest: contém todas as props exceto children
export function ChallengesProvider({ children, ...rest}:ChallengesProviderProps) {

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [isOpenLevelUpModal, setIsOpenLevelUpModal] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<any>(null);


  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission(); 
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsOpenLevelUpModal(true);

    new Audio('/levelup.mp3').play();
  }

  function closeLevelUpModal() {
    setIsOpenLevelUpModal(false);
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
        closeLevelUpModal,
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

      {isOpenLevelUpModal && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}