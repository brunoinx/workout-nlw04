import styles from '../styles/components/ExperienceBar.module.css';

export default function ExperienceBar() {
  return (
    <header className={styles.experienceBar}>
      <span>0xp</span>

      <div>
        <div style={{ width: "50%" }}>
          <span
            className={styles.currentExperience}
            style={{ left: "50%" }}
          >
            300xp
          </span>
        </div>
        
        <div className={styles.pointBar}/>
      </div>

      <span>600xp</span>
    </header>
  );
}