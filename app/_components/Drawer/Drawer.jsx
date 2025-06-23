"use client";

import styles from "./Drawer.module.css";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SearchBar from "@/app/_components/SearchBar/SearchBar";
import Link from "next/link";

export default function Drawer({ openDrawer, setOpenDrawer }) {
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
              <SearchBar width="100%" />
              <p
                className="semiboldFont"
                style={{
                  fontSize: "18px",
                  lineHeight: "29.7px",
                }}
              >
                Why Professco
              </p>
              {/* <p
                className="semiboldFont"
                style={{
                  fontSize: "18px",
                  lineHeight: "29.7px",
                }}
              >
                Learn
              </p> */}
              <div className={styles.cart}>
                <img src="/images/nav-cart.svg" alt="cart" />
                <div className={styles.count}></div>
              </div>
            </div>
            <div className={styles.btnPack}>
              <Link href="/signup">
                <button className="filled">
                  <p>Sign up</p>
                </button>
              </Link>
              <Link href="/login">
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
