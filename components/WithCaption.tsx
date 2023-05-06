import styles from "./layout.module.css";
import React from "react";

export default function WithCaption(props: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={styles.m}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {React.Children.map(props.children, (child) => (
          <div>{child}</div>
        ))}
      </div>
      <figcaption>{props.caption}</figcaption>
    </figure>
  );
}
