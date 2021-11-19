import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GameBoy from '../components/GameBoy'
import styles from '../styles/Home.module.css'

type Data = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answers: string
  incorrect_answers: string[]
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://opentdb.com/api.php?amount=10');
  const data = await res.json();
  const questions: Data[] = data.results;

  return {
    props: {
      questions,
    },
  }
}

const Home: NextPage = ({ questions }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className={styles.main}>
        <GameBoy questions={questions}/>
      </div>
    </>
  )
}

export default Home
