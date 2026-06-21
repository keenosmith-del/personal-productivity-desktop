import MainLayout from "../layouts/MainLayout";

import NoteModal from "../components/Notes/NoteModal";
import RecentNotes from "../components/Notes/RecentNotes";
import PinnedNotes from "../components/Notes/PinnedNotes";

import { useState, useEffect } from "react";

import {
  getNotes,
  createNote,
  updateNote,
  clearAllNotes,
  clearPinnedNotes,
} from "../services/noteService";

import Toast from "../components/Toast";

function Notes() {
  const [showNoteModal,
    setShowNoteModal] =
    useState(false);

  const [editingNote,
    setEditingNote] =
    useState(null);

  const [notes, setNotes] =
    useState([]);

  const [toast,
    setToast] =
    useState("");

  const [showClearNotes,
    setShowClearNotes] =
    useState(false);

  const [showClearPinnedNotes,
    setShowClearPinnedNotes] =
    useState(false);

  const handleClearAllNotes = async () => {
    try {
      await clearAllNotes();

      setNotes([]);

      setToast("Notes cleared");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);

      setToast("Failed to clear notes");

      setTimeout(() => {
        setToast("");
      }, 3000);
    }
  };

  const handleClearPinnedNotes = async () => {
    try {
      await clearPinnedNotes();

      setNotes((prev) =>
        prev.map((note) => ({
          ...note,
          pinned: false,
        }))
      );

      setToast("Pinned notes cleared");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);

      setToast("Failed to clear pinned notes");

      setTimeout(() => {
        setToast("");
      }, 3000);
    }
  };

  const loadNotes = async () => {
    try {
      const data = await getNotes();

      setNotes(data);
    } catch (error) {
      console.error(error);

      setToast("Failed to load notes");

      setTimeout(() => {
        setToast("");
      }, 3000);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

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
        />

        <PinnedNotes
          notes={notes}
          setNotes={setNotes}
          setToast={setToast}
          onClearAll={() =>
            setShowClearPinnedNotes(true)
          }
          onEditNote={
            setEditingNote
          }
        />
      </div>
      {showNoteModal && (
        <NoteModal
          onClose={() =>
            setShowNoteModal(false)
          }
          onSave={(noteData) => {
            createNote(noteData)
              .then((newNote) => {
                setNotes((prev) => [
                  newNote,
                  ...prev,
                ]);

                setToast("Note created");

                setTimeout(() => {
                  setToast("");
                }, 3000);

                setShowNoteModal(false);
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to create note"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
          }}
        />
      )}
      {editingNote && (
        <NoteModal
          mode="edit"
          note={editingNote}
          onClose={() =>
            setEditingNote(null)
          }
          onSave={(noteData) => {
            updateNote(
              editingNote._id,
              noteData
            )
              .then((updatedNote) => {
                setNotes((prev) =>
                  prev.map((note) =>
                    note._id ===
                      updatedNote._id
                      ? updatedNote
                      : note
                  )
                );

                setToast(
                  "Note updated"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);

                setEditingNote(null);
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to update note"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
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
      <Toast
        message={toast}
      />
    </MainLayout>
  );
}

export default Notes;