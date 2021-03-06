import { ChallengesProvider } from '../contexts/ChallengesContext';
import styles from '../styles/components/RankingProfile.module.css';
import Profile from './Profile';

export default function RankingProfile() {
  return (
    <div className={styles.container}>
      <div className={styles.group1}>
        <strong>1</strong>

        <Profile />
      </div>

      <div className={styles.group2}>
        <span><strong>127</strong> completados</span>

        <span><strong>10400</strong> xp</span>
      </div>
    </div>
  );
}