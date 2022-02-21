import { NextPage } from "next";
import React from "react";
import styles from "../styles/Buttons.module.css";

type ButtonsProps = {
  handleArrowsClick: (s: string) => void;
  handleSelectStart: () => void;
  restart: () => void;
  setStep: (s: string) => void;
  step: string;
};

const Buttons: NextPage<ButtonsProps> = ({
  handleArrowsClick,
  handleSelectStart,
  restart,
  setStep,
  step,
}) => {
  return (
    <>
      {/* BUTTONS */}
      <div className={styles.buttons}>
        {/* ARROWS */}
        <div className={styles.arrowBTNS}>
          <div className={styles.arrowsY}>
            <button
              className={styles.arrow}
              onClick={() => handleArrowsClick("up")}
            ></button>
            <button
              className={styles.arrow}
              onClick={() => handleArrowsClick("down")}
            ></button>
          </div>
          <div className={styles.arrowsX}>
            <button
              className={styles.arrow}
              onClick={() => handleArrowsClick("up")}
            ></button>
            <button
              className={styles.arrow}
              onClick={() => handleArrowsClick("down")}
            ></button>
          </div>
        </div>
        {/* SELECT START AB */}
        <div className={styles.inclinedBTNS}>
          <div className={styles.startSelect}>
            <div className={styles.selectContainer}>
              <button
                className={styles.selectBTN}
                onClick={() => handleSelectStart()}
              ></button>
              <span className={styles.buttonsText}>select</span>
            </div>
            <div className={styles.startContainer}>
              <button
                className={styles.startBTN}
                onClick={() => handleSelectStart()}
              ></button>
              <span className={styles.buttonsText}>start</span>
            </div>
          </div>
          <div className={styles.abBTNS}>
            <div className={styles.abContainer}>
              <button
                disabled={step !== "start" && step !== "finish"}
                className={styles.abBTN}
                onClick={() => {
                  step === "start" ? setStep("questions") : restart();
                }}
              ></button>
              <span className={styles.buttonsText}>A</span>
            </div>
            <div className={styles.abContainer}>
              <button className={styles.abBTN}></button>
              <span className={styles.buttonsText}>B</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Buttons;
