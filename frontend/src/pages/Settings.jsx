import MainLayout from "../layouts/MainLayout";

import {
  useState,
  useEffect,
} from "react";

import {
  getCurrentUser,
  updatePreferences,
  clearAllData,
  deleteAccount,
} from "../services/authService";

import EditProfileModal from "../components/Settings/EditProfileModal";
import ChangePasswordModal from "../components/Settings/ChangePasswordModal";
import ConfirmationModal from "../components/Settings/ConfirmationModal";

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

  const [
    showEditProfileModal,
    setShowEditProfileModal,
  ] = useState(false);

  const [
    showPasswordModal,
    setShowPasswordModal,
  ] = useState(false);

  const [
    confirmationConfig,
    setConfirmationConfig,
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

        <AccountSettings
          onEditProfile={() =>
            setShowEditProfileModal(true)
          }
          onChangePassword={() =>
            setShowPasswordModal(true)
          }
          onClearData={() =>
            setConfirmationConfig({
              title: "Clear All Data",
              message:
                "This will permanently remove all projects, tasks, goals, notes and reminders.",
              confirmText:
                "Clear Data",
              action: "clear",
            })
          }
          onDeleteAccount={() =>
            setConfirmationConfig({
              title:
                "Delete Account",
              message:
                "This will permanently delete your account and all associated data.",
              confirmText:
                "Delete Account",
              action: "delete",
            })
          }
        />

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
      {showEditProfileModal && (
        <EditProfileModal
          user={preferences}
          onClose={() =>
            setShowEditProfileModal(false)
          }
          onSaved={loadPreferences}
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() =>
            setShowPasswordModal(
              false
            )
          }
        />
      )
      }
      {confirmationConfig && (
        <ConfirmationModal
          title={
            confirmationConfig.title
          }
          message={
            confirmationConfig.message
          }
          confirmText={
            confirmationConfig.confirmText
          }
          onConfirm={async () => {
            try {
              if (
                confirmationConfig.action ===
                "clear"
              ) {
                await clearAllData();

                await loadPreferences();
              }

              if (
                confirmationConfig.action ===
                "delete"
              ) {
                await deleteAccount();

                localStorage.removeItem(
                  "token"
                );

                window.location.href = "/";
              }

              setConfirmationConfig(
                null
              );

            } catch (error) {
              console.error(error);
            }
          }}
          onClose={() =>
            setConfirmationConfig(
              null
            )
          }
        />
      )}
    </MainLayout>
  );
}

export default Settings;