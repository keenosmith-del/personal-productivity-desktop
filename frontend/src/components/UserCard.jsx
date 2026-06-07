/**
 * UserCard Component
 *
 * Used on Login page.
 *
 * Supports:
 * - Normal users
 * - Add User card
 *
 * Future:
 * - Profile images
 * - User status
 * - Online indicators
 */

function UserCard({
  name,
  initials,
  isAddUser = false,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        transition: "transform 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <div
        style={{
          width: "120px",
          height: "120px",

          borderRadius: "50%",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          background:
            "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

          border:
            "1px solid rgba(255,255,255,0.12)",

          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",

          boxShadow:
            "0 8px 32px rgba(0,0,0,0.35)",

          fontSize: "2rem",
          fontWeight: "600",

          color: "var(--text-primary)",
        }}
      >
        {isAddUser ? "+" : initials}
      </div>

      <p
        style={{
          marginTop: "14px",
          color: "var(--text-primary)",
          fontSize: "0.95rem",
          fontWeight: "500",
        }}
      >
        {isAddUser ? "Add User" : name}
      </p>
    </div>
  );
}

export default UserCard;