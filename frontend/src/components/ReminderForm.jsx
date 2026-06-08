import { useState } from "react";

import GlassCard from "./GlassCard";
import GlassInput from "./GlassInput";
import PrimaryButton from "./PrimaryButton";
import SegmentedControl from "./SegmentedControl";

function ReminderForm() {
  const [category, setCategory] =
    useState("Work");

  return (
    <GlassCard>
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Create Reminder
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <GlassInput
          placeholder="Reminder title"
        />

        <input
          type="date"
          style={{
            background:
              "rgba(255,255,255,0.04)",

            border:
              "1px solid var(--glass-border)",

            borderRadius: "12px",

            padding: "12px 16px",

            color:
              "var(--text-primary)",

            outline: "none",
          }}
        />

        <div>
          <p
            style={{
              marginBottom: "8px",

              color:
                "var(--text-secondary)",

              fontSize: "0.9rem",
            }}
          >
            Category
          </p>

          <SegmentedControl
            options={[
              "Work",
              "Study",
              "Personal",
              "Health",
            ]}
            selected={category}
            onSelect={setCategory}
          />
        </div>

        <div
          style={{
            display: "flex",

            justifyContent:
              "flex-end",
          }}
        >
          <PrimaryButton>
            Create Reminder
          </PrimaryButton>
        </div>
      </div>
    </GlassCard>
  );
}

export default ReminderForm;