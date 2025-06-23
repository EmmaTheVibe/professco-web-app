"use client";

import { useState } from "react";
import styles from "./HomeNav.module.css";
import SearchBar from "@/app/_components/SearchBar/SearchBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "../Drawer/Drawer";
import Link from "next/link";

export default function HomeNav() {
  const lg = useMediaQuery("(min-width: 1000px)");
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (event) => {
    if (
      lg ||
      (event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift"))
    ) {
      return;
    }

    setOpenDrawer(!openDrawer);
  };
  return (
    <nav>
      {!lg && (
        <Drawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          toggleDrawer={toggleDrawer}
        />
      )}
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.homenav}>
          {!lg && (
            <Link href="/">
              <img src="/images/logo.svg" alt="logo" className={styles.logo} />
            </Link>
          )}
          <div className={styles.frame}>
            <SearchBar />
          </div>
          {lg && (
            <Link href="/">
              <img
                src="/images/logo-pc.svg"
                alt="logo"
                className={styles.logoPc}
              />
            </Link>
          )}
          {lg ? (
            <div className={styles.box}>
              <div className={styles.txtBox}>
                <p>Why Professco</p>
                <p>Learn</p>
              </div>
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
          ) : (
            <img src="/images/menu.svg" alt="menu" onClick={toggleDrawer} />
          )}
        </div>
      </div>
    </nav>
  );
}
