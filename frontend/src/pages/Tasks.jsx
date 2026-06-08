import MainLayout from "../layouts/MainLayout";

import TaskForm from "../components/TaskForm";
import ActiveTasks from "../components/ActiveTasks";
import CompletedTasks from "../components/CompletedTasks";
import TaskAnalytics from "../components/TaskAnalytics";

function Tasks() {
  return (
    <MainLayout>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        <TaskForm />

        <ActiveTasks />

        <CompletedTasks />

        <TaskAnalytics />
      </div>
    </MainLayout>
  );
}

export default Tasks;