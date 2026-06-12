/**
 * User selection screen.
 *
 * Displays:
 * - Existing users
 * - Add User button
 */

import UserCard from "./UserCard";
import users from "/Users/keenosmith/Programming/Projects/Project 1/personal-productivity-desktop/frontend/src/data/users.js";

function UserSelection({
  onUserSelect,
  onAddUser,
}) {
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
          key={user.id}
          name={user.name}
          initials={user.initials}
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