import Cart from "@/app/_components/cart/Cart";
import Footer from "@/app/_components/layout/Footer/Footer";
import { getCourseById } from "../_lib/data-service";
import styles from "./CheckoutPage.module.css";

export default async function page({ searchParams }) {
  const { directPurchase, courseId } = await searchParams;

  let course = null;

  if (directPurchase && courseId) {
    course = await getCourseById(courseId);
  }

  return (
    <section className={styles.checkoutPage}>
      <div className={`container ${styles.wrapper}`}>
        <h1 className={`${styles.heading} boldFont`}>Checkout</h1>
        <p className={`${styles.desc} lightFont`}>
          Please prove your information
        </p>
        <Cart course={course} />
      </div>
      <Footer />
    </section>
  );
}
