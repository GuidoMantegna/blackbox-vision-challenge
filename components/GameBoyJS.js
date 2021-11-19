import { NextComponentType, GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import styles from "../styles/GameBoy.module.css";

export const getStaticProps = async () => {
  const res = await fetch('https://opentdb.com/api.php?amount=10');
  const data = await res.json();
  const questions = data.results;
  console.log(questions)
  return {
    props: {
      questions: data,
    },
  }
}

const GameBoy = ({ questions }) => {

  useEffect(() => {
    console.log(questions)
  }, [])

  return (
      <div className={styles.main}>
        {questions[1].question}
      <div className={styles.body}>
        {/* SCREEN */}
        <div className={styles.screenBackground}>
          <div className={styles.screen}>
            <p className={styles.screenText}>category: entertainment</p>
            <p className={styles.screenText}>difficulty: easy</p>
            <p className={`${styles.screenText} ${styles.question}`}>
              Who is the frontman of the band 30 Seconds to Mars?
            </p>
            <p className={`${styles.screenText} ${styles.answer}`}>
              - Jared Leto
            </p>
            <p className={`${styles.screenText} ${styles.answer}`}>
              - Gerard Way
            </p>
            <p
              className={`${styles.screenText} ${styles.answer} ${styles.selectedAnswer}`}
            >
              - Matthew Bellamy
            </p>
            <p className={`${styles.screenText} ${styles.answer}`}>
              - Mike Shinoda
            </p>
          </div>
        </div>
        {/* BUTTONS */}
        <div className={styles.buttons}>
          {/* ARROWS */}
          <div className={styles.arrowBTNS}>
            <div className={styles.arrowsY}>
              <button className={styles.arrow}></button>
              <button className={styles.arrow}></button>
            </div>
            <div className={styles.arrowsX}>
              <button className={styles.arrow}></button>
              <button className={styles.arrow}></button>
            </div>
          </div>
          {/* SELECT START AB */}
          <div className={styles.inclinedBTNS}>
            <div className={styles.startSelect}>
              <div className={styles.selectContainer}>
                <button className={styles.selectBTN}></button>
                <span className={styles.buttonsText}>select</span>
              </div>
              <div className={styles.startContainer}>
                <button className={styles.startBTN}></button>
                <span className={styles.buttonsText}>start</span>
              </div>
            </div>
            <div className={styles.abBTNS}>
              <div className={styles.abContainer}>
                <button className={styles.abBTN}></button>
                <span className={styles.buttonsText}>A</span>
              </div>
              <div className={styles.abContainer}>
                <button className={styles.abBTN}></button>
                <span className={styles.buttonsText}>B</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoy;