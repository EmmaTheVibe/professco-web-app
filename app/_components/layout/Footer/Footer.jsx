"use client";
import { examTabs, footerOptions } from "@/app/_utils/data";
import Notifs from "@/app/_components/common/Notifs/Notifs";
import styles from "./Footer.module.css";
import Link from "next/link";

import dynamic from "next/dynamic";

const FooterForm = dynamic(
  () => import("@/app/_components/layout/FooterForm/FooterForm"),
  {
    ssr: false,
  }
);

export default function Footer() {
  const learnOptions = footerOptions.filter((option) =>
    option.section.includes("learn")
  );
  const professcoOptions = footerOptions.filter((option) =>
    option.section.includes("professco")
  );

  return (
    <section className={styles.footer}>
      <div className={`container ${styles.frame}`}>
        <div className={`${styles.paperbox}`}>
          <img
            src="/images/pagesthin.png"
            alt="pages"
            className={styles.pages}
          />
          <div className={`${styles.notifbox}`}>
            <Notifs dark={true} />
          </div>
        </div>
        <div className={styles.formbox}>
          <h1 className="boldFont">Free materials & resources</h1>
          <p style={{ margin: "24px 0 16px" }} className={styles.formTxt}>
            Get free ebooks, PDFs, past questions and other resourecs to help
            you get started as you prepare for your exams
          </p>
          <FooterForm />
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={`container ${styles.frameB}`}>
        <div>
          <h1>Logo</h1>
          <p style={{ margin: "16px 0 32px" }} className={styles.txt}>
            We ara a lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat... Read More
          </p>
          <div className={styles.row}>
            <img src="/images/tel.svg" alt="icon" />
            <p>310-437-2766</p>
          </div>
          <div className={styles.row}>
            <img src="/images/sms.svg" alt="icon" />
            <p>unreal@outlook.com</p>
          </div>
          <div className={styles.row}>
            <img src="/images/location.svg" alt="icon" />
            <p>706 Campfire Ave. Meriden, CT 06450</p>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.column}>
            <p className={`boldFont ${styles.tabHead}`}>Exams</p>
            {examTabs.map((tab) => (
              <p key={tab.id} className={styles.tab}>
                {tab.name}
              </p>
            ))}
          </div>
          <div className={styles.column}>
            <p className={`boldFont ${styles.tabHead}`}>Learn</p>
            {learnOptions.map((tab) => (
              <p key={tab.id} className={styles.tab}>
                {tab.name}
              </p>
            ))}
          </div>
          <div className={styles.column}>
            <p className={`boldFont ${styles.tabHead}`}>Professco</p>
            {professcoOptions.map((tab) => (
              <Link key={tab.id} href={tab.href}>
                <p className={styles.tab}>{tab.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
