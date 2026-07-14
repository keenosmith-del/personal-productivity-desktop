import MainLayout from "../layouts/MainLayout";

import {
  Search,
  ArrowUpDown,
  ArrowLeft,
  ArrowRight,
  Plus,
  Filter,
  AlarmClock,
  Ellipsis,
  AlarmClockOff,
  Trash,
} from "lucide-react";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import AlarmModal from "../components/Alarms/AlarmModal";
import AlarmCard from "../components/Alarms/AlarmCard";

import FloatingLayer from "../components/FloatingLayer";

import Toast from "../components/Toast";

import {
  getAlarms,
  createAlarm,
  updateAlarm,
  deleteAlarm,
} from "../services/alarmService";

function Alarms() {
  // REFS
  const sortRef = useRef(null);

  const searchInputRef = useRef(null);

  const filterRef = useRef(null);

  const moreRef = useRef(null);

  // COMPONENT STATES
  const [alarms, setAlarms] =
    useState([]);

  const [selectedType, setSelectedType] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortBy, setSortBy] =
    useState("newest");

  const [showSortMenu, setShowSortMenu] =
    useState(false);

  const [showFilterMenu, setShowFilterMenu] =
    useState(false);

  const [showActions, setShowActions] =
    useState(false);

  const [showSearchBar, setShowSearchBar] =
    useState(false);

  const [actionsPinned, setActionsPinned] =
    useState(false);

  const [showMoreMenu, setShowMoreMenu] =
    useState(false);

  const [showAlarmModal, setShowAlarmModal] =
    useState(false);

  const [selectedAlarm, setSelectedAlarm] =
    useState(null);

  const [toast, setToast] =
    useState("");

  const loadAlarms = async () => {
    try {
      const data =
        await getAlarms();

      setAlarms(data);

    } catch {
      setToast(
        "Failed to load alarms"
      );

      setTimeout(() => {
        setToast("");
      }, 3000);
    }
  };

  useEffect(() => {

    const handleAlarmUpdated = () => {

      loadAlarms();

    };

    window.addEventListener(
      "alarmUpdated",
      handleAlarmUpdated
    );

    return () => {

      window.removeEventListener(
        "alarmUpdated",
        handleAlarmUpdated
      );

    };

  }, []);

  // HANDLERS
  const handleDeleteAlarm =
    async (alarmId) => {
      try {
        await deleteAlarm(alarmId);

        setAlarms((prev) =>
          prev.filter(
            (alarm) =>
              alarm._id !== alarmId
          )
        );

        setToast(
          "Alarm deleted"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      } catch (error) {
        console.error(error);

        setToast(
          "Failed to delete alarm"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  useEffect(() => {
    loadAlarms();
  }, []);

  useEffect(() => {

    const handleAlarmUpdated = () => {

      loadAlarms();

    };

    window.addEventListener(
      "alarmUpdated",
      handleAlarmUpdated
    );

    return () => {

      window.removeEventListener(
        "alarmUpdated",
        handleAlarmUpdated
      );

    };

  }, []);

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

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",

    background: "transparent",

    border: "none",

    color: "var(--text-primary)",

    padding: "10px 14px",

    borderRadius: "999px",

    cursor: "pointer",

    textAlign: "left",

    fontSize: "0.7rem",

    fontWeight: "300",

    transition: "all 0.2s ease",

    width: "100%",
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
              zIndex: 2,
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
                  onClick={() => {
                    setSelectedAlarm(null);
                    setShowAlarmModal(true);
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

                    transform: "translateX(0)",
                  }}
                >
                  <Plus
                    size={16}
                    strokeWidth={1.5}
                  />
                </button>

                {/* ARROW */}
                <div
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
                      if (showActions) {
                        setShowActions(false);

                        setActionsPinned(false);

                        setShowSearchBar(false);

                        setSearchTerm("");

                        setShowSortMenu(false);

                        setShowFilterMenu(false);

                        setShowMoreMenu(false);
                      } else {
                        setShowActions(true);

                        setActionsPinned(true);
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
                    {showActions ? (
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
                            ? "320px"
                            : "180px"
                          : "15px",

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
                            <FloatingLayer
                              anchorRef={sortRef}
                              open={true}
                              placement="bottom"
                              offset={8}
                            >
                              <div
                                style={{
                                  width: "170px",

                                  background:
                                    "rgba(20,20,20,0)",

                                  backdropFilter:
                                    "blur(8px)",

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
                                {[
                                  "newest",
                                  "oldest",
                                  "priority",
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
                                      ...menuItemStyle,

                                      color:
                                        sortBy === option
                                          ? "var(--text-primary)"
                                          : "var(--text-secondary)",

                                      opacity:
                                        sortBy === option
                                          ? 1
                                          : 0.55,
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background =
                                        "rgba(255,255,255,0.04)";

                                      e.currentTarget.style.color =
                                        "#F5F5F5";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background =
                                        "transparent";

                                      e.currentTarget.style.color =
                                        sortBy === option
                                          ? "var(--text-primary)"
                                          : "var(--text-secondary)";

                                      e.currentTarget.style.opacity =
                                        sortBy === option
                                          ? "1"
                                          : "0.55";
                                    }}
                                  >
                                    {option === "alphabetical"
                                      ? "A → Z"
                                      : option.charAt(0).toUpperCase() +
                                      option.slice(1)}
                                  </button>
                                ))}
                              </div>
                            </FloatingLayer>
                          )}
                        </div>

                        {/* FILTER BUTTON REMOVED */}
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
                            <FloatingLayer
                              anchorRef={sortRef}
                              open={true}
                              placement="bottom"
                              offset={8}
                            >
                              <div
                                style={{
                                  width: "170px",

                                  background:
                                    "rgba(20,20,20,0)",

                                  backdropFilter:
                                    "blur(8px)",

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
                                    ...menuItemStyle,
                                    fontSize: "0.72rem",
                                    opacity: 0.45,
                                    margin: 0,
                                  }}
                                >
                                  Type
                                </p>

                                {[
                                  "All",
                                  "On",
                                  "Off",
                                ].map((type) => (
                                  <button
                                    key={type}
                                    onClick={() => {
                                      setSelectedType(type);

                                      setShowSortMenu(false);

                                      setShowFilterMenu(false);
                                    }}
                                    style={{
                                      ...menuItemStyle,

                                      color:
                                        selectedType === type
                                          ? "var(--text-primary)"
                                          : "var(--text-secondary)",

                                      opacity:
                                        selectedType === type
                                          ? 1
                                          : 0.55,
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background =
                                        "rgba(255,255,255,0.04)";

                                      e.currentTarget.style.color =
                                        "#F5F5F5";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background =
                                        "transparent";

                                      e.currentTarget.style.color =
                                        selectedCategory === category
                                          ? "var(--text-primary)"
                                          : "var(--text-secondary)";

                                      e.currentTarget.style.opacity =
                                        selectedCategory === category
                                          ? "1"
                                          : "0.55";
                                    }}
                                  >
                                    {type}
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
                                    setSelectedType("All");
                                    setShowFilterMenu(false);
                                  }}
                                  style={menuItemStyle}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(255,255,255,0.04)";

                                    e.currentTarget.style.color =
                                      "#f5f5f5";
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
                            </FloatingLayer>
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

                            setShowFilterMenu(false);

                            setShowSortMenu(false);
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
                          <FloatingLayer
                            anchorRef={moreRef}
                            open={true}
                            placement="bottom"
                            offset={8}
                          >
                            <div
                              style={{
                                width: "180px",

                                background:
                                  "rgba(20,20,20,0)",

                                backdropFilter:
                                  "blur(8px)",

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
                              <button
                                onClick={() => {
                                  setShowMoreMenu(false);
                                  setShowAlarmModal(true);
                                }}
                                style={menuItemStyle}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                  e.currentTarget.style.color =
                                    "#F5F5F5";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";

                                  e.currentTarget.style.color =
                                    "var(--text-primary)";
                                }}
                              >
                                <Plus
                                  size={13}
                                  strokeWidth={1}
                                />
                                New Alarm
                              </button>

                              <div
                                style={{
                                  height: "1px",
                                  background:
                                    "rgba(255,255,255,0.05)",
                                  margin: "4px 0",
                                }}
                              />

                              <button
                                onClick={() => {
                                  setShowMoreMenu(false);
                                  // setShowAlarmModal(true);
                                }}
                                style={menuItemStyle}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                  e.currentTarget.style.color =
                                    "#F5F5F5";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";

                                  e.currentTarget.style.color =
                                    "var(--text-primary)";
                                }}
                              >
                                <AlarmClock
                                  size={13}
                                  strokeWidth={1}
                                />
                                Turn on all
                              </button>

                              <button
                                onClick={() => {
                                  setShowMoreMenu(false);
                                  // setShowAlarmModal(true);
                                }}
                                style={menuItemStyle}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                  e.currentTarget.style.color =
                                    "#F5F5F5";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";

                                  e.currentTarget.style.color =
                                    "var(--text-primary)";
                                }}
                              >
                                <AlarmClockOff
                                  size={13}
                                  strokeWidth={1}
                                />
                                Turn off all
                              </button>

                              <div
                                style={{
                                  height: "1px",
                                  background:
                                    "rgba(255,255,255,0.05)",
                                  margin: "4px 0",
                                }}
                              />

                              <button
                                onClick={() => {
                                  setShowMoreMenu(false);
                                  // setShowClearActive(true);
                                }}
                                style={{
                                  ...menuItemStyle,
                                  color: "#ff6b6b",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                  e.currentTarget.style.color =
                                    "#ff6b6b";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";

                                  e.currentTarget.style.color =
                                    "#ff6b6b";
                                }}
                              >
                                <Trash
                                  size={13}
                                  strokeWidth={1}
                                />
                                Delete All
                              </button>
                            </div>
                          </FloatingLayer>
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
              {alarms.length + " Alarms" ||
                "No alarms yet"}
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

                // responsive design sweep later (ALL)
                // gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",

                gap: "18px",

                alignContent: "start",
              }}
            >

              {alarms.length === 0 ? (
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
                alarms.map((alarm) => (
                  <AlarmCard
                    key={alarm._id}
                    alarm={alarm}

                    onClick={(alarm) => {
                      setSelectedAlarm(alarm);

                      setShowAlarmModal(true);
                    }}

                    onDelete={handleDeleteAlarm}

                    onToggle={(alarm) => {
                      updateAlarm(
                        alarm._id,
                        {
                          ...alarm,

                          enabled:
                            !alarm.enabled,
                        }
                      )
                        .then((updatedAlarm) => {

                          setAlarms((prev) =>
                            prev.map((a) =>
                              a._id === updatedAlarm._id
                                ? updatedAlarm
                                : a
                            )
                          );
                        })
                        .catch(() => {
                          setToast(
                            "Failed to update alarm"
                          );

                          setTimeout(() => {
                            setToast("");
                          }, 3000);
                        });
                    }}
                  />
                ))
              )}
            </div>
          </div>

        </div>
      </div>
      {(showAlarmModal || selectedAlarm) && (
        <AlarmModal
          mode={
            selectedAlarm
              ? "edit"
              : "create"
          }
          alarm={selectedAlarm || null}

          onClose={() => {
            setSelectedAlarm(null);

            setShowAlarmModal(false);
          }}

          onSave={(alarmData) => {
            const request =
              selectedAlarm
                ? updateAlarm(
                  selectedAlarm._id,
                  alarmData
                )
                : createAlarm(
                  alarmData
                );

            request
              .then((savedAlarm) => {

                if (selectedAlarm) {

                  setAlarms((prev) =>
                    prev.map((alarm) =>
                      alarm._id === savedAlarm._id
                        ? savedAlarm
                        : alarm
                    )
                  );

                  setToast("Alarm updated");

                } else {

                  setAlarms((prev) => [
                    savedAlarm,
                    ...prev,
                  ]);

                  setToast("Alarm created");
                }

                setSelectedAlarm(null);

                setShowAlarmModal(false);

                setTimeout(() => {
                  setToast("");
                }, 3000);
              })
              .catch(() => {

                setToast(
                  selectedAlarm
                    ? "Failed to update alarm"
                    : "Failed to create alarm"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
          }}
          onDelete={handleDeleteAlarm}
        />
      )}
      <Toast
        message={toast}
      />
    </MainLayout>
  );
}

export default Alarms;