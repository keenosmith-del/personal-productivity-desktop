import MainLayout from "../layouts/MainLayout";

import { useState } from "react";
import TaskModal from "../components/TaskModal";
import TaskOverview from "../components/TaskOverview";
import CompletedTasks from "../components/CompletedTasks";
import ActiveTasks from "../components/ActiveTasks";

function Tasks() {
  const [showTaskModal, setShowTaskModal] =
    useState(false);
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <TaskOverview
          onNewTask={() =>
            setShowTaskModal(true)
          }
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "24px",
          }}
        >
          <ActiveTasks />

          <CompletedTasks />
        </div>
      </div>
      {showTaskModal && (
        <TaskModal
          onClose={() =>
            setShowTaskModal(false)
          }
        />
      )}
    </MainLayout>
  );
}

export default Tasks;