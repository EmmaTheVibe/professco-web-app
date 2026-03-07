"use client";

import { formOptions } from "@/app/_utils/data";
import styles from "./FooterForm.module.css";
import { useState } from "react";

export default function FooterForm() {
  const [examType, setExamType] = useState("What exam are you preparing for?");
  const [email, setEmail] = useState("");
  return (
    <form className={styles.form}>
      <div className={styles.selectbox}>
        <img src="/images/formarrow.svg" alt="arrow" className={styles.arrow} />
        <select
          name=""
          id=""
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
        >
          {formOptions.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.frame}>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className={`filled ${styles.btn}`}>
          <p>Get materials</p>
        </button>
      </div>
    </form>
  );
}
