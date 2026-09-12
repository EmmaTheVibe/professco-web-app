"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./NotificationsMenu.module.css";

export default function NotificationsMenu({ onMarkAllRead, onClearAll }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="More options"
      >
        <svg width="20" height="4" viewBox="0 0 20 4" fill="none">
          <circle cx="2" cy="2" r="2" fill="currentColor" />
          <circle cx="10" cy="2" r="2" fill="currentColor" />
          <circle cx="18" cy="2" r="2" fill="currentColor" />
        </svg>
      </button>

      {menuOpen && (
        <ul className={styles.menu}>
          <li>
            <button
              type="button"
              onClick={() => {
                onMarkAllRead();
                setMenuOpen(false);
              }}
            >
              Mark all as read
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                onClearAll();
                setMenuOpen(false);
              }}
            >
              Clear all
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
