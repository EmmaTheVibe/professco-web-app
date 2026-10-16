"use client";

import { useState } from "react";
import { toast } from "sonner";
import Modal from "@/app/_components/common/Modal/Modal";
import Loader from "@/app/_components/common/Loader/Loader";
import ExamCard from "@/app/_components/common/ExamCard/ExamCard";
import useAuthStore from "@/app/_utils/auth-store";
import { saveExamBodies } from "@/app/_lib/account-setup-service";
import styles from "./UpdateProfileModal.module.css";

function ExamBodiesForm({ examBodies, onClose }) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [selectedIds, setSelectedIds] = useState(() =>
    (user?.exam_bodies || []).map((body) => body.id),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function toggle(id) {
    setError("");
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((examId) => examId !== id)
        : [...current, id],
    );
  }

  async function handleSave() {
    if (selectedIds.length === 0) {
      return setError("Select at least one exam.");
    }

    setIsSaving(true);
    setError("");

    try {
      const response = await saveExamBodies(selectedIds);
      if (response?.user) {
        setUser(response.user);
      }

      toast.success("Your exams have been updated.");
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save your exams. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={styles.body}>
      <p className={`boldFont ${styles.sectionTitle}`}>Professional exams</p>
      <p className={styles.sectionDesc}>
        Select the exams you&apos;re preparing for. Tap a selected exam to remove
        it.
      </p>

      <div className={styles.examGrid}>
        {examBodies.map((exam) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            selectable
            selected={selectedIds.includes(exam.id)}
            onToggle={toggle}
          />
        ))}
      </div>

      {error && <p className={styles.fieldError}>{error}</p>}

      <button
        type="button"
        className={`filled ${styles.save}`}
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? <Loader /> : <p>Save changes</p>}
      </button>
    </div>
  );
}

export default function ExamBodiesModal({ isOpen, onClose, examBodies }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${styles.modal} ${styles.wideModal}`}
    >
      <div className={styles.header}>
        <p className={`boldFont ${styles.title}`}>Update professional exams</p>
      </div>
      <ExamBodiesForm examBodies={examBodies} onClose={onClose} />
    </Modal>
  );
}
