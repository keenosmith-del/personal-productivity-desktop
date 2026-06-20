import MainLayout from "../layouts/MainLayout";

import { useState } from "react";

import WorkingHoursModal from "../components/Settings/WorkingHoursModal";
import DefaultReminderModal from "../components/Settings/DefaultReminderModal";
import AppearanceSettings from "../components/Settings/AppearanceSettings";
import NotificationSettings from "../components/Settings/NotificationSettings";
import ProductivityPreferences from "../components/Settings/ProductivityPreferences";
import AccountSettings from "../components/Settings/AccountSettings";

function Settings() {
  // COMPONENT STATES
  const [
    showWorkingHoursModal,
    setShowWorkingHoursModal,
  ] = useState(false);

  const [
    showReminderModal,
    setShowReminderModal,
  ] = useState(false);

  //FUNCTIONS
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

        <ProductivityPreferences
          onWorkingHoursClick={() =>
            setShowWorkingHoursModal(true)
          }
          onReminderClick={() =>
            setShowReminderModal(true)
          }
        />

        <AccountSettings />
        
      </div>
      {showWorkingHoursModal && (
        <WorkingHoursModal
          onClose={() =>
            setShowWorkingHoursModal(
              false
            )
          }
        />
      )}

      {showReminderModal && (
        <DefaultReminderModal
          onClose={() =>
            setShowReminderModal(
              false
            )
          }
        />
      )}
    </MainLayout>

  );
}

export default Settings;