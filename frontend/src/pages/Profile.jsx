import MainLayout from "../layouts/MainLayout";

import ProfileDetails from "../components/Profile/ProfileDetails";
import ProductivityStats from "../components/Profile/ProductivityStats";

function Profile() {
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <ProfileDetails />

        <ProductivityStats />
      </div>
    </MainLayout>
  );
}

export default Profile;