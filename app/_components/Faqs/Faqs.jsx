"use client";
import styles from "./Faqs.module.css";
import { useState } from "react";
import { faqs } from "@/app/_utils/data";

export default function Faqs() {
  const [faqList, setFaqList] = useState(faqs);
  function handleIsOpen(id) {
    setFaqList((curr) =>
      curr.map((item) =>
        item.id === id
          ? { ...item, open: !item.open }
          : { ...item, open: false }
      )
    );
  }
  return (
    <div className={styles.accordion}>
      {faqList.map((faq) => (
        <div
          className={`${styles.accordionItem} ${faq.open ? styles.open : ""}`}
          key={faq.id}
          onClick={() => handleIsOpen(faq.id)}
        >
          <div className={styles.question}>
            <p className="semiboldFont">{faq.question}</p>
            {/* <p className="icon" onClick={() => handleIsOpen(faq.id)}>
            {open ? "-" : "+"}
          </p> */}
            <img
              src="/images/faqarrow.svg"
              alt="arrow"
              style={{
                width: "16.79px",
                height: "9.5px",
                transition: "0.3s ease",
              }}
            />
          </div>

          {/* {open && (
            <div className={styles.answer}>
              <p>{faq.answer}</p>
            </div>
          )} */}

          <div className={styles.answer}>
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
