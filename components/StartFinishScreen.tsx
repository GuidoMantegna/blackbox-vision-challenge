import { NextPage } from "next";
import React from "react";
import styles from "../styles/StartFinishScreen.module.scss";

type StartFinishProps = {
  setStep: (s: string) => void;
  step: string;
  earnedPoints: number;
  restart: () => void;
};

const StartFinishScreen: NextPage<StartFinishProps> = ({
  setStep,
  step,
  earnedPoints,
  restart,
}) => {
  return (
    <>
      {step === "start" ? (
        <div className={styles.startFinishScreen}>
          <p>Are you ready for thinking?</p>
          <div>
            <span>Yes (A)</span>
            <span>No (B)</span>
          </div>
        </div>
      ) : (
        <div className={styles.startFinishScreen}>
          <h2>Finished!</h2>
          <p style={{marginBottom: '15px'}}>Total points {earnedPoints}</p>
          <p>
            Want to restart?
          </p>
          <div>
            <span>Yes (A)</span>
            <span>No (B)</span>
          </div>
        </div>
      )}
    </>
  );
};

export default StartFinishScreen;
