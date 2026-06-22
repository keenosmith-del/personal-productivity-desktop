import GlassCard from "../GlassCard";

function ProductivityStats({
  tasks = [],
  goals = [],
  projects = [],
}) {
  const completedTasks =
    tasks.filter(
      (task) => task.completed
    );

  const highTasks =
    completedTasks.filter(
      (task) =>
        task.priority === "High"
    ).length;

  const mediumTasks =
    completedTasks.filter(
      (task) =>
        task.priority === "Medium"
    ).length;

  const lowTasks =
    completedTasks.filter(
      (task) =>
        task.priority === "Low"
    ).length;

  const completedGoals =
    goals.filter(
      (goal) => goal.completed
    );

  const workGoals =
    completedGoals.filter(
      (goal) =>
        goal.category === "Work"
    ).length;

  const studyGoals =
    completedGoals.filter(
      (goal) =>
        goal.category === "Study"
    ).length;

  const personalGoals =
    completedGoals.filter(
      (goal) =>
        goal.category ===
        "Personal"
    ).length;

  const activeProjects =
    projects.filter(
      (project) =>
        project.status ===
        "Active"
    ).length;

  const completedProjects =
    projects.filter(
      (project) =>
        project.completed
    ).length;

  const archivedProjects =
    projects.filter(
      (project) =>
        project.status ===
        "Archived"
    ).length;

  const totalItems =
    tasks.length +
    goals.length +
    projects.length;

  const completedItems =
    completedTasks.length +
    completedGoals.length +
    completedProjects;

  const productivityScore =
    totalItems > 0
      ? Math.round(
        (
          completedItems /
          totalItems
        ) * 100
      )
      : 0;

  const taskRate =
    tasks.length > 0
      ? Math.round(
        (
          completedTasks.length /
          tasks.length
        ) * 100
      )
      : 0;

  const goalRate =
    goals.length > 0
      ? Math.round(
        (
          completedGoals.length /
          goals.length
        ) * 100
      )
      : 0;

  const projectRate =
    projects.length > 0
      ? Math.round(
        (
          completedProjects /
          projects.length
        ) * 100
      )
      : 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(2, 1fr)",
        gap: "24px",
      }}
    >
      {/* TASKS */}
      <GlassCard minHeight="260px">
        <h3
          style={{
            marginBottom: "20px",
            fontWeight: "400",
          }}
        >
          Tasks Completed
        </h3>

        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "32px",
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
            High {highTasks}
          </span>

          <span
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              background: "#4d689333",
              border: "1px solid #4d689366",
            }}
          >
            Medium {mediumTasks}
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
            Low {lowTasks}
          </span>
        </div>

        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "400",
            letterSpacing: "-0.03em",
            marginBottom: "8px",
          }}
        >
          {completedTasks.length}
        </h1>

        <div
          style={{
            height: "8px",
            borderRadius: "999px",
            background:
              "rgba(255,255,255,0.08)",
            overflow: "hidden",
            marginBottom: "12px",
            marginTop: "12px",
          }}
        >
          <div
            style={{
              width: `${taskRate}%`,
              height: "100%",
              background: "#72715c",
              borderRadius: "999px",
            }}
          />
        </div>

        <p
          style={{
            color: "var(--text-secondary)",
            fontWeight: "300",
          }}
        >
          Completed Tasks
        </p>
      </GlassCard>

      {/* GOALS */}
      <GlassCard minHeight="260px">
        <h3
          style={{
            marginBottom: "20px",
            fontWeight: "400",
          }}
        >
          Goals Achieved
        </h3>

        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              background: "#063f4733",
              border:
                "1px solid #063f4766",
            }}
          >
            Work {workGoals}
          </span>

          <span
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              background: "#29737633",
              border:
                "1px solid #29737666",
            }}
          >
            Study {studyGoals}
          </span>

          <span
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              background: "#5c939633",
              border:
                "1px solid #5c939666",
            }}
          >
            Personal {personalGoals}
          </span>
        </div>

        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "400",
            letterSpacing: "-0.03em",
            marginBottom: "8px",
          }}
        >
          {completedGoals.length}
        </h1>

        <div
          style={{
            height: "8px",
            borderRadius: "999px",
            background:
              "rgba(255,255,255,0.08)",
            overflow: "hidden",
            marginBottom: "12px",
            marginTop: "12px",
          }}
        >
          <div
            style={{
              width: `${goalRate}%`,
              height: "100%",
              background: "#c59c70",
              borderRadius: "999px",
            }}
          />
        </div>

        <p
          style={{
            color:
              "var(--text-secondary)",
            fontWeight: "300",
          }}
        >
          Goals Completed
        </p>
      </GlassCard>

      {/* PROJECTS */}
      <GlassCard minHeight="260px">
        <h3
          style={{
            marginBottom: "20px",
            fontWeight: "400",
          }}
        >
          Projects Finished
        </h3>

        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              background: "#52677d33",
              border:
                "1px solid #52677d66",
            }}
          >
            Active {activeProjects}
          </span>

          <span
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              background: "#72715c33",
              border:
                "1px solid #72715c66",
            }}
          >
            Completed {completedProjects}
          </span>

          <span
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              background: "#854c4933",
              border:
                "1px solid #854c4966",
            }}
          >
            Archived {archivedProjects}
          </span>
        </div>

        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "400",
            letterSpacing: "-0.03em",
            marginBottom: "8px",
          }}
        >
          {completedProjects}
        </h1>

        <div
          style={{
            height: "8px",
            borderRadius: "999px",
            background:
              "rgba(255,255,255,0.08)",
            overflow: "hidden",
            marginBottom: "12px",
            marginTop: "12px",
          }}
        >
          <div
            style={{
              width: `${projectRate}%`,
              height: "100%",
              background: "#854c49",
              borderRadius: "999px",
            }}
          />
        </div>

        <p
          style={{
            color:
              "var(--text-secondary)",
            fontWeight: "300",
          }}
        >
          Completed Projects
        </p>
      </GlassCard>

      {/* PRODUCTIVITY */}
      <GlassCard minHeight="260px">
        <h3
          style={{
            marginBottom: "20px",
            fontWeight: "400",
          }}
        >
          Completion Rate
        </h3>

        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              background: "#72715c33",
              border:
                "1px solid #72715c66",
            }}
          >
            Tasks {taskRate}%
          </span>

          <span
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              background: "#c59c7033",
              border:
                "1px solid #c59c7066",
            }}
          >
            Goals {goalRate}%
          </span>

          <span
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              background: "#854c4933",
              border:
                "1px solid #854c4966",
            }}
          >
            Projects {projectRate}%
          </span>
        </div>

        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "400",
            letterSpacing: "-0.03em",
            marginBottom: "12px",
          }}
        >
          {productivityScore}%
        </h1>

        <div
          style={{
            height: "8px",
            borderRadius: "999px",
            background:
              "rgba(255,255,255,0.08)",
            overflow: "hidden",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: `${productivityScore}%`,
              height: "100%",
              background:
                "#c59c70",
              borderRadius:
                "999px",
            }}
          />
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
      </GlassCard>
    </div>
  );
}

export default ProductivityStats;