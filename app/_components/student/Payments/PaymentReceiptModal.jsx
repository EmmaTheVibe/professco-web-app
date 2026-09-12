"use client";

import Modal from "@/app/_components/common/Modal/Modal";
import styles from "./PaymentReceiptModal.module.css";

const STATUS_META = {
  paid: {
    icon: "/images/success-tick.svg",
    heading: "Payment Success!",
    circleClass: "circleGreen",
  },
  pending: {
    icon: "/images/pending-tick.svg",
    heading: "Payment Pending",
    circleClass: "circleAmber",
  },
  failed: {
    icon: "/images/error-tick.svg",
    heading: "Payment Failed",
    circleClass: "circleRed",
  },
  refunded: {
    icon: "/images/pending-tick.svg",
    heading: "Payment Refunded",
    circleClass: "circleAmber",
  },
};

export default function PaymentReceiptModal({ payment, isOpen, onClose }) {
  if (!payment) return null;

  const meta = STATUS_META[payment.status];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
      <div className={styles.content}>
        <div className={`${styles.iconCircle} ${styles[meta.circleClass]}`}>
          <img src={meta.icon} alt="" className={styles.statusIcon} />
        </div>
        <p className={`semiboldFont ${styles.heading}`}>{meta.heading}</p>
        <p className={`boldFont ${styles.amount}`}>{payment.amount}</p>

        <div className={styles.divider} />

        <div className={styles.row}>
          <span className={styles.label}>Ref Number</span>
          <span className={styles.value}>{payment.ref_number}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Payment Time</span>
          <span className={styles.value}>{payment.payment_time}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Payment Method</span>
          <span className={styles.value}>{payment.payment_method}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Payer's Name</span>
          <span className={styles.value}>{payment.payer_name}</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.row}>
          <span className={styles.label}>Amount</span>
          <span className={`boldFont ${styles.value}`}>{payment.amount}</span>
        </div>

        <button type="button" className={styles.downloadButton}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M19 13V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V13M5 8L10 13L15 8M10 13V1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Get PDF Receipt
        </button>
      </div>
    </Modal>
  );
}
