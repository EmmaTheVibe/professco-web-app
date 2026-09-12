import styles from "./StatusPill.module.css";

export type PaymentStatus = "paid" | "pending" | "refunded" | "failed";

interface Props {
  status: PaymentStatus;
}

function PaidIcon() {
  return (
    <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
      <path
        d="M8.75 0.75L3.25 6.25L0.75 3.75"
        stroke="#12B76A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PendingIcon() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
      <circle cx="3" cy="3" r="3" fill="#F79009" />
    </svg>
  );
}

function RefundedIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M3.25 0.75L0.75 3.25L3.25 5.75M0.75 3.25H6.75C7.28043 3.25 7.78914 3.46071 8.16421 3.83579C8.53929 4.21086 8.75 4.71957 8.75 5.25V8.75"
        stroke="#667085"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FailedIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <path
        d="M6.75 0.75L0.75 6.75M0.75 0.75L6.75 6.75"
        stroke="#F04438"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; icon: () => React.JSX.Element; className: string }
> = {
  paid: { label: "Paid", icon: PaidIcon, className: styles.paid },
  pending: { label: "Pending", icon: PendingIcon, className: styles.pending },
  refunded: {
    label: "Refunded",
    icon: RefundedIcon,
    className: styles.refunded,
  },
  failed: { label: "Failed", icon: FailedIcon, className: styles.failed },
};

export default function StatusPill({ status }: Props) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span className={`${styles.pill} ${config.className}`}>
      <Icon />
      {config.label}
    </span>
  );
}
