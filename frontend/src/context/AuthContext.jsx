import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({
    children,
}) {
    const [user, setUser] = useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        async function loadUser() {
            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token) {
                setLoading(false);

                return;
            }

            try {
                const currentUser =
                    await getCurrentUser();

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        currentUser
                    )
                );

                setUser(
                    currentUser
                );

            } catch (error) {
                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );

                setUser(null);
            }

            setLoading(false);
        }

        loadUser();

    }, []);

    const login = (
        userData,
        token
    ) => {
        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        setUser(null);
    };

    const refreshUser = async () => {
        try {
            const currentUser =
                await getCurrentUser();

            localStorage.setItem(
                "user",
                JSON.stringify(
                    currentUser
                )
            );

            setUser(currentUser);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(
        AuthContext
    );
}