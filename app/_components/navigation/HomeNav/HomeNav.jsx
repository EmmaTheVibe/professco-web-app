"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeNav.module.css";
import SearchBar from "@/app/_components/navigation/SearchBar/SearchBar";
import Drawer from "@/app/_components/navigation/Drawer/Drawer";
import ProfileMenu from "@/app/_components/navigation/ProfileMenu/ProfileMenu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/app/_utils/auth-store";
import useCartStore from "@/app/_utils/cart-store";
import { logout as logoutService } from "@/app/_lib/auth-service";

const studentTabs = [
  { label: "Home", href: "/student" },
  { label: "My courses", href: "/student/my-courses" },
];

export default function HomeNav() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuWrapperRef = useRef(null);
  const desktopMenuWrapperRef = useRef(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const cart = useCartStore((state) => state.cart);
  const pathname = usePathname();
  const router = useRouter();

  const fullName = `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim();

  const handleLogout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Logout error:", error);
    }
    clearUser();
    setMenuOpen(false);

    if (pathname.startsWith("/student")) {
      router.push("/");
    }
  };

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event) {
      const clickedMobile = mobileMenuWrapperRef.current?.contains(
        event.target
      );
      const clickedDesktop = desktopMenuWrapperRef.current?.contains(
        event.target
      );
      if (!clickedMobile && !clickedDesktop) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const mobileProfileMenu = (
    <ProfileMenu
      user={user}
      onLogout={handleLogout}
      onNavigate={() => setMenuOpen(false)}
      showNavLinks
    />
  );

  const desktopProfileMenu = (
    <ProfileMenu
      user={user}
      onLogout={handleLogout}
      onNavigate={() => setMenuOpen(false)}
    />
  );

  return (
    <nav>
      {!isAuthenticated && (
        <Drawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
      )}
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.homenav}>
          {/* ===== Mobile (< 1000px) ===== */}
          <div className={styles.mobileNav}>
            <Link href="/">
              <img src="/images/logo.svg" alt="logo" className={styles.logo} />
            </Link>
            <div className={styles.frame}>
              <SearchBar />
            </div>
            {isAuthenticated ? (
              <div className={styles.menuWrapper} ref={mobileMenuWrapperRef}>
                <img
                  src="/images/menu.svg"
                  alt="menu"
                  onClick={() => setMenuOpen((open) => !open)}
                />
                {menuOpen && mobileProfileMenu}
              </div>
            ) : (
              <img
                src="/images/menu.svg"
                alt="menu"
                onClick={() => setOpenDrawer((open) => !open)}
              />
            )}
          </div>

          {/* ===== Desktop (>= 1000px) ===== */}
          <div className={styles.desktopNav}>
            <div className={styles.frame}>
              {isAuthenticated ? (
                <Link href="/student">
                  <img
                    src="/images/logo-pc.svg"
                    alt="logo"
                    className={styles.logoPc}
                  />
                </Link>
              ) : (
                <SearchBar />
              )}
            </div>

            {isAuthenticated ? (
              <ul className={styles.studentTabs}>
                {studentTabs.map((tab) => {
                  const isActive =
                    tab.href === "/student"
                      ? pathname === "/student"
                      : pathname.startsWith(tab.href);
                  return (
                    <li key={tab.href}>
                      <Link
                        href={tab.href}
                        className={`semiboldFont ${styles.studentTab} ${
                          isActive ? styles.activeStudentTab : ""
                        }`}
                      >
                        {tab.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <Link href="/">
                <img
                  src="/images/logo-pc.svg"
                  alt="logo"
                  className={styles.logoPc}
                />
              </Link>
            )}

            <div className={styles.box}>
              {!isAuthenticated && (
                <div className={styles.txtBox}>
                  <p>Why Professco</p>
                  <p>Learn</p>
                </div>
              )}

              {isAuthenticated ? (
                <>
                  <Link href="/checkout" className={styles.cartLink}>
                    <img src="/images/nav-cart.svg" alt="cart" />
                    {cart.length > 0 && (
                      <span className={styles.cartBadge}>{cart.length}</span>
                    )}
                  </Link>
                  <Link
                    href="/student/notifications"
                    className={styles.bellLink}
                  >
                    <img src="/images/bell.svg" alt="notifications" />
                  </Link>
                  <div
                    className={styles.menuWrapper}
                    ref={desktopMenuWrapperRef}
                  >
                    <button
                      className={styles.profilePill}
                      onClick={() => setMenuOpen((open) => !open)}
                    >
                      <div className={styles.avatarGroup}>
                        <div className={styles.avatarBox}>
                          <img
                            src="/images/reviewavatar.svg"
                            alt="avatar"
                            className={styles.pillAvatar}
                          />
                        </div>
                        <div className={styles.online}>
                          <div className={styles.onlineInner}></div>
                        </div>
                      </div>

                      <p className={styles.pillName} title={fullName}>
                        {fullName}
                      </p>
                      <img src="/images/arrowdown.svg" alt="" />
                    </button>
                    {menuOpen && desktopProfileMenu}
                  </div>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
