"use client";

import React, { useState, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  // States to manage the status of logos and animations
  const [soldLogos, setSoldLogos] = useState(Array(32).fill(false)); // Keeps track of sold logos
  const [struckLogos, setStruckLogos] = useState(Array(32).fill(false)); // Manages the lightning strike animation
  const [lightningVisible, setLightningVisible] = useState(false); // Controls the visibility of the lightning overlay
  const [shakingLogos, setShakingLogos] = useState(Array(32).fill(false)); // Controls the shaking effect

  const audioRef = useRef<HTMLAudioElement>(null); // Reference to play the lightning sound

  const handleClick = (index: number) => {
    if (soldLogos[index]) return; // If the logo is sold, stop further action

    // Update the struck logo state (triggers lightning strike animation)
    const updatedStruckLogos = [...struckLogos];
    updatedStruckLogos[index] = true;
    setStruckLogos(updatedStruckLogos);

    // Play the lightning sound
    if (audioRef.current) {
      audioRef.current.play();
    }

    // Show the lightning overlay for a brief period
    setLightningVisible(true);
    setTimeout(() => setLightningVisible(false), 500); // Hide lightning after 500ms

    // Trigger shaking and mark logo as sold
    setTimeout(() => {
      const updatedShakingLogos = [...shakingLogos];
      updatedShakingLogos[index] = true; // Add shaking effect to the logo
      setShakingLogos(updatedShakingLogos);

      // Stop shaking after 500ms
      setTimeout(() => {
        updatedShakingLogos[index] = false;
        setShakingLogos(updatedShakingLogos);
      }, 500);

      // Mark the logo as sold
      const updatedSoldLogos = [...soldLogos];
      updatedSoldLogos[index] = true;
      setSoldLogos(updatedSoldLogos);
    }, 1000); // Start marking as sold after 1 second
  };

  // Manually manage the logo paths and their respective background colors
  const logoPaths = [
    { src: "/arizona.png", bgColor: "rgba(255, 0, 0, 0.3)" }, // Arizona - Red
    { src: "/atlanta.png", bgColor: "rgba(0, 0, 255, 0.3)" }, // Atlanta - Blue
    { src: "/baltimore.png", bgColor: "rgba(128, 0, 128, 0.3)" }, // Baltimore - Purple
    { src: "/buffalo.png", bgColor: "rgba(0, 255, 0, 0.3)" }, // Buffalo - Green
    { src: "/carolina_panthers.png", bgColor: "rgba(0, 255, 255, 0.3)" }, // Carolina - Cyan
    { src: "/chicago.png", bgColor: "rgba(255, 165, 0, 0.3)" }, // Chicago - Orange
    { src: "/cincinnati.png", bgColor: "rgba(255, 20, 147, 0.3)" }, // Cincinnati - Deep Pink
    { src: "/cleveland.png", bgColor: "rgba(165, 42, 42, 0.3)" }, // Cleveland - Brown
    { src: "/dallas.png", bgColor: "rgba(0, 191, 255, 0.3)" }, // Dallas - Deep Sky Blue
    { src: "/denver.png", bgColor: "rgba(255, 215, 0, 0.3)" }, // Denver - Gold
    { src: "/detroit.png", bgColor: "rgba(70, 130, 180, 0.3)" }, // Detroit - Steel Blue
    { src: "/greenbay.png", bgColor: "rgba(34, 139, 34, 0.3)" }, // Green Bay - Forest Green
    { src: "/houston.png", bgColor: "rgba(255, 99, 71, 0.3)" }, // Houston - Tomato
    { src: "/jacksonville.png", bgColor: "rgba(240, 248, 255, 0.3)" }, // Jacksonville - Alice Blue
    { src: "/kansas.png", bgColor: "rgba(255, 99, 71, 0.3)" }, // Kansas City - Tomato
    { src: "/las_vegas.png", bgColor: "rgba(255, 215, 0, 0.3)" }, // Las Vegas - Gold
    { src: "/los_angeles_rams.png", bgColor: "rgba(30, 144, 255, 0.3)" }, // Rams - Dodger Blue
    { src: "/los_angeles.png", bgColor: "rgba(255, 20, 147, 0.3)" }, // Chargers - Deep Pink
    { src: "/miami_dolphins.png", bgColor: "rgba(0, 191, 255, 0.3)" }, // Miami - Deep Sky Blue
    { src: "/minnesota_viking.png", bgColor: "rgba(128, 0, 128, 0.3)" }, // Minnesota - Purple
    { src: "/new_england_patriots.png", bgColor: "rgba(178, 34, 34, 0.3)" }, // New England - Firebrick
    { src: "/New_Orleans_Saints.png", bgColor: "rgba(255, 215, 0, 0.3)" }, // Saints - Gold
    { src: "/new_york_giants.png", bgColor: "rgba(0, 0, 139, 0.3)" }, // Giants - Dark Blue
    { src: "/new_york_jets.png", bgColor: "rgba(0, 128, 0, 0.3)" }, // Jets - Green
    { src: "/philadelphia_eagles.png", bgColor: "rgba(0, 128, 128, 0.3)" }, // Eagles - Teal
    { src: "/pittsburgh_steelers.png", bgColor: "rgba(255, 215, 0, 0.3)" }, // Steelers - Gold
    { src: "/san_francisco.png", bgColor: "rgba(255, 0, 0, 0.3)" }, // San Francisco - Red
    { src: "/seattle_seahawks.png", bgColor: "rgba(0, 0, 255, 0.3)" }, // Seahawks - Blue
    { src: "/tampa_bay_buccaneers.png", bgColor: "rgba(255, 165, 0, 0.3)" }, // Buccaneers - Orange
    { src: "/tennessee_titans.png", bgColor: "rgba(70, 130, 180, 0.3)" }, // Titans - Steel Blue
    { src: "/washington_commanders.png", bgColor: "rgba(128, 0, 0, 0.3)" }, // Commanders - Maroon
    { src: "/indianapolis.png", bgColor: "rgba(255, 165, 0, 0.3)" }, // Indianapolis - Orange
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Logo Selling App</title>
        <meta name="description" content="A platform to sell logos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Render the first 28 logos */}
          {logoPaths.slice(0, 28).map((logo, index) => (
            <div
              key={index}
              className={`${styles.logoContainer} ${
                soldLogos[index] ? styles.sold : ""
              } ${shakingLogos[index] ? styles.shake : ""}`}
              onClick={() => handleClick(index)}
              style={{ backgroundColor: logo.bgColor }} // Set individual background color
            >
              {!soldLogos[index] ? (
                <>
                  <img src={logo.src} alt={`Logo ${index + 1}`} className={styles.logoImage} />
                  {struckLogos[index] && (
                    <img src="/lightning.gif" alt="Lightning Strike" className={styles.lightningGif} />
                  )}
                </>
              ) : (
                <div className={styles.soldMessage}>SOLD</div>
              )}
            </div>
          ))}

          {/* Display the NFL logo in the center */}
          <div className={styles.nflLogoContainer}>
            <img src="/nfl-logo.png" alt="NFL Logo" className={styles.nflLogo} />
          </div>

          {/* Render the last 4 logos to complete the grid */}
          {logoPaths.slice(28, 32).map((logo, index) => {
            const logoIndex = 28 + index;
            return (
              <div
                key={logoIndex}
                className={`${styles.logoContainer} ${
                  soldLogos[logoIndex] ? styles.sold : ""
                } ${shakingLogos[logoIndex] ? styles.shake : ""}`}
                onClick={() => handleClick(logoIndex)}
                style={{ backgroundColor: logo.bgColor }} // Set individual background color
              >
                {!soldLogos[logoIndex] ? (
                  <>
                    <img src={logo.src} alt={`Logo ${logoIndex + 1}`} className={styles.logoImage} />
                    {struckLogos[logoIndex] && (
                      <img src="/lightning.gif" alt="Lightning Strike" className={styles.lightningGif} />
                    )}
                  </>
                ) : (
                  <div className={styles.soldMessage}>SOLD</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Lightning overlay for blinking effect */}
        {lightningVisible && <div className={styles.lightningOverlay}></div>}

        {/* Audio element */}
        <audio ref={audioRef} src="/lightning.mp3" preload="auto" />
      </main>
    </div>
  );
}
