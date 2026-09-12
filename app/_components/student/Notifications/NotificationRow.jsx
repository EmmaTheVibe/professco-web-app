"use client";

import styles from "./NotificationRow.module.css";

function MailIcon({ read }) {
  return (
    <span className={styles.iconWrapper}>
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
        <path
          d="M1 3L8.75 8.25a2 2 0 0 0 2.5 0L19 3M3 1h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {!read && <span className={styles.unreadDot} />}
    </span>
  );
}

export default function NotificationRow({ notification, isOpen, onToggle }) {
  return (
    <div className={styles.row}>
      <MailIcon read={notification.read} />
      <div className={styles.content}>
        <p className={`semiboldFont ${styles.title}`}>{notification.title}</p>
        <p className={`${styles.description} ${isOpen ? styles.expanded : ""}`}>
          {notification.description}
        </p>
      </div>
      <div className={styles.meta}>
        <span className={styles.timestamp}>{notification.timestamp}</span>
        <button
          type="button"
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          onClick={() => onToggle(notification.id)}
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
