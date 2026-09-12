import Cart from "@/app/_components/cart/Cart";
import Footer from "@/app/_components/layout/Footer/Footer";
import styles from "./CheckoutPage.module.css";

export default function page() {
  return (
    <section className={styles.checkoutPage}>
      <div className={`container ${styles.wrapper}`}>
        <h1 className={`${styles.heading} boldFont`}>My Cart</h1>
        <p className={`${styles.desc} lightFont`}>
          Welcome to your cart! Here are the courses you've added.
        </p>
        <Cart />
      </div>
      <Footer />
    </section>
  );
}
