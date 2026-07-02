import MainLayout from "../layouts/MainLayout";

import {
  Search,
  ArrowUpDown,
  Filter,
  Ellipsis,
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  Sparkles,
  Shapes,
  ChartLine,
  Plus,
  AlarmClock,
} from "lucide-react";

import {
  useState,
  useEffect,
  useRef,
} from "react";

function Alarms() {
  // REFS
  const sortRef = useRef(null);

  const filterRef = useRef(null);

  const searchInputRef = useRef(null);

  const moreRef = useRef(null);

  // COMPONENT STATES
  const allAlarms = []; // placeholder until data wired 

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortBy, setSortBy] =
    useState("newest");

  const [showSortMenu, setShowSortMenu] =
    useState(false);

  const [showFilterMenu, setShowFilterMenu] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedPriority, setSelectedPriority] =
    useState("All");

  const [showActions, setShowActions] =
    useState(false);

  const [showSearchBar, setShowSearchBar] =
    useState(false);

  const [actionsPinned, setActionsPinned] =
    useState(false);

  const [showMoreMenu, setShowMoreMenu] =
    useState(false);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        showSortMenu &&
        sortRef.current &&
        !sortRef.current.contains(
          event.target
        )
      ) {
        setShowSortMenu(false);
      }

      if (
        showFilterMenu &&
        filterRef.current &&
        !filterRef.current.contains(
          event.target
        )
      ) {
        setShowFilterMenu(false);
      }

      if (
        showMoreMenu &&
        moreRef.current &&
        !moreRef.current.contains(
          event.target
        )
      ) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const actionIconStyle = {
    width: "32px",

    height: "32px",

    borderRadius: "999px",

    border: "none",

    background: "transparent",

    color: "var(--text-secondary)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    cursor: "pointer",

    transition:
      "all 260ms cubic-bezier(0.22, 1, 0.36, 1)",
  };

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >

          {/* HEADER */}
          <div
            style={{
              position: "relative",
              zIndex: 100,
            }}
          >
            {/* WITHIN HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontWeight: "400",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Alarms
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color: "var(--text-secondary)",
                    fontWeight: "300",
                  }}
                >
                  Manage and organize your alarms.
                </p>
              </div>

              {/* TOP RIGHT */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* CREATE */}
                <button
                  onClick={() => { }}
                  style={{
                    width: "36px",
                    height: "36px",

                    borderRadius: "999px",

                    border: "none",

                    background:
                      "rgba(255,255,255,0.025)",

                    color:
                      "var(--text-secondary)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    cursor: "pointer",

                    backdropFilter: "blur(28px)",

                    boxShadow:
                      "0 6px 20px rgba(0,0,0,0.28)",

                    transition:
                      "all 320ms cubic-bezier(0.22, 1, 0.36, 1)",

                    transform: "translateX(0)",
                  }}
                >
                  <Plus
                    size={16}
                    strokeWidth={1.5}
                  />
                </button>

                {/* ALL */}
                <div
                  onMouseEnter={() =>
                    setShowActions(true)
                  }
                  onMouseLeave={() => {
                    if (
                      !actionsPinned &&
                      !showSortMenu &&
                      !showFilterMenu &&
                      !showMoreMenu
                    ) {
                      setShowActions(false);
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",

                    justifyContent: "flex-end",

                    position: "relative",
                  }}
                >
                  {/* EXPAND ARROW */}
                  <button
                    onClick={() => {
                      if (showActions && actionsPinned) {
                        setShowActions(false);

                        setActionsPinned(false);

                        setShowSearchBar(false);

                        setSearchTerm("");

                        setShowSortMenu(false);

                        setShowFilterMenu(false);
                      }
                    }}
                    style={{
                      width: "36px",
                      height: "36px",

                      borderRadius: "999px",

                      border: "none",

                      background:
                        "rgba(255,255,255,0.025)",

                      color:
                        "var(--text-secondary)",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      cursor: "pointer",

                      backdropFilter: "blur(28px)",

                      boxShadow:
                        "0 6px 20px rgba(0,0,0,0.28)",

                      transition:
                        "all 320ms cubic-bezier(0.22, 1, 0.36, 1)",

                      transform: showActions
                        ? "translateX(2px)"
                        : "translateX(0)",
                    }}
                  >
                    {actionsPinned ? (
                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                      />
                    ) : (
                      <ArrowLeft
                        size={16}
                        strokeWidth={1.5}
                      />
                    )}
                  </button>

                  {/* ACTIONS */}
                  <div
                    style={{
                      width:
                        showActions
                          ? showSearchBar
                            ? "330px"
                            : "200px"
                          : "0px",

                      overflow: "visible",

                      transition: "all 340ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",

                        gap: "8px",

                        overflow: "visible",

                        width:
                          showActions
                            ? showSearchBar
                              ? "500px"
                              : "360px"
                            : "0px",

                        opacity: showActions
                          ? 1
                          : 0,

                        transform: showActions
                          ? "translateX(0)"
                          : "translateX(12px)",

                        transition:
                          "all 340ms cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      {/* SEARCH / SORT / FILTER */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",

                          gap: "6px",

                          padding: "4px",

                          borderRadius: "999px",

                          background: "rgba(255,255,255,0.025)",

                          backdropFilter: "blur(28px)",

                          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                        }}
                      >
                        {/* search wrapper */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",

                            overflow: "hidden",

                            width: showSearchBar
                              ? "170px"
                              : "32px",

                            minWidth: "32px",

                            borderRadius: "999px",

                            transition: "width 320ms cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                        >
                          {/* SEARCH ICON */}
                          <button
                            onClick={() => {
                              if (!showSearchBar) {
                                setShowSearchBar(true);

                                setActionsPinned(true);

                                setTimeout(() => {
                                  searchInputRef.current?.focus();
                                }, 50);
                              }
                            }}
                            style={actionIconStyle}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-1px)";

                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(0)";

                              e.currentTarget.style.color =
                                "var(--text-secondary)";
                            }}
                          >
                            <Search
                              size={15}
                              strokeWidth={1.6}
                            />
                          </button>

                          {/* INPUT */}
                          {showSearchBar && (
                            <input
                              ref={searchInputRef}
                              onFocus={() => {
                                setActionsPinned(true);

                                setShowSortMenu(false);

                                setShowFilterMenu(false);

                                setShowMoreMenu(false);
                              }}
                              value={searchTerm}
                              onChange={(e) =>
                                setSearchTerm(e.target.value)
                              }
                              placeholder="Search alarms..."
                              style={{
                                background: "none",

                                border: "none",

                                outline: "none",

                                color:
                                  "var(--text-primary)",

                                fontSize: "0.82rem",

                                fontWeight: "300",

                                width: "100%",

                                paddingRight: "12px",
                              }}
                            />
                          )}
                        </div>

                        {/* SORT BUTTON */}
                        <div
                          ref={sortRef}
                          style={{
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => {
                              setShowSortMenu(!showSortMenu);

                              setShowFilterMenu(false);

                              setActionsPinned(true);

                              setShowActions(true);

                              setShowMoreMenu(false);
                            }}
                            style={actionIconStyle}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-1px)";

                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(0)";

                              e.currentTarget.style.color =
                                "var(--text-secondary)";
                            }}
                          >
                            <ArrowUpDown
                              size={15}
                              strokeWidth={1.6}
                            />
                          </button>

                          {showSortMenu && (
                            <div
                              style={{
                                position: "fixed",

                                top: "42px",
                                right: 0,

                                width: "170px",

                                background:
                                  "rgba(20,20,20,0.92)",

                                backdropFilter:
                                  "blur(24px)",

                                border:
                                  "1px solid rgba(255,255,255,0.10)",

                                boxShadow:
                                  "0 20px 50px rgba(0,0,0,0.35)",

                                borderRadius: "18px",

                                padding: "8px",

                                display: "flex",

                                flexDirection: "column",

                                gap: "4px",

                                zIndex: 9999999,
                              }}
                            >
                              {[
                                "newest",
                                "oldest",
                                "priority",
                                "dueDate",
                                "alphabetical",
                              ].map((option) => (
                                <button
                                  key={option}
                                  onClick={() => {
                                    setSortBy(option);

                                    setShowSortMenu(false);

                                    setShowFilterMenu(false);
                                  }}
                                  style={{
                                    background: "transparent",

                                    border: "none",

                                    color:
                                      sortBy === option
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                    padding: "10px 14px",

                                    borderRadius: "12px",

                                    cursor: "pointer",

                                    textAlign: "left",

                                    fontSize: "0.78rem",

                                    fontWeight: "300",

                                    transition:
                                      "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(255,255,255,0.06)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                >
                                  {option === "dueDate"
                                    ? "Due Date"
                                    : option === "alphabetical"
                                      ? "A → Z"
                                      : option.charAt(0).toUpperCase() +
                                      option.slice(1)}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* FILTER BUTTON */}
                        <div
                          ref={filterRef}
                          style={{
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => {
                              setShowFilterMenu(!showFilterMenu);

                              setShowSortMenu(false);

                              setActionsPinned(true);

                              setShowActions(true);

                              setShowMoreMenu(false);
                            }}
                            style={actionIconStyle}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-1px)";

                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(0)";

                              e.currentTarget.style.color =
                                "var(--text-secondary)";
                            }}
                          >
                            <Filter
                              size={15}
                              strokeWidth={1.6}
                            />
                          </button>

                          {showFilterMenu && (
                            <div
                              style={{
                                position: "absolute",

                                top: "42px",
                                right: 0,

                                width: "200px",

                                background:
                                  "rgba(20,20,20,0.92)",

                                backdropFilter:
                                  "blur(24px)",

                                border:
                                  "1px solid rgba(255,255,255,0.10)",

                                boxShadow:
                                  "0 20px 50px rgba(0,0,0,0.35)",

                                borderRadius: "18px",

                                padding: "8px",

                                display: "flex",

                                flexDirection: "column",

                                gap: "4px",

                                zIndex: 2001,
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "0.72rem",
                                  opacity: 0.45,
                                  padding: "8px 12px 4px",
                                  margin: 0,
                                }}
                              >
                                Category
                              </p>

                              {[
                                "All",
                                "Work",
                                "Study",
                                "Personal",
                                "Health",
                              ].map((category) => (
                                <button
                                  key={category}
                                  onClick={() => {
                                    setSelectedCategory(category);

                                    setShowFilterMenu(false);
                                  }}
                                  style={{
                                    background: "transparent",

                                    border: "none",

                                    color:
                                      selectedCategory === category
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                    padding: "10px 14px",

                                    borderRadius: "12px",

                                    cursor: "pointer",

                                    textAlign: "left",

                                    fontSize: "0.78rem",

                                    fontWeight: "300",

                                    transition:
                                      "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(255,255,255,0.06)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                >
                                  {category}
                                </button>
                              ))}

                              <div
                                style={{
                                  height: "1px",
                                  background: "rgba(255,255,255,0.06)",
                                  margin: "8px 0",
                                }}
                              />

                              <p
                                style={{
                                  fontSize: "0.72rem",
                                  opacity: 0.45,
                                  padding: "8px 12px 4px",
                                  margin: 0,
                                }}
                              >
                                Priority
                              </p>

                              {[
                                "All",
                                "High",
                                "Medium",
                                "Low",
                              ].map((priority) => (
                                <button
                                  key={priority}
                                  onClick={() => {
                                    setSelectedPriority(priority);

                                    setShowFilterMenu(false);
                                  }}
                                  style={{
                                    background: "transparent",

                                    border: "none",

                                    color:
                                      selectedPriority === priority
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                    padding: "10px 14px",

                                    borderRadius: "12px",

                                    cursor: "pointer",

                                    textAlign: "left",

                                    fontSize: "0.78rem",

                                    fontWeight: "300",

                                    transition:
                                      "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(255,255,255,0.06)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                >
                                  {priority}
                                </button>
                              ))}

                              <div
                                style={{
                                  height: "1px",
                                  background:
                                    "rgba(255,255,255,0.06)",

                                  margin: "8px 0",
                                }}
                              />

                              <button
                                onClick={() => {
                                  setSelectedCategory("All");
                                  setSelectedPriority("All");
                                  setShowFilterMenu(false);
                                }}
                                style={{
                                  background: "transparent",

                                  border: "none",

                                  color:
                                    "var(--text-secondary)",

                                  padding: "10px 14px",

                                  borderRadius: "12px",

                                  cursor: "pointer",

                                  textAlign: "left",

                                  fontSize: "0.78rem",

                                  fontWeight: "300",

                                  transition:
                                    "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(255,255,255,0.06)";

                                  e.currentTarget.style.color =
                                    "var(--text-primary)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";

                                  e.currentTarget.style.color =
                                    "var(--text-secondary)";
                                }}
                              >
                                Clear Filters
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* NO TABS */}

                      {/* MORE */}
                      <div
                        ref={moreRef}
                        style={{
                          position: "relative",
                        }}
                      >
                        <button
                          onClick={() => {
                            setShowMoreMenu(!showMoreMenu);

                            setActionsPinned(true);

                            setShowActions(true);

                            setShowSortMenu(false);

                            setShowFilterMenu(false);
                          }}
                          style={actionIconStyle}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-1px)";

                            e.currentTarget.style.color =
                              "var(--text-primary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(0)";

                            e.currentTarget.style.color =
                              "var(--text-secondary)";
                          }}
                        >
                          <Ellipsis
                            size={16}
                            strokeWidth={1.6}
                          />
                        </button>

                        {showMoreMenu && (
                          <div
                            style={{
                              position: "fixed",

                              top: "42px",
                              right: 0,

                              width: "180px",

                              background: "rgba(20,20,20,0.92)",

                              backdropFilter: "blur(24px)",
                              WebkitBackdropFilter: "blur(24px)",

                              border: "1px solid rgba(255,255,255,0.10)",

                              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",

                              borderRadius: "18px",

                              overflow: "hidden",

                              padding: "8px",

                              display: "flex",
                              flexDirection: "column",

                              gap: "4px",

                              zIndex: 2001,
                            }}
                          >
                            <button
                              onClick={() => {
                                setShowMoreMenu(false);
                                setShowReminderModal(true);
                              }}
                              style={{
                                background: "transparent",

                                border: "none",

                                color: "var(--text-secondary)",

                                padding: "10px 14px",

                                borderRadius: "12px",

                                cursor: "pointer",

                                textAlign: "left",

                                fontSize: "0.78rem",

                                fontWeight: "300",

                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255,255,255,0.06)";

                                e.currentTarget.style.color =
                                  "var(--text-primary)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";

                                e.currentTarget.style.color =
                                  "var(--text-secondary)";
                              }}
                            >
                              Create Alarm
                            </button>

                            <button
                              onClick={() => {
                                setShowMoreMenu(false);
                                setShowClearCompleted(true);
                              }}
                              style={{
                                background: "transparent",

                                border: "none",

                                color: "var(--text-secondary)",

                                padding: "10px 14px",

                                borderRadius: "12px",

                                cursor: "pointer",

                                textAlign: "left",

                                fontSize: "0.78rem",

                                fontWeight: "300",

                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255,255,255,0.06)";

                                e.currentTarget.style.color =
                                  "var(--text-primary)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";

                                e.currentTarget.style.color =
                                  "var(--text-secondary)";
                              }}
                            >
                              Clear Completed
                            </button>

                            <button
                              onClick={() => {
                                setShowMoreMenu(false);
                                setShowClearActive(true);
                              }}
                              style={{
                                background: "transparent",

                                border: "none",

                                color: "var(--text-secondary)",

                                padding: "10px 14px",

                                borderRadius: "12px",

                                cursor: "pointer",

                                textAlign: "left",

                                fontSize: "0.78rem",

                                fontWeight: "300",

                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255,255,255,0.06)";

                                e.currentTarget.style.color =
                                  "var(--text-primary)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";

                                e.currentTarget.style.color =
                                  "var(--text-secondary)";
                              }}
                            >
                              Clear All
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div> {/* END ACTIONS CONTAINER */}
                </div>
              </div> {/* END TOP RIGHT */}
            </div> {/* END WITHIN HEADER */}

            <p
              style={{
                marginTop: "6px",
                marginBottom: 0,

                fontSize: "0.8rem",

                color: "var(--text-secondary)",

                opacity: 0.65,

                fontWeight: "300",
              }}
            >
              Nothing here yet
            </p>
          </div> {/* END HEADER */}

          {/* DIVIDER */}
          <div
            style={{
              height: "1px",
              background:
                "rgba(255,255,255,0.06)",
            }}
          />

          {/* ALL ALARMS */}
          <div
              style={{

                borderRadius:
                  "var(--radius-large)",

                backdropFilter:
                  "blur(20px)",

                WebkitBackdropFilter:
                  "blur(20px)",

                height: "700px",

                display: "flex",

                flexDirection: "column",

                overflow: "hidden",
              }}
            >
              {/* HEADER REMOVED */}

              {/* GRID */}
              <div
                style={{
                  flex: 1,

                  overflowY: "auto",

                  padding: "24px",

                  display: "grid",

                  gridTemplateColumns:
                    "repeat(4, 1fr)",

                  gap: "18px",

                  alignContent: "start",
                }}
              >

                {allAlarms.length === 0 ? (
                  <div
                    style={{
                      gridColumn: "1 / -1",

                      display: "flex",
                      flexDirection: "column",

                      justifyContent: "center",
                      alignItems: "center",

                      minHeight: "500px",

                      textAlign: "center",

                      color: "var(--text-secondary)",

                      opacity: 0.85,
                    }}
                  >

                    <div
                      style={{
                        marginBottom: "8px",
                      }}
                    >
                      <AlarmClock
                        size={60}
                        strokeWidth={1.8}
                        opacity={0.85}
                      />
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                      }}
                    >
                      No Alarms
                    </p>

                    <p
                      style={{
                        marginTop: "2px",
                        fontSize: "0.75rem",
                      }}
                    >
                      Click + to create one
                      {/* or try searching a different term */}
                    </p>
                  </div>
                ) : (
                  <p>
                    map AlarmCard
                  </p>
                )}
              </div>
            </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default Alarms;