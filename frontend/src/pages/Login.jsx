
import { useState } from "react";

import UserSelection from "../components/Login/UserSelection";
import PasswordView from "../components/Login/PasswordView";
import AddUserModal from "../components/Login/AddUserModal";

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

    if (selectedUser) {
        return (
            <PasswordView
                user={selectedUser}
                onBack={() =>
                    setSelectedUser(null)
                }
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
                onUserSelect={handleUserSelect}
                onAddUser={handleAddUser}
            />

            {showModal && (
                <AddUserModal
                    onClose={() =>
                        setShowModal(false)
                    }
                />
            )}
        </div>
    );
}

export default Login;