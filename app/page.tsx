"use client";

import React, { useState, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [soldLogos, setSoldLogos] = useState<boolean[]>(Array(32).fill(false));
  const [struckLogos, setStruckLogos] = useState<boolean[]>(
    Array(32).fill(false)
  );
  const [lightningVisible, setLightningVisible] = useState<boolean>(false);
  const [shakingLogos, setShakingLogos] = useState<boolean[]>(
    Array(32).fill(false)
  );

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = (index: number) => {
    if (soldLogos[index]) return;

    const newStruckLogos = [...struckLogos];
    newStruckLogos[index] = true;
    setStruckLogos(newStruckLogos);

    // Play the audio
    if (audioRef.current) {
      audioRef.current.play();
    }

    // Show the lightning effect
    setLightningVisible(true);

    const blinkDuration = 500; // Duration of blink
    setTimeout(() => {
      setLightningVisible(false); // Hide after animation duration
    }, blinkDuration);

    // Handle the logo shaking and sold status
    setTimeout(() => {
      const newShakingLogos = [...shakingLogos];
      newShakingLogos[index] = true; // Trigger shake effect
      setShakingLogos(newShakingLogos);

      setTimeout(() => {
        const resetShakingLogos = [...shakingLogos];
        resetShakingLogos[index] = false; // Reset shake state
        setShakingLogos(resetShakingLogos);
      }, 500); // Duration of the shake effect

      const newSoldLogos = [...soldLogos];
      newSoldLogos[index] = true;
      setSoldLogos(newSoldLogos);
    }, 1000); // Delay before marking as sold
  };

  const logos = Array(32).fill(null);
  const middleIndexes = [10, 11, 16, 17]; // Middle 4 logos to remove
  const filteredLogos = logos.filter(
    (_, index) => !middleIndexes.includes(index)
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Logo Selling App</title>
        <meta name="description" content="A platform to sell logos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          {filteredLogos.map((_, index) => (
            <div
              key={index}
              className={`${styles.logoContainer} ${
                soldLogos[index] ? styles.sold : ""
              } ${shakingLogos[index] ? styles.shake : ""}`}
              onClick={() => handleClick(index)}
            >
              {!soldLogos[index] ? (
                <>
                  <img
                    src={`https://via.placeholder.com/100?text=Logo+${
                      index + 1
                    }`}
                    alt={`Logo ${index + 1}`}
                    className={styles.logoImage}
                  />
                  {struckLogos[index] && (
                    <img
                      src="/lightning.gif"
                      alt="Lightning Strike"
                      className={styles.lightningGif}
                    />
                  )}
                </>
              ) : (
                <div className={styles.soldMessage}>SOLD</div>
              )}
            </div>
          ))}

          {/* NFL Logo in the center */}
          <div className={styles.nflLogoContainer}>
            <img
              src="/nfl-logo.png"
              alt="NFL Logo"
              className={styles.nflLogo}
            />
          </div>
        </div>

        {/* Lightning overlay for blinking effect */}
        {lightningVisible && <div className={styles.lightningOverlay}></div>}

        {/* Audio element */}
        <audio ref={audioRef} src="/lightning.mp3" preload="auto" />
      </main>
    </div>
  );
}
