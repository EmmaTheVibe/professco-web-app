"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Modal from "@/app/_components/common/Modal/Modal";
import Loader from "@/app/_components/common/Loader/Loader";
import useAuthStore from "@/app/_utils/auth-store";
import { updateProfile } from "@/app/_lib/auth-service";
import styles from "./UpdateProfileModal.module.css";

function UpdateProfileForm({ onClose }) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await updateProfile({
        first_name: data.firstName,
        last_name: data.lastName,
      });

      setUser({ ...user, first_name: data.firstName, last_name: data.lastName });
      toast.success("Profile updated successfully.");
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.body} onSubmit={handleSubmit(onSubmit)}>
      <p className={`boldFont ${styles.sectionTitle}`}>Personal information</p>
      <p className={styles.sectionDesc}>
        You must enter at least 4 learning objectives or outcomes
      </p>

      <div className={styles.fieldGroup}>
        <p className={styles.label}>
          First name <span>*</span>
        </p>
        <input
          type="text"
          placeholder="Enter your first name"
          {...register("firstName", { required: "First name is required" })}
          disabled={isSubmitting}
        />
        {errors.firstName && (
          <p className={styles.fieldError}>{errors.firstName.message}</p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <p className={styles.label}>
          Last name <span>*</span>
        </p>
        <input
          type="text"
          placeholder="Enter your last name"
          {...register("lastName", { required: "Last name is required" })}
          disabled={isSubmitting}
        />
        {errors.lastName && (
          <p className={styles.fieldError}>{errors.lastName.message}</p>
        )}
      </div>

      <button
        type="submit"
        className={`filled ${styles.save}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader /> : <p>Save changes</p>}
      </button>
    </form>
  );
}

export default function UpdateProfileModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
      <div className={styles.header}>
        <p className={`boldFont ${styles.title}`}>Update profile settings</p>
      </div>
      <UpdateProfileForm onClose={onClose} />
    </Modal>
  );
}
