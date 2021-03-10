import Head from 'next/head';
import { GetServerSideProps } from 'next';

import Profile from '../components/Profile';
import Sidebar from '../components/Sidebar';
import Countdown from "../components/Contdown";
import ChallengeBox from "../components/ChallengeBox";
import ExperienceBar from "../components/ExperienceBar";
import CompletedChallenges from "../components/CompletedChallenges";

import { CountDownProvider } from '../contexts/CountdownContext';
import styles from "../styles/pages/Home.module.css";

interface UserGithubProps {
  name: string;
  avatar_url: string
}

export default function Home(props: UserGithubProps) {
  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <Head>
          <title>
            Home | Workout
          </title>
        </Head>

        <ExperienceBar />

        <CountDownProvider>
          <section>
            <div>
              <Profile {...props}/>
              <CompletedChallenges />
              <Countdown />
            </div>
            
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { username } = ctx.params;
  const response = await fetch(`https://api.github.com/users/${username}`)
  const {name, avatar_url} = await response.json();

  return {
    props: {
      name,
      avatar_url
    }
  }
}
