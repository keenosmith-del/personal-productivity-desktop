
import { useState } from "react";

import UserSelection from "../components/Login/UserSelection";
import PasswordView from "../components/Login/PasswordView";
import AddUserModal from "../components/Login/AddUserModal";

import Toast from "../components/Toast";

function Login() {
    const [selectedUser, setSelectedUser] =
        useState(null);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const [showModal, setShowModal] =
        useState(false);

    const handleAddUser = () => {
        setShowModal(true);
    };

    const [toast, setToast] =
        useState("");

    const [refreshUsers, setRefreshUsers] =
        useState(false);

    if (selectedUser) {
        return (
            <PasswordView
                user={selectedUser}
                onBack={(message) => {
                    setSelectedUser(null);

                    if (message) {
                        setToast(message);

                        setTimeout(() => {
                            setToast("");
                        }, 3000);
                    }
                }}
            />
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                padding: "32px",
            }}
        >
            <UserSelection
                key={refreshUsers}
                onUserSelect={handleUserSelect}
                onAddUser={handleAddUser}
            />

            {showModal && (
                <AddUserModal
                    onClose={(refresh) => {
                        setShowModal(false);

                        if (refresh) {
                            setRefreshUsers(
                                (prev) => !prev
                            );
                        }
                    }}

                    setToast={setToast}
                />
            )}
            <Toast
                message={toast}
            />
        </div>
    );
}

export default Login;