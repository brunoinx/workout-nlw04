import styles from '../styles/pages/Ranking.module.css';

import RankingProfile from '../components/RankingProfile';
import Sidebar from '../components/Sidebar';

interface UserGitHubProps {
  name: string;
  avatar_url: string;
}

export default function Ranking(props: UserGitHubProps) {
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

        <RankingProfile {...props}/>
        <RankingProfile {...props}/>
        <RankingProfile {...props}/>
      </section>
    </>
  )
}