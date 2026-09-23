"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Toggle from "@/app/_components/common/Toggle/Toggle";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/app/_lib/notification-service";
import styles from "./NotificationsTab.module.css";

const DEFAULT_PREFS = {
  news_and_updates: true,
  course_recommendations: true,
  purchase_confirmation: true,
};

const ROWS = [
  {
    key: "news_and_updates",
    title: "News and updates",
    description: "Get notified about the latest news and updates from us",
  },
  {
    key: "course_recommendations",
    title: "Course Recommendations",
    description: "Get notified when we have course recommendations for you",
  },
  {
    key: "purchase_confirmation",
    title: "Purchase Confirmation",
    description: "Get notified when your purchase has been confirmed",
  },
];

export default function NotificationsTab() {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getNotificationPreferences()
      .then((data) => {
        if (isMounted) {
          setPrefs({ ...DEFAULT_PREFS, ...data });
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggle = async (key, checked) => {
    const next = { ...prefs, [key]: checked };
    setPrefs(next);
    setIsSaving(true);

    try {
      await updateNotificationPreferences(next);
    } catch (err) {
      setPrefs(prefs);
      toast.error(
        err.message || "Failed to update notification preferences.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {ROWS.map((row) => (
        <div key={row.key} className={styles.row}>
          <div>
            <p className={`semiboldFont ${styles.title}`}>{row.title}</p>
            <p className={styles.description}>{row.description}</p>
          </div>
          <Toggle
            checked={!!prefs[row.key]}
            onChange={(checked) => handleToggle(row.key, checked)}
            label={row.title}
            disabled={isSaving}
          />
        </div>
      ))}
    </div>
  );
}
