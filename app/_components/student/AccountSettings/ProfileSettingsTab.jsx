"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ExamCard from "@/app/_components/common/ExamCard/ExamCard";
import Spinner from "@/app/_components/layout/Spinner/Spinner";
import Loader from "@/app/_components/common/Loader/Loader";
import useAuthStore from "@/app/_utils/auth-store";
import { updateProfile } from "@/app/_lib/auth-service";
import {
  getExamBodies,
  saveExamBodies,
} from "@/app/_lib/account-setup-service";
import styles from "./ProfileSettingsTab.module.css";

export default function ProfileSettingsTab() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [examBodies, setExamBodies] = useState([]);
  const [isLoadingExamBodies, setIsLoadingExamBodies] = useState(true);
  const [selectedExamIds, setSelectedExamIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (Array.isArray(user?.exam_bodies)) {
      setSelectedExamIds(
        user.exam_bodies.map((body) => body.id).filter((id) => id != null),
      );
    }
  }, [user]);

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

  const toggleExam = (id) => {
    setSelectedExamIds((current) =>
      current.includes(id)
        ? current.filter((examId) => examId !== id)
        : [...current, id],
    );
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const [profileResponse] = await Promise.all([
        updateProfile({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
        }),
        saveExamBodies(selectedExamIds),
      ]);

      if (profileResponse?.profile) {
        setUser(profileResponse.profile);
      }

      toast.success("Settings updated successfully.");
    } catch (err) {
      toast.error(err.message || "Failed to update settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.section}>
        <p className={`boldFont ${styles.sectionTitle}`}>
          Personal information
        </p>
        <p className={styles.sectionDesc}>
          You must enter at least 4 learning objectives or outcomes
        </p>

        <div className={styles.fieldGroup}>
          <p className={styles.label}>
            FirstName <span>*</span>
          </p>
          <input
            type="text"
            placeholder="Placeholder"
            {...register("firstName", { required: "First name is required" })}
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p className={styles.fieldError}>{errors.firstName.message}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <p className={styles.label}>
            LastName <span>*</span>
          </p>
          <input
            type="text"
            placeholder="Placeholder"
            {...register("lastName", { required: "Last name is required" })}
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p className={styles.fieldError}>{errors.lastName.message}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <p className={styles.label}>
            Email <span>*</span>
          </p>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Placeholder"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              disabled={isSubmitting}
            />
            <img
              src="/images/form-icon-mail.svg"
              alt="icon"
              className={styles.icon}
            />
          </div>
          {errors.email && (
            <p className={styles.fieldError}>{errors.email.message}</p>
          )}
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
        ) : (
          <div className={styles.grid}>
            {examBodies.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                selectable
                selected={selectedExamIds.includes(exam.id)}
                onToggle={toggleExam}
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className={`outlined ${styles.submit}`}
        disabled={isSubmitting}
      >
        <p>{isSubmitting ? <Loader variant="dark" /> : "Update settings"}</p>
      </button>
    </form>
  );
}
