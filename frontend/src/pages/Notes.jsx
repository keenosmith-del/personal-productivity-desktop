import MainLayout from "../layouts/MainLayout";

import { useState } from "react";

import NoteModal from
  "../components/NoteModal";

import RecentNotes from "../components/RecentNotes";
import PinnedNotes from "../components/PinnedNotes";

function Notes() {
  const [showNoteModal,
    setShowNoteModal] =
    useState(false);

  const [editingNote,
    setEditingNote] =
    useState(null);

  const [toast,
    setToast] =
    useState("");
  return (
    <MainLayout>
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: "24px",

          alignItems: "stretch",
        }}
      >
        <RecentNotes
          onNewNote={() =>
            setShowNoteModal(true)
          }
          onEditNote={
            setEditingNote
          }
          onPinNote={() => {
            setToast("Note pinned");

            setTimeout(() => {
              setToast("");
            }, 3000);
          }}
        />

        <PinnedNotes
          onEditNote={
            setEditingNote
          }
          onUnpinNote={() => {
            setToast(
              "Note unpinned"
            );

            setTimeout(() => {
              setToast("");
            }, 3000);
          }}
        />
      </div>
      {showNoteModal && (
        <NoteModal
          onClose={() =>
            setShowNoteModal(false)
          }
        />
      )}
      {editingNote && (
        <NoteModal
          mode="edit"
          note={editingNote}
          onClose={() =>
            setEditingNote(null)
          }
        />
      )}
      {toast && (
        <div
          style={{
            position: "fixed",

            bottom: "32px",

            left: "50%",

            transform:
              "translateX(-50%)",

            padding:
              "12px 18px",

            background:
              "rgba(20,20,20,0.75)",

            backdropFilter:
              "blur(20px)",

            border:
              "1px solid rgba(255,255,255,0.08)",

            borderRadius:
              "999px",

            color:
              "var(--text-primary)",

            fontWeight: "300",

            fontSize: "0.9rem",

            zIndex: 3000,

            boxShadow:
              "0 8px 30px rgba(0,0,0,0.35)",
          }}
        >
          {toast}
        </div>
      )}
    </MainLayout>
  );
}

export default Notes;