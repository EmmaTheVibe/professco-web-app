"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BottomBanner from "@/app/_components/layout/BottomBanner/BottomBanner";
import Loader from "@/app/_components/common/Loader/Loader";
import PersonalizeForm from "@/app/_components/auth/PersonalizeForm/PersonalizeForm";
import { saveExamBodies } from "@/app/_lib/account-setup-service";
import useFilterStore from "@/app/_utils/filter-store";
import useAuthStore from "@/app/_utils/auth-store";
import styles from "./Personalize.module.css";

export default function Personalize() {
  const router = useRouter();
  const examBodyIds = useFilterStore((state) => state.examTypeList);
  const setExamTypeList = useFilterStore((state) => state.setExamTypeList);
  const setUser = useAuthStore((state) => state.setUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (examBodyIds.length === 0) {
      toast.error("Please select at least one exam body.");
      return;
    }

    setIsSubmitting(true);

    try {
      await saveExamBodies(examBodyIds);

      const accountResponse = await fetch("/api/auth/me");
      const accountData = accountResponse.ok ? await accountResponse.json() : null;

      if (accountData?.profile) {
        console.log("Account setup complete. Account info:", accountData.profile);
        setUser(accountData.profile);
      } else {
        console.log("Account setup complete. Account info unavailable.");
      }

      setExamTypeList([]);
      router.push("/student");
    } catch (err) {
      toast.error(err.message || "Failed to save your exam preferences.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.personalize}>
      <section className={styles.main}>
        <div className={`container ${styles.wrapper}`}>
          <div className={styles.frame}>
            <div>
              <p style={{ color: "#4B5563" }}>Let&apos;s get you started</p>
              <h1 className={`boldFont ${styles.title}`}>
                What exam are you preparing for?
              </h1>
              <p className={`lightFont ${styles.desc}`}>
                We&apos;ve got courses for every professional exam
              </p>
              <div className={styles.btnPC}>
                <button
                  className={`filled ${styles.btn}`}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  <p>{isSubmitting ? <Loader /> : "Get Started"}</p>
                </button>
              </div>
            </div>
            <PersonalizeForm />
            <div className={styles.btnMobile}>
              <button
                className={`filled ${styles.btn}`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <p>{isSubmitting ? <Loader /> : "Get Started"}</p>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.box}>
        <BottomBanner />
      </div>
    </section>
  );
}
