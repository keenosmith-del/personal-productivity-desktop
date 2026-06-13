import GlassCard from "../GlassCard";

function ProductivityStats() {
  return (
    <GlassCard minHeight="300px">
      <h2
        style={{
          marginBottom: "32px",
          fontWeight: "400",
        }}
      >
        Productivity Statistics
      </h2>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(4, 1fr)",

          gap: "24px",
        }}
      >
        <div
          style={{
            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "999px",
                fontSize: "0.68rem",
                background: "#ab313033",
                border: "1px solid #ab313066",
              }}
            >
              High 12
            </span>

            <span
              style={{
                padding: "4px 8px",
                borderRadius: "999px",
                fontSize: "0.68rem",
                background: "#62929e33",
                border: "1px solid #62929e66",
              }}
            >
              Medium 21
            </span>

            <span
              style={{
                padding: "4px 8px",
                borderRadius: "999px",
                fontSize: "0.68rem",
                background: "#ffdb5833",
                border: "1px solid #ffdb5866",
              }}
            >
              Low 15
            </span>
          </div>

          <p
            style={{
              color:
                "var(--text-secondary)",

              fontWeight: "300",
            }}
          >
            Tasks Completed
          </p>

          <h2
            style={{
              fontWeight: "400",
            }}
          >
            48
          </h2>
        </div>

        <div
          style={{
            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "999px",
                fontSize: "0.68rem",
                background: "#063f4733",
                border: "1px solid #063f4766",
              }}
            >
              Work 4
            </span>

            <span
              style={{
                padding: "4px 8px",
                borderRadius: "999px",
                fontSize: "0.68rem",
                background: "#29737633",
                border: "1px solid #29737666",
              }}
            >
              Study 5
            </span>

            <span
              style={{
                padding: "4px 8px",
                borderRadius: "999px",
                fontSize: "0.68rem",
                background: "#5c939633",
                border: "1px solid #5c939666",
              }}
            >
              Personal 3
            </span>
          </div>

          <p
            style={{
              color:
                "var(--text-secondary)",

              fontWeight: "300",
            }}
          >
            Goals Achieved
          </p>

          <h2
            style={{
              fontWeight: "400",
            }}
          >
            12
          </h2>
        </div>

        <div
          style={{
            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            gap: "12px",
          }}
        >
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              background: "#e9b95733",
              border: "1px solid #e9b95766",
            }}
          >
            Best 21 Days
          </span>

          <p
            style={{
              color:
                "var(--text-secondary)",

              fontWeight: "300",
            }}
          >
            Current Streak
          </p>

          <h2
            style={{
              fontWeight: "400",
            }}
          >
            14
          </h2>
        </div>

        <div
          style={{
            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            gap: "12px",
          }}
        >
          <div
            style={{
              width: "140px",
            }}
          >
            <div
              style={{
                height: "8px",

                borderRadius: "999px",

                background:
                  "rgba(255,255,255,0.08)",

                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "82%",

                  height: "100%",

                  background: "#c59c70",

                  borderRadius: "999px",
                }}
              />
            </div>
          </div>

          <p
            style={{
              color:
                "var(--text-secondary)",

              fontWeight: "300",
            }}
          >
            Productivity Score
          </p>

          <h2
            style={{
              fontWeight: "400",
            }}
          >
            82
          </h2>
        </div>
      </div>
    </GlassCard>
  );
}

export default ProductivityStats;