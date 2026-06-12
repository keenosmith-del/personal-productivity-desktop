import MainLayout from "../layouts/MainLayout";

import { useState } from "react";

import GoalDetailsModal from "../components/Goals/GoalDetailsModal";
import GoalModal from "../components/Goals/GoalModal";
import GoalOverview from "../components/Goals/GoalOverview";
import ActiveGoals from "../components/Goals/ActiveGoals";
import CompletedGoals from "../components/Goals/CompletedGoals";

function Goals() {
  const [selectedGoal, setSelectedGoal] =
    useState(null);

  const [showGoalModal, setShowGoalModal] =
    useState(false);

  const [editingGoal, setEditingGoal] =
    useState(null);
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
          <ActiveGoals
            onViewGoal={setSelectedGoal}
            onEditGoal={setEditingGoal}
            onNewGoal={() =>
              setShowGoalModal(true)
            }
          />

          <CompletedGoals />
        </div>
      </div>
      {selectedGoal && (
        <GoalDetailsModal
          goal={selectedGoal}
          onClose={() =>
            setSelectedGoal(null)
          }
        />
      )}
      {showGoalModal && (
        <GoalModal
          onClose={() =>
            setShowGoalModal(false)
          }
        />
      )}
      {editingGoal && (
        <GoalModal
          mode="edit"
          goal={editingGoal}
          onClose={() =>
            setEditingGoal(null)
          }
        />
      )}
    </MainLayout>
  );
}

export default Goals;