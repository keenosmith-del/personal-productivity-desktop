const API_BASE_URL =
  "http://localhost:5050";

function UserCard({
  name,
  initials,
  avatar,
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
        transition: "all 0.25s ease",
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

          background: "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

          border: "1px solid rgba(255,255,255,0.12)",

          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",

          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",

          fontSize: "1.8rem",
          fontWeight: isAddUser ? "200" : "300",

          color: "var(--text-primary)",

          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-2px) scale(1.02)";

          e.currentTarget.style.border =
            "1px solid rgba(255,255,255,0.20)";

          e.currentTarget.style.boxShadow =
            "0 10px 30px rgba(255,255,255,0.08)";
        }}

        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0) scale(1)";

          e.currentTarget.style.border =
            "1px solid rgba(255,255,255,0.12)";

          e.currentTarget.style.boxShadow =
            "0 16px 40px rgba(0,0,0,0.45)";
        }}
      >
        {isAddUser ? (
          "+"
        ) : avatar ? (
          <img
            src={`${API_BASE_URL}${avatar}`}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : (
          initials
        )}
      </div>

      <p
        style={{
          marginTop: "14px",
          color: "var(--text-primary)",
          fontSize: "1rem",
          fontWeight: "300",
          // opacity: 0.85,
        }}
      >
        {isAddUser ? "Add User" : name}
      </p>
    </div>
  );
}

export default UserCard;