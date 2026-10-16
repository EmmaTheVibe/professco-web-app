"use client";

import { useEffect, useState } from "react";
import ExamCard from "@/app/_components/common/ExamCard/ExamCard";
import Spinner from "@/app/_components/layout/Spinner/Spinner";
import useAuthStore from "@/app/_utils/auth-store";
import { getExamBodies } from "@/app/_lib/account-setup-service";
import UpdateProfileModal from "./UpdateProfileModal";
import ChangeEmailModal from "./ChangeEmailModal";
import DeleteAccountModal from "./DeleteAccountModal";
import styles from "./ProfileSettingsTab.module.css";

function EditButton({ label, onClick }) {
  return (
    <button
      type="button"
      className={styles.editButton}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function ProfileSettingsTab() {
  const user = useAuthStore((state) => state.user);

  const [examBodies, setExamBodies] = useState([]);
  const [isLoadingExamBodies, setIsLoadingExamBodies] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadExamBodies() {
      try {
        const data = await getExamBodies();
        if (isMounted) {
          setExamBodies(data);
        }
      } catch (err) {
        if (isMounted) {
          setLoadError(err.message || "Failed to load exam bodies.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingExamBodies(false);
        }
      }
    }

    loadExamBodies();

    return () => {
      isMounted = false;
    };
  }, []);

  const userExamIds = (user?.exam_bodies || []).map((body) => body.id);
  const userExams = examBodies.filter((exam) => userExamIds.includes(exam.id));

  return (
    <div className={styles.form}>
      <div className={styles.section}>
        <p className={`boldFont ${styles.sectionTitle}`}>
          Personal information
        </p>
        <p className={styles.sectionDesc}>
          You must enter at least 4 learning objectives or outcomes
        </p>

        <div className={styles.fieldGroup}>
          <p className={styles.label}>
            First name <span>*</span>
          </p>
          <div className={styles.inputRow}>
            <input type="text" value={user?.first_name || ""} disabled readOnly />
            <EditButton label="Edit name" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <p className={styles.label}>
            Last name <span>*</span>
          </p>
          <div className={styles.inputRow}>
            <input type="text" value={user?.last_name || ""} disabled readOnly />
            <EditButton label="Edit name" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <p className={styles.label}>
            Email <span>*</span>
          </p>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <input type="email" value={user?.email || ""} disabled readOnly />
              <img
                src="/images/form-icon-mail.svg"
                alt="icon"
                className={styles.icon}
              />
            </div>
            <EditButton
              label="Change email"
              onClick={() => setIsEmailModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <p className={`boldFont ${styles.sectionTitle}`}>Professional exams</p>
        <p className={styles.sectionDesc}>Exams you selected to prepare for</p>

        {isLoadingExamBodies ? (
          <Spinner />
        ) : loadError ? (
          <div className={`${styles.message} ${styles.errorMessage}`}>
            {loadError}
          </div>
        ) : userExams.length === 0 ? (
          <p className={styles.sectionDesc}>You haven&apos;t selected any exams yet.</p>
        ) : (
          <div className={styles.grid}>
            {userExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.dangerZone}>
        <p className={`boldFont ${styles.sectionTitle}`}>Delete account</p>
        <p className={styles.sectionDesc}>
          Permanently delete your Professco account and all of its data. This
          can&apos;t be undone.
        </p>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <p>Delete account</p>
        </button>
      </div>

      <UpdateProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      <ChangeEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
