import MainLayout from "../layouts/MainLayout";

import { useState } from "react";

import TaskModal from "../components/Tasks/TaskModal";
import CompletedTasks from "../components/Tasks/CompletedTasks";
import ActiveTasks from "../components/Tasks/ActiveTasks";
import TaskDetailsModal from "../components/Tasks/TaskDetailsModal";
import TaskStats from "../components/Tasks/TaskStats";
import TaskActivity from "../components/Tasks/TaskActivity";

function Tasks() {
  const [showTaskModal, setShowTaskModal] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [editingTask, setEditingTask] =
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "24px",
          }}
        >
          <ActiveTasks
            onViewTask={setSelectedTask}
            onEditTask={setEditingTask}
            onNewTask={() =>
              setShowTaskModal(true)
            }
          />

          <CompletedTasks />

          <TaskStats />

          <TaskActivity />
        </div>
      </div>
      {showTaskModal && (
        <TaskModal
          onClose={() =>
            setShowTaskModal(false)
          }
        />
      )}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() =>
            setSelectedTask(null)
          }
        />
      )}
      {editingTask && (
        <TaskModal
          mode="edit"
          task={editingTask}
          onClose={() =>
            setEditingTask(null)
          }
        />
      )}
    </MainLayout>
  );
}

export default Tasks;