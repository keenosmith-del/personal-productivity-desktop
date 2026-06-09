import MainLayout from "../layouts/MainLayout";

import CreateNote from "../components/CreateNote";
import RecentNotes from "../components/RecentNotes";
import PinnedNotes from "../components/PinnedNotes";

function Notes() {
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <CreateNote />

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "1.5fr 1fr",

            gap: "24px",
          }}
        >
          <RecentNotes />

          <PinnedNotes />
        </div>
      </div>
    </MainLayout>
  );
}

export default Notes;