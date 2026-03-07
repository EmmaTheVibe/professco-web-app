"use client";

import styles from "./Drawer.module.css";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Link from "next/link";
import useCartStore from "@/app/_utils/cart-store";

export default function Drawer({ openDrawer, setOpenDrawer }) {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className={styles.drawer}>
      <SwipeableDrawer
        anchor={"top"}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        PaperProps={{
          sx: {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <div className={styles.frame} onKeyDown={() => setOpenDrawer(false)}>
          <div className={styles.top}>
            <div className={`container ${styles.topWrapper}`}>
              <img src="/images/logo.svg" alt="logo" />
              <img
                src="/images/closer.svg"
                alt="closer"
                onClick={() => setOpenDrawer(false)}
              />
            </div>
          </div>
          <div className={`container ${styles.wrapper}`}>
            <div className={styles.searchbox}>
              <p
                className="semiboldFont"
                style={{
                  fontSize: "18px",
                  lineHeight: "29.7px",
                }}
              >
                Why Professco
              </p>
              <Link href="/checkout" onClick={() => setOpenDrawer(false)}>
                <div className={styles.cart}>
                  <img src="/images/nav-cart.svg" alt="cart" />
                  {cart.length > 0 && (
                    <span className={styles.cartBadge}>{cart.length}</span>
                  )}
                </div>
              </Link>
            </div>
            <div className={styles.btnPack}>
              <Link href="/signup" onClick={() => setOpenDrawer(false)}>
                <button className="filled">
                  <p>Sign up</p>
                </button>
              </Link>
              <Link href="/login" onClick={() => setOpenDrawer(false)}>
                <button className="outlined">
                  <p>Login</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
