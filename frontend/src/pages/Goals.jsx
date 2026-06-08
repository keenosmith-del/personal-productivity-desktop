import MainLayout from "../layouts/MainLayout";

import GoalOverview from "../components/GoalOverview";
import ActiveGoals from "../components/ActiveGoals";
import GoalAnalytics from "../components/GoalAnalytics";

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

          <GoalAnalytics />
        </div>
      </div>
    </MainLayout>
  );
}

export default Goals;