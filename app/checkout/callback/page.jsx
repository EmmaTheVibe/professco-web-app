import CheckoutCallback from "@/app/_components/checkout/CheckoutCallback/CheckoutCallback";
import styles from "./CheckoutCallbackPage.module.css";

export default function page() {
  return (
    <section className={styles.home}>
      <div className="container">
        <CheckoutCallback />
      </div>
    </section>
  );
}
