import Modal from "@/app/_components/common/Modal/Modal";
import styles from "./LogoutModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.logoutModal}>
      <div className={styles.badge}>
        <img
          src="/images/logout-bg.svg"
          alt="icon"
          className={styles.logoutBg}
        />
        <div className={styles.badgeOuter}>
          <div className={styles.badgeInner}>
            <img src="/images/logout-icon.svg" alt="icon" />
          </div>
        </div>
      </div>

      <h2 className={`boldFont ${styles.title}`}>Log Out</h2>
      <p className={styles.description}>
        Are you sure you wish to proceed to log out of your professco account?
      </p>

      <div className={styles.actions}>
        <button className={styles.cancelBtn} onClick={onClose}>
          <p>Cancel</p>
        </button>
        <button className="filled" onClick={onConfirm}>
          <p>Proceed</p>
        </button>
      </div>
    </Modal>
  );
}
