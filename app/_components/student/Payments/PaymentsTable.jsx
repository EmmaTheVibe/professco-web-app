"use client";

import { useState } from "react";
import StatusPill from "@/app/_components/common/StatusPill/StatusPill";
import PaymentReceiptModal from "./PaymentReceiptModal";
import { mockPayments } from "@/app/_utils/mock-payments";
import styles from "./PaymentsTable.module.css";

export default function PaymentsTable() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [activePayment, setActivePayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allSelected =
    mockPayments.length > 0 && selectedIds.length === mockPayments.length;

  function toggleAll() {
    setSelectedIds(allSelected ? [] : mockPayments.map((p) => p.id));
  }

  function toggleRow(id) {
    setSelectedIds((curr) =>
      curr.includes(id) ? curr.filter((rowId) => rowId !== id) : [...curr, id],
    );
  }

  function handleDownload(payment) {
    setActivePayment(payment);
    setIsModalOpen(true);
  }

  return (
    <div className={styles.card}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr className="semiboldFont">
              <th className={styles.checkboxCell}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                />
              </th>
              <th>Order ID</th>
              <th>Course Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockPayments.map((payment) => (
              <tr key={payment.id}>
                <td className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(payment.id)}
                    onChange={() => toggleRow(payment.id)}
                  />
                </td>
                <td className={`boldFont ${styles.orderId}`}>
                  {payment.order_id}
                </td>
                <td className={styles.muted}>{payment.course_name}</td>
                <td className={styles.muted}>{payment.date}</td>
                <td className={`boldFont ${styles.amount}`}>
                  {payment.amount}
                </td>
                <td>
                  <StatusPill status={payment.status} />
                </td>
                <td>
                  <button
                    type="button"
                    className={`boldFont ${styles.downloadButton}`}
                    onClick={() => handleDownload(payment)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaymentReceiptModal
        payment={activePayment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
