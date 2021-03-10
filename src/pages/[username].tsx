import Head from 'next/head';
import { GetServerSideProps } from 'next';

import ExperienceBar from "../components/ExperienceBar";
import Profile from '../components/Profile';
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Contdown";
import ChallengeBox from "../components/ChallengeBox";
import Sidebar from '../components/Sidebar';

import { useContext } from 'react';
import { CountDownProvider } from '../contexts/CountdownContext';
import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';

import styles from "../styles/pages/Home.module.css";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const {} = useContext(ChallengesContext)

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >

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
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
