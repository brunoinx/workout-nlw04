import styles from '../../styles/pages/Ranking.module.css';

import RankingProfile from '../components/RankingProfile';
import Sidebar from '../components/Sidebar';

export default function Ranking() {
  return (
    <>
      <Sidebar />
      
      <section className={styles.container}>
        <h1>Ranking dos participantes 🌟️</h1>

        <div className={styles.legendsRanking}>
          <div>
            <strong>POSIÇÃO</strong>
            <strong>USUÁRIO</strong>
          </div>

          <div>
            <strong>DESAFIOS</strong>
            <strong>EXPERIÊNCIA</strong>
          </div>
        </div>

        <RankingProfile />
        <RankingProfile />
        <RankingProfile />
        <RankingProfile />
        <RankingProfile />
        <RankingProfile />
      </section>
    </>
  )
}