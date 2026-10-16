import { useState } from "react";
import Link from "next/link";
import LogoutModal from "./components/LogoutModal";
import { useUnreadNotificationsCount } from "@/app/_hooks/useUnreadNotificationsCount";
import styles from "./ProfileMenu.module.css";

const navLinks = [
  { label: "Home", href: "/student" },
  { label: "My courses", href: "/student/my-courses" },
];

const menuItems = [
  { label: "Notifications", href: "/student/notifications" },
  { label: "Account settings", href: "/student/account-settings" },
  { label: "Payment", href: "/student/payments" },
  { label: "Help and Support", href: "/contact" },
];

export default function ProfileMenu({
  user,
  onLogout,
  onNavigate,
  showNavLinks = false,
}) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { data: unreadCount = 0 } = useUnreadNotificationsCount();

  return (
    <div className={styles.menu}>
      <div className={styles.header}>
        <img src="/images/avatar1.svg" alt="avatar" className={styles.avatar} />
        <div>
          <p className="semiboldFont">
            {user?.first_name} {user?.last_name}
          </p>
          <p className={styles.email}>{user?.email}</p>
        </div>
      </div>

      <ul className={styles.list}>
        {showNavLinks &&
          navLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={onNavigate}>
                <p>{item.label}</p>
                <img src="/images/arrowright2.svg" alt="" />
              </Link>
            </li>
          ))}
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} onClick={onNavigate}>
              <span className={styles.labelGroup}>
                <p>{item.label}</p>
                {item.label === "Notifications" && unreadCount > 0 && (
                  <span className={styles.unreadBadge}>{unreadCount}</span>
                )}
              </span>
              <img src="/images/arrowright2.svg" alt="" />
            </Link>
          </li>
        ))}
        <li>
          <button
            className={styles.logout}
            onClick={() => setShowLogoutModal(true)}
          >
            <p>Log out</p>
          </button>
        </li>
      </ul>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={onLogout}
      />
    </div>
  );
}
