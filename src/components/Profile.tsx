import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

interface UserGitHubProps {
  name: string;
  avatar_url: string;
}

export default function Profile({name, avatar_url}: UserGitHubProps) {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src={avatar_url} alt="brunoinx"/>
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
          </p>
      </div>
    </div>
  );
}