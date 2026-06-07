/**
 * Add User Modal
 *
 * Placeholder version.
 *
 * Later:
 * - Image upload
 * - Validation
 * - Database integration
 */

function AddUserModal({
  onClose,
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,

        background:
          "rgba(0, 0, 0, 0.55)",

        backdropFilter: "blur(10px)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        zIndex: 1000,
      }}
    >
      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        style={{
          width: "420px",

          background:
            "rgba(255,255,255,0.06)",

          border:
            "1px solid rgba(255,255,255,0.12)",

          borderRadius: "28px",

          backdropFilter: "blur(20px)",

          padding: "32px",

          display: "flex",
          flexDirection: "column",

          gap: "16px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          Add User
        </h2>

        <input
          placeholder="Name"
        />

        <input
          placeholder="Surname"
        />

        <input
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>
          Upload Image
        </button>

        <button
          onClick={() =>
            console.log("Create User")
          }
        >
          Create User
        </button>
      </div>
    </div>
  );
}

export default AddUserModal;