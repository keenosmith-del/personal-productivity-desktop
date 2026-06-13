import GlassCard from "../GlassCard";

function AllProjectsCard({
    onNewProject,
}) {
    return (
        <GlassCard minHeight="260px">
            <div
                style={{
                    height: "100%",

                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems: "center",

                        marginBottom: "24px",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "500",
                            fontSize: "1.1rem",
                        }}
                    >
                        All Projects
                    </h2>

                    <button
                        onClick={onNewProject}
                        style={{
                            background: "transparent",

                            border: "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "8px 14px",

                            color: "var(--text-secondary)",

                            fontSize: "0.8rem",

                            fontWeight: "300",

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
                        + New Project
                    </button>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",

                        height: "140px",

                        overflowY: "auto",

                        gap: "10px",

                        color:
                            "var(--text-secondary)",

                        paddingRight: "4px",
                    }}
                >
                    <p
                        style={{
                            fontWeight: "400",
                            color:
                                "var(--text-primary)",
                            marginBottom: "6px",
                        }}
                    >
                        3 Projects
                    </p>

                    <div
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",

                            cursor: "pointer",

                            padding: "8px 12px",

                            borderRadius: "12px",

                            transition:
                                "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "transparent";
                        }}
                    >
                        <p
                            style={{
                                fontWeight: "300",
                            }}
                        >
                            Portfolio Website
                        </p>

                    </div>

                    <div
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",

                            cursor: "pointer",

                            padding: "8px 12px",

                            borderRadius: "12px",

                            transition:
                                "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "transparent";
                        }}
                    >
                        <p
                            style={{
                                fontWeight: "300",
                            }}
                        >
                            Productivity App
                        </p>

                    </div>

                    <div
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",

                            cursor: "pointer",

                            padding: "8px 12px",

                            borderRadius: "12px",

                            transition:
                                "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "transparent";
                        }}
                    >
                        <p
                            style={{
                                fontWeight: "300",
                            }}
                        >
                            Deploy Website
                        </p>

                    </div>
                </div>

                <div
                    style={{
                        flex: 1,
                    }}
                />
            </div>
        </GlassCard >
    );
}

export default AllProjectsCard;