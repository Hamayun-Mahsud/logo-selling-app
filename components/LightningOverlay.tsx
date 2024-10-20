// components/LightningOverlay.tsx
import React from "react";
import styles from "../styles/Home.module.css"; // Adjust the path as necessary

const LightningOverlay: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <>
      {visible && <div className={styles.lightningOverlay}></div>}
    </>
  );
};

export default LightningOverlay;
