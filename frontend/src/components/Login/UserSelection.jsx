/**
 * User selection screen.
 *
 * Displays:
 * - Existing users
 * - Add User button (which opened up current AddUserModal)
 */

import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { getUsers } from "../../services/authService";

function UserSelection({
  onUserSelect,
  onAddUser,
}) {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchUsers = async () => {
    try {
      const data =
        await getUsers();

      const formattedUsers =
        data.map((user) => ({
          ...user,

          initials: user.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase(),
        }));

      setUsers(formattedUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <p
        style={{
          color:
            "var(--text-secondary)",
        }}
      >
        Loading users...
      </p>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "48px",
        flexWrap: "wrap",
      }}
    >
      {users.map((user) => (
        <UserCard
          key={user._id}
          name={user.name}
          initials={user.initials}
          avatar={user.avatar}
          onClick={() => onUserSelect(user)}
        />
      ))}

      <UserCard
        isAddUser={true}
        onClick={onAddUser}
      />
    </div>
  );
}

export default UserSelection;