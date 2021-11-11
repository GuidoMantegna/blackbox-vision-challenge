import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GameBoy from '../components/GameBoy'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.main}>
        <GameBoy />
      </div>
    </>
  )
}

export default Home
