import {
  X,
} from "lucide-react";

import {
  useRef,
  useEffect,
} from "react";

function TaskModal({
  onClose,
}) {
  const inputStyle = {
    width: "100%",

    padding: "14px 18px",

    background:
      "rgba(255,255,255,0.05)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "16px",

    color:
      "var(--text-primary)",

    fontSize: "0.95rem",

    outline: "none",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,

        background:
          "rgba(0,0,0,0.55)",

        backdropFilter:
          "blur(12px)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        style={{
          width: "550px",

          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

          border:
            "1px solid rgba(255,255,255,0.10)",

          borderRadius: "32px",

          backdropFilter:
            "blur(30px)",

          boxShadow:
            "0 20px 60px rgba(0,0,0,0.35)",

          padding: "36px",

          display: "flex",

          flexDirection: "column",

          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontWeight: "400",
            }}
          >
            New Task
          </h2>

          <X
            size={18}
            strokeWidth={1.5}
            style={{
              cursor: "pointer",
            }}
            onClick={onClose}
          />
        </div>

        <input
          placeholder="Task name"
          style={inputStyle}
        />

        <textarea
          rows={5}
          placeholder="Description"
          style={{
            ...inputStyle,

            resize: "none",

            fontFamily:
              "inherit",
          }}
        />

        <input
          type="date"
          style={inputStyle}
        />

        <button
          style={{
            padding: "14px",

            background:
              "var(--glass-bg)",

            border:
              "1px solid var(--glass-border)",

            borderRadius: "16px",

            color:
              "var(--text-primary)",

            cursor: "pointer",

            fontWeight: "400",
          }}
        >
          Create Task
        </button>
      </div>
    </div>
  );
}

export default TaskModal;