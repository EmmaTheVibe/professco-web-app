"use client";

import { useState } from "react";
import Footer from "@/app/_components/layout/Footer/Footer";
import AccountSettingsTabs from "@/app/_components/student/AccountSettings/AccountSettingsTabs";
import ProfileSettingsTab from "@/app/_components/student/AccountSettings/ProfileSettingsTab";
import NotificationsTab from "@/app/_components/student/AccountSettings/NotificationsTab";
import SecuritySettingsTab from "@/app/_components/student/AccountSettings/SecuritySettingsTab";
import styles from "./SettingsPage.module.css";

const TABS = ["Profile settings", "Notifications", "Security settings"];

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <section className={styles.home}>
      <div className={`container ${styles.wrapper}`}>
        <h1 className={`boldFont ${styles.title}`}>Account settings</h1>
        <p className={styles.desc}>
          Manage your profile, notifications and security preferences
        </p>

        <AccountSettingsTabs
          tabs={TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === "Profile settings" && <ProfileSettingsTab />}
        {activeTab === "Notifications" && <NotificationsTab />}
        {activeTab === "Security settings" && <SecuritySettingsTab />}
      </div>

      <Footer showFull={false} />
    </section>
  );
}
