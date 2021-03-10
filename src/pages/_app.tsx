import { ChallengesProvider } from '../contexts/ChallengesContext';
import { GetServerSideProps } from 'next';
import { AppProps } from 'next/app';
import '../styles/global.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

function MyApp({ Component, pageProps }: AppProps, props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}