import MainLayout from "../layouts/MainLayout";

import {
  useState,
  useEffect,
} from "react";

import {
  getCurrentUser,
  updatePreferences,
} from "../services/authService";

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

  const [
    preferences,
    setPreferences,
  ] = useState(null);

  //FUNCTIONS
  const loadPreferences =
    async () => {
      try {
        const user =
          await getCurrentUser();

        setPreferences(user);

      } catch (error) {
        console.error(error);
      }
    };

  const savePreferences =
    async (updates) => {
      try {
        const updatedUser =
          await updatePreferences(
            updates
          );

        setPreferences(
          updatedUser
        );

      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadPreferences();
  }, []);

  useEffect(() => {
    if (!preferences?.theme) {
      return;
    }

    if (
      preferences.theme ===
      "Light"
    ) {
      document.documentElement.setAttribute(
        "data-theme",
        "light"
      );
    } else {
      document.documentElement.removeAttribute(
        "data-theme"
      );
    }
  }, [preferences]);
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <AppearanceSettings
          preferences={preferences}
          savePreferences={
            savePreferences
          }
        />

        <NotificationSettings
          preferences={preferences}
          savePreferences={
            savePreferences
          }
        />

        <ProductivityPreferences
          preferences={preferences}
          savePreferences={
            savePreferences
          }
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
          preferences={preferences}
          savePreferences={
            savePreferences
          }
          onClose={() =>
            setShowWorkingHoursModal(
              false
            )
          }
        />
      )}

      {showReminderModal && (
        <DefaultReminderModal
          preferences={preferences}
          savePreferences={
            savePreferences
          }
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