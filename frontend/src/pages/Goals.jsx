import MainLayout from "../layouts/MainLayout";

import GoalOverview from "../components/GoalOverview";
import ActiveGoals from "../components/ActiveGoals";
import CompletedGoals from "../components/CompletedGoals";

function Goals() {
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <GoalOverview />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",

            gap: "24px",
          }}
        >
          <ActiveGoals />

          <CompletedGoals />
        </div>
      </div>
    </MainLayout>
  );
}

export default Goals;