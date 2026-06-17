import MainLayout from "../layouts/MainLayout";

import { useState } from "react";

import NoteModal from "../components/Notes/NoteModal";
import RecentNotes from "../components/Notes/RecentNotes";
import PinnedNotes from "../components/Notes/PinnedNotes";

import { initialNotes } from "../data/notes";
import Toast from "../components/Toast";

function Notes() {
  const [showNoteModal,
    setShowNoteModal] =
    useState(false);

  const [editingNote,
    setEditingNote] =
    useState(null);

  const [notes, setNotes] =
    useState(initialNotes);

  const [pinnedNotes, setPinnedNotes] =
    useState([]);

  const [toast,
    setToast] =
    useState("");

  const [lastDeletedNote,
    setLastDeletedNote] =
    useState(null);

  const [showClearNotes,
    setShowClearNotes] =
    useState(false);

  const [showClearPinnedNotes,
    setShowClearPinnedNotes] =
    useState(false);

  const handleClearAllNotes = () => {
    setNotes([]);

    setPinnedNotes([]);

    setLastDeletedNote(null);

    setToast("Notes cleared");

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleClearPinnedNotes = () => {
    setPinnedNotes([]);

    setLastDeletedNote(null);

    setToast("Pinned notes cleared");

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

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
          notes={notes}
          setNotes={setNotes}
          pinnedNotes={pinnedNotes}
          setPinnedNotes={setPinnedNotes}
          setLastDeletedNote={setLastDeletedNote}
          setToast={setToast}
          onClearAll={() =>
            setShowClearNotes(true)
          }
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
          notes={notes}
          setNotes={setNotes}
          pinnedNotes={pinnedNotes}
          setPinnedNotes={setPinnedNotes}
          setLastDeletedNote={setLastDeletedNote}
          setToast={setToast}
          onClearAll={() =>
            setShowClearPinnedNotes(true)
          }
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
          onSave={(updatedNote) => {
            setNotes((prev) =>
              prev.map((note) =>
                note.id === updatedNote.id
                  ? updatedNote
                  : note
              )
            );

            setPinnedNotes((prev) =>
              prev.map((note) =>
                note.id === updatedNote.id
                  ? updatedNote
                  : note
              )
            );

            setToast("Note updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            setEditingNote(null);
          }}
        />
      )}
      {showClearNotes && (
        <div
          onClick={() =>
            setShowClearNotes(false)
          }
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(12px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "400px",
              padding: "28px",
              borderRadius: "24px",
              background: "rgba(20,20,20,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              style={{
                marginBottom: "12px",
                fontWeight: "400",
              }}
            >
              Clear all notes?
            </h3>

            <p
              style={{
                color:
                  "var(--text-secondary)",
                marginBottom: "24px",
              }}
            >
              This action cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() =>
                  setShowClearNotes(false)
                }
                style={{
                  background: "transparent",

                  border: "1px solid rgba(255,255,255,0.08)",

                  borderRadius: "999px",

                  padding: "8px 14px",

                  color: "#ff6b6b",

                  fontSize: "0.85rem",

                  fontWeight: "400",

                  cursor: "pointer",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "#ff6b6b";

                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "#ff6b6b";

                  e.currentTarget.style.background =
                    "transparent";
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleClearAllNotes();

                  setShowClearNotes(false);
                }}

                style={{
                  background: "transparent",

                  border: "1px solid rgba(255,255,255,0.08)",

                  borderRadius: "999px",

                  padding: "8px 14px",

                  color: "var(--text-secondary)",

                  fontSize: "0.85rem",

                  fontWeight: "400",

                  cursor: "pointer",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "var(--text-primary)";

                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "var(--text-secondary)";

                  e.currentTarget.style.background =
                    "transparent";
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
      {showClearPinnedNotes && (
        <div
          onClick={() =>
            setShowClearPinnedNotes(false)
          }
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(12px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "400px",
              padding: "28px",
              borderRadius: "24px",
              background: "rgba(20,20,20,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              style={{
                marginBottom: "12px",
                fontWeight: "400",
              }}
            >
              Unpin all notes?
            </h3>

            <p
              style={{
                color:
                  "var(--text-secondary)",
                marginBottom: "24px",
              }}
            >
              This action cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() =>
                  setShowClearPinnedNotes(false)
                }
                style={{
                  background: "transparent",

                  border: "1px solid rgba(255,255,255,0.08)",

                  borderRadius: "999px",

                  padding: "8px 14px",

                  color: "#ff6b6b",

                  fontSize: "0.85rem",

                  fontWeight: "400",

                  cursor: "pointer",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "#ff6b6b";

                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "#ff6b6b";

                  e.currentTarget.style.background =
                    "transparent";
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleClearPinnedNotes();

                  setShowClearPinnedNotes(false);
                }}

                style={{
                  background: "transparent",

                  border: "1px solid rgba(255,255,255,0.08)",

                  borderRadius: "999px",

                  padding: "8px 14px",

                  color: "var(--text-secondary)",

                  fontSize: "0.85rem",

                  fontWeight: "400",

                  cursor: "pointer",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    "var(--text-primary)";

                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "var(--text-secondary)";

                  e.currentTarget.style.background =
                    "transparent";
                }}
              >
                Unpin
              </button>
            </div>
          </div>
        </div>
      )}
      {/* REFACTOR <TOAST /> */}
      <Toast
        message={toast}
        actionLabel={
          lastDeletedNote
            ? "Undo"
            : null
        }
        onAction={() => {
          if (!lastDeletedNote)
            return;

          const {
            wasPinned,
            ...noteToRestore
          } = lastDeletedNote;

          setNotes((prev) => [
            noteToRestore,
            ...prev,
          ]);

          if (wasPinned) {
            setPinnedNotes((prev) => [
              noteToRestore,
              ...prev,
            ]);
          }

          setLastDeletedNote(
            null
          );

          setToast("");
        }}
      />
    </MainLayout>
  );
}

export default Notes;