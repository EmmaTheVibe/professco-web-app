"use client";

import { useState } from "react";
import Link from "next/link";
import EmptyState from "@/app/_components/common/EmptyState/EmptyState";
import NotificationRow from "./NotificationRow";
import NotificationsMenu from "./NotificationsMenu";
import { mockNotifications } from "@/app/_utils/mock-notifications";
import styles from "./NotificationsList.module.css";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [hideRead, setHideRead] = useState(false);
  const [openIds, setOpenIds] = useState({});

  const visibleNotifications = hideRead
    ? notifications.filter((notification) => !notification.read)
    : notifications;

  function toggleRow(id) {
    setOpenIds((curr) => ({ ...curr, [id]: !curr[id] }));
  }

  function handleMarkAllRead() {
    setNotifications((curr) => curr.map((n) => ({ ...n, read: true })));
  }

  function handleClearAll() {
    setNotifications([]);
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.count}>
          <span>All notifications</span>
          <span className={styles.badge}>{notifications.length}</span>
        </div>

        <div className={styles.actions}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={hideRead}
              onChange={(e) => setHideRead(e.target.checked)}
            />
            Hide read notifications
          </label>

          <Link
            href="/student/account-settings"
            className={styles.iconButton}
            aria-label="Notification settings"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Link>

          <NotificationsMenu
            onMarkAllRead={handleMarkAllRead}
            onClearAll={handleClearAll}
          />
        </div>
      </div>

      {visibleNotifications.length === 0 ? (
        <EmptyState
          illustration="/images/empty-student-courses.png"
          heading="No notifications here"
          description="You're all good"
        />
      ) : (
        <div className={styles.list}>
          {visibleNotifications.map((notification) => (
            <NotificationRow
              key={notification.id}
              notification={notification}
              isOpen={!!openIds[notification.id]}
              onToggle={toggleRow}
            />
          ))}
        </div>
      )}
    </div>
  );
}
