"use strict";

import React from "react";
import styles from "./index.module.scss";

function Feedback({ message }) {
  return (
    <section className={styles.feedback}>
      {message}
    </section>
  );
}

export default Feedback;
