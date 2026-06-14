import MainLayout from "../layouts/MainLayout";

import { useState } from "react";

import TaskModal from "../components/Tasks/TaskModal";
import CompletedTasks from "../components/Tasks/CompletedTasks";
import ActiveTasks from "../components/Tasks/ActiveTasks";
import TaskDetailsModal from "../components/Tasks/TaskDetailsModal";
import TaskStats from "../components/Tasks/TaskStats";
import TaskActivity from "../components/Tasks/TaskActivity";

import Toast from "../components/Toast";

import { initialTasks } from "../data/tasks";

function Tasks() {
  const [showTaskModal, setShowTaskModal] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [editingTask,
    setEditingTask] =
    useState(null);

  const [tasks, setTasks] =
    useState(initialTasks);

  const [toast, setToast] =
    useState("");

  const [lastCompletedTask,
    setLastCompletedTask] =
    useState(null);

  const [lastDeletedTask,
    setLastDeletedTask] =
    useState(null);

  const [completionTimeout,
    setCompletionTimeout] =
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
            tasks={tasks}
            setTasks={setTasks}
            toast={toast}
            setToast={setToast}
            setLastCompletedTask={
              setLastCompletedTask
            }
            setLastDeletedTask={
              setLastDeletedTask
            }
            onViewTask={setSelectedTask}
            onEditTask={setEditingTask}
            onNewTask={() =>
              setShowTaskModal(true)
            }
            completionTimeout={completionTimeout}
            setCompletionTimeout={setCompletionTimeout}
          />

          <CompletedTasks
            tasks={tasks}
            setTasks={setTasks}
          />

          <TaskStats />

          <TaskActivity />
        </div>
      </div>
      {showTaskModal && (
        <TaskModal
          onClose={() =>
            setShowTaskModal(false)
          }
          onSave={(newTask) => {
            setTasks((prev) => [
              newTask,
              ...prev,
            ]);

            setToast(
              "Task created"
            );

            setTimeout(() => {
              setToast("");
            }, 3000);
          }}
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
          onSave={(updatedTask) => {
            setTasks((prev) =>
              prev.map((task) =>
                task.id ===
                  updatedTask.id
                  ? updatedTask
                  : task
              )
            );

            setToast(
              "Task updated"
            );

            setTimeout(() => {
              setToast("");
            }, 3000);

            setEditingTask(null);
          }}
        />
      )}
      <Toast
        message={toast}
        actionLabel={
          lastCompletedTask ||
            lastDeletedTask
            ? "Undo"
            : null
        }
        onAction={() => {
          if (lastDeletedTask) {
            setTasks((prev) => [
              lastDeletedTask,
              ...prev,
            ]);

            setLastDeletedTask(
              null
            );

            setToast("");

            return;
          }

          if (completionTimeout) {
            clearTimeout(
              completionTimeout
            );

            setCompletionTimeout(
              null
            );
          }

          if (!lastCompletedTask)
            return;

          setTasks((prev) =>
            prev.map((task) =>
              task.id ===
                lastCompletedTask.id
                ? {
                  ...task,
                  completed: false,
                  pendingCompletion: false,
                }
                : task
            )
          );

          setToast("");

          setLastCompletedTask(
            null
          );

          setLastDeletedTask(
            null
          );
        }}
      />
    </MainLayout>
  );
}

export default Tasks;