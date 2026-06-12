import { Search } from "lucide-react";

function SearchBar() {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",

                gap: "12px",

                padding: "14px 18px",

                background:
                    "rgba(255,255,255,0.04)",

                border:
                    "1px solid rgba(255,255,255,0.08)",

                borderRadius: "18px",

                backdropFilter:
                    "blur(20px)",

                WebkitBackdropFilter:
                    "blur(20px)",

                transition:
                    "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background =
                    "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background =
                    "rgba(255,255,255,0.04)";
            }}
        >
            <Search
                size={18}
                strokeWidth={1.75}
                color="var(--text-secondary)"
            />

            <input
                placeholder="Search..."
                style={{
                    flex: 1,

                    background:
                        "transparent",

                    border: "none",

                    outline: "none",

                    color:
                        "var(--text-primary)",

                    fontSize: "0.95rem",

                    fontWeight: "300",
                }}
            />
        </div>
    );
}

export default SearchBar;