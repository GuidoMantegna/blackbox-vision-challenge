import { NextPage } from "next";
import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/GameBoy.module.scss";
import { removeChars } from "../util";
import { Info, Data } from "../types";
import StartFinishScreen from "./StartFinishScreen";
import Buttons from "./Buttons";

type GameBoyProps = {
  questions: Data[];
};

const GameBoy: NextPage<GameBoyProps> = ({ questions }) => {
  const [qNum, setQNumb] = useState<number>(0);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<number>(-1);
  const [step, setStep] = useState<string>("start");
  const [info, setInfo] = useState<Info>({
    points: 0,
    isCorrect: false,
    msg: "",
    earnedPoints: 0,
  });

  useEffect(() => {
    setAllAnswers(() =>
      [
        questions[qNum].correct_answer,
        ...questions[qNum].incorrect_answers,
      ].sort(() => 0.5 - Math.random())
    );
  }, [qNum]);

  const answerRef = useRef<HTMLUListElement>(null);

  const handleArrowsClick = (direction: string) => {
    if (null !== answerRef.current) {
      let allAnswers = Array.from(answerRef.current.children);

      if (direction === "down") {
        currentAnswer < allAnswers.length - 1
          ? setCurrentAnswer(currentAnswer + 1)
          : setCurrentAnswer(0);
      } else {
        currentAnswer > 0
          ? setCurrentAnswer(currentAnswer - 1)
          : setCurrentAnswer(allAnswers.length - 1);
      }
    }
  };

  const handleSelectStart = () => {
    if (currentAnswer === -1) return;
    if (null !== answerRef.current) {
      let allAnswers = Array.from(answerRef.current.children);

      if (
        questions[qNum].correct_answer === allAnswers[currentAnswer].textContent
      ) {
        questions[qNum].type === "boolean"
          ? setInfo({
              ...info,
              earnedPoints: 5,
              isCorrect: true,
              points: info.points + 5,
            })
          : setInfo({
              ...info,
              earnedPoints: 10,
              isCorrect: true,
              points: info.points + 10,
            });
      } else {
        setInfo({
          ...info,
          isCorrect: false,
        });
      }

      setStep("message");
      setTimeout(() => {
        qNum < 9
          ? (setStep("questions"), setQNumb(qNum + 1))
          : setStep("finish");
      }, 2000);
      setCurrentAnswer(-1);
    }
  };

  const restart = () => {
    setQNumb(0);
    setStep("start");
    setInfo({
      points: 0,
      isCorrect: false,
      msg: "",
      earnedPoints: 0,
    });
  };

  return (
    <>
      <Head>
        <title>
          {step === "questions" ? `Question ${qNum + 1}` : "Let's play"}
        </title>
        <meta charSet="UTF-8" />
      </Head>
      <div className={styles.main}>
        <div className={styles.body}>
          {/* SCREEN */}
          <div className={styles.screenBackground}>
            <div className={styles.screen}>
              {step === "start" ? (
                <StartFinishScreen
                  step={step}
                  setStep={setStep}
                  restart={restart}
                  earnedPoints={info.earnedPoints}
                />
              ) : step === "questions" ? (
                <>
                  <div className={styles.info}>
                    <p className={styles.screenText}>
                      {questions[qNum].category}
                    </p>
                    <p className={styles.screenText}>
                      difficulty: {questions[qNum].difficulty}
                    </p>
                    <p className={styles.screenText}>Points: {info.points}</p>
                  </div>

                  <div className={styles.questions}>
                    <p className={`${styles.screenText} ${styles.question}`}>
                      {removeChars(questions[qNum].question)}
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
                            {removeChars(answer)}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              ) : step === "message" ? (
                <>
                  {info.isCorrect ? (
                    <div className={styles.centeredScreen}>
                      <p className={styles.msgText}>
                        Great you won{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {info.earnedPoints}
                        </span>{" "}
                        points!
                      </p>
                    </div>
                  ) : (
                    <div className={styles.centeredScreen}>
                      <p className={styles.msgText}>
                        Wrong! Correct Answer:{" "}
                        <span>
                          {removeChars(questions[qNum].correct_answer)}
                        </span>
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <StartFinishScreen
                  step={step}
                  setStep={setStep}
                  restart={restart}
                  earnedPoints={info.points}
                />
              )}
            </div>
          </div>
          <Buttons
            handleArrowsClick={handleArrowsClick}
            handleSelectStart={handleSelectStart}
            step={step}
            setStep={setStep}
            restart={restart}
          />
        </div>
      </div>
    </>
  );
};

export default GameBoy;
