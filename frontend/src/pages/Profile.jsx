import MainLayout from "../layouts/MainLayout";

import ProfileDetails from "../components/Profile/ProfileDetails";
import ProductivityStats from "../components/Profile/ProductivityStats";

import {
  getProjects,
} from "../services/projectService";

import {
  getTasks,
} from "../services/taskService";

import {
  getGoals,
} from "../services/goalService";

import {
  getNotes,
} from "../services/noteService";

import {
  useState,
  useEffect,
} from "react";

import {
  getCurrentUser,
} from "../services/authService";

function Profile() {
  const [
    user,
    setUser,
  ] = useState(null);

  const [
    counts,
    setCounts,
  ] = useState({
    tasks: 0,
    goals: 0,
    projects: 0,
    notes: 0,
  });

  const [
    profileData,
    setProfileData,
  ] = useState({
    tasks: [],
    goals: [],
    projects: [],
  });

  const loadUser =
    async () => {
      try {
        const userData =
          await getCurrentUser();

        setUser(userData);

      } catch (error) {
        console.error(error);
      }
    };

  const loadCounts =
    async () => {
      try {
        const [
          projects,
          tasks,
          goals,
          notes,
        ] = await Promise.all([
          getProjects(),
          getTasks(),
          getGoals(),
          getNotes(),
        ]);

        setCounts({
          tasks:
            tasks.length,

          goals:
            goals.length,

          projects:
            projects.length,

          notes:
            notes.length,
        });

        setProfileData({
          tasks,
          goals,
          projects,
        });

      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadUser();
    loadCounts();
  }, []);
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <ProfileDetails
          user={user}
          counts={counts}
        />

        <ProductivityStats
          tasks={
            profileData.tasks
          }
          goals={
            profileData.goals
          }
          projects={
            profileData.projects
          }
        />
      </div>
    </MainLayout>
  );
}

export default Profile;