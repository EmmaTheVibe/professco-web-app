"use client";

import { useState } from "react";
import styles from "./HomeNav.module.css";
import SearchBar from "@/app/_components/navigation/SearchBar/SearchBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@/app/_components/navigation/Drawer/Drawer";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/app/_utils/auth-store";
import useCartStore from "@/app/_utils/cart-store";
import { logout as logoutService } from "@/app/_lib/auth-service";

export default function HomeNav() {
  const lg = useMediaQuery("(min-width: 1000px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const clearUser = useAuthStore((state) => state.clearUser);
  const cart = useCartStore((state) => state.cart);
  const pathname = usePathname();
  const router = useRouter();

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

  const handleLogout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Logout error:", error);
    }
    clearUser();

    if (pathname.startsWith("/student")) {
      router.push("/");
    }
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
              {!isAuthenticated && (
                <div className={styles.txtBox}>
                  <p>Why Professco</p>
                  <p>Learn</p>
                </div>
              )}

              {!isLoading &&
                (isAuthenticated ? (
                  <>
                    <Link href="/checkout" className={styles.cartLink}>
                      <img src="/images/nav-cart.svg" alt="cart" />
                      {cart.length > 0 && (
                        <span className={styles.cartBadge}>{cart.length}</span>
                      )}
                    </Link>
                    <button className="outlined" onClick={handleLogout}>
                      <p>Logout</p>
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                ))}
            </div>
          ) : (
            <img src="/images/menu.svg" alt="menu" onClick={toggleDrawer} />
          )}
        </div>
      </div>
    </nav>
  );
}
