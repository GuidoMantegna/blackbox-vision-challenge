import { NextPage } from "next";
import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/GameBoy.module.css";

type Data = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type Props = {
  questions: Data[];
};

const GameBoy: NextPage<Props> = ({ questions }) => {
  const [qNum, setQNumb] = useState<number>(0);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<number>(-1);

  useEffect(() => {
    setAllAnswers(() =>
      [
        questions[qNum].correct_answer,
        ...questions[qNum].incorrect_answers,
      ].sort(() => 0.5 - Math.random())
    );
  }, []);

  const answerRef = useRef<HTMLUListElement>(null);

  const handleClick = () => {
    if (null !== answerRef.current) {
      let allAnswers = Array.from(answerRef.current.children);

      currentAnswer < allAnswers.length - 1
        ? setCurrentAnswer(currentAnswer + 1)
        : setCurrentAnswer(0);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        {/* SCREEN */}
        <div className={styles.screenBackground}>
          <div className={styles.screen}>
            <p className={styles.screenText}>
              category: {questions[qNum].category}
            </p>
            <p className={styles.screenText}>
              difficulty: {questions[qNum].difficulty}
            </p>
            <p className={`${styles.screenText} ${styles.question}`}>
              {questions[qNum].question}
            </p>
            <ul className={styles.answers} ref={answerRef}>
              {allAnswers!.map((answer: string, index: number) => {
                return (
                  <li
                    className={`${styles.screenText} ${styles.answer} ${
                      currentAnswer === index && styles.selectedAnswer
                    }`}
                    key={index}
                  >
                    {answer}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* BUTTONS */}
        <div className={styles.buttons}>
          {/* ARROWS */}
          <div className={styles.arrowBTNS}>
            <div className={styles.arrowsY}>
              <button className={styles.arrow}></button>
              <button
                className={styles.arrow}
                onClick={() => handleClick()}
              ></button>
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
                <button
                  className={styles.startBTN}
                  onClick={() => qNum < 9 && setQNumb(qNum + 1)}
                ></button>
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
