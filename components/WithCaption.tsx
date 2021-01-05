import styles from "./layout.module.css";
import React from "react";

export default function WithCaption(props: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={styles.m}>
      {React.Children.map(props.children, (child) => (
        <div className={styles.imgPadding}>{child}</div>
      ))}
      <figcaption>{props.caption}</figcaption>
    </figure>
  );
}
