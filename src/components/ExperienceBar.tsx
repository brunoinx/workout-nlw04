import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export default function ExperienceBar() {
  const { currentExperience, xpToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = Math.round(currentExperience*100) / xpToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0xp</span>

      <div>
        <div style={{ width: `${percentToNextLevel}%` }}>
          <span
            className={styles.currentExperience}
            style={{ left: `${percentToNextLevel}%` }}
          >
            {currentExperience}xp
          </span>
        </div>
        
        <div className={styles.pointBar} style={{ left: `${percentToNextLevel - 1.5}% ` }}/>
      </div>

      <span>{xpToNextLevel}xp</span>
    </header>
  );
}