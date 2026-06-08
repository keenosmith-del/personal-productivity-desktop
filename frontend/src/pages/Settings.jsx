import MainLayout from "../layouts/MainLayout";

import AppearanceSettings from "../components/AppearanceSettings";
import NotificationSettings from "../components/NotificationSettings";
import ProductivityPreferences from "../components/ProductivityPreferences";
import AccountSettings from "../components/AccountSettings";

function Settings() {
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <AppearanceSettings />

        <NotificationSettings />

        <ProductivityPreferences />

        <AccountSettings />
      </div>
    </MainLayout>
  );
}

export default Settings;