import React from "react";
import styles from './loader.module.css';

export default function Loader({fill = 'rgb(85, 85, 85)'}) {
  return (
    <svg
      aria-label="Φόρτωση..."
      className={`${styles.loaderSVG} loadSpinner`}
      role="img"
      viewBox="0 0 100 100"
    >
      <rect
        className={styles.loaderLines}
        height="6"
        opacity="0"
        rx="3"
        ry="3"
        transform="rotate(-90 50 50)"
        width="25"
        x="72"
        y="47"
        fill={fill}
      ></rect>
      <rect
        className={styles.loaderLines}
        height="6"
        opacity="0.08333333333333333"
        rx="3"
        ry="3"
        transform="rotate(-60 50 50)"
        width="25"
        x="72"
        y="47"
        fill={fill}
      ></rect>
      <rect
        className={styles.loaderLines}
        height="6"
        opacity="0.16666666666666666"
        rx="3"
        ry="3"
        transform="rotate(-30 50 50)"
        width="25"
        x="72"
        y="47"
        fill={fill}
      ></rect>
      <rect
        className={styles.loaderLines}
        height="6"
        opacity="0.25"
        rx="3"
        ry="3"
        transform="rotate(0 50 50)"
        width="25"
        x="72"
        y="47"
        fill={fill}
      ></rect>
      <rect
        className={styles.loaderLines}
        height="6"
        opacity="0.3333333333333333"
        rx="3"
        ry="3"
        transform="rotate(30 50 50)"
        width="25"
        x="72"
        y="47"
        fill={fill}
      ></rect>
      <rect
        className={styles.loaderLines}
        height="6"
        opacity="0.4166666666666667"
        rx="3"
        ry="3"
        transform="rotate(60 50 50)"
        width="25"
        x="72"
        y="47"
        fill={fill}
      ></rect>
      <rect
        className={styles.loaderLines}
        height="6"
        opacity="0.5"
        rx="3"
        ry="3"
        transform="rotate(90 50 50)"
        width="25"
        x="72"
        y="47"
        fill={fill}
      ></rect>
      <rect
        className={styles.loaderLines}
        height="6"
        opacity="0.5833333333333334"
        rx="3"
        ry="3"
        transform="rotate(120 50 50)"
        width="25"
        x="72"
        y="47"
        fill={fill}
      ></rect>
      <rect
        className={styles.loaderLines}
        height="6"
        opacity="0.6666666666666666"
        rx="3"
        ry="3"
        transform="rotate(150 50 50)"
        width="25"
        x="72"
        y="47"
        fill={fill}
      ></rect>
      <rect
        className={styles.loaderLines}
        height="6"
        opacity="0.75"
        rx="3"
        ry="3"
        transform="rotate(180 50 50)"
        width="25"
        x="72"
        y="47"
        fill={fill}
      ></rect>
      <rect
        className={styles.loaderLines}
        height="6"
        opacity="0.8333333333333334"
        rx="3"
        ry="3"
        transform="rotate(210 50 50)"
        width="25"
        x="72"
        y="47"
        fill={fill}
      ></rect>
      <rect
        className={styles.loaderLines}
        height="6"
        opacity="0.9166666666666666"
        rx="3"
        ry="3"
        transform="rotate(240 50 50)"
        width="25"
        x="72"
        y="47"
        fill={fill}
      ></rect>
    </svg>
  );
}
