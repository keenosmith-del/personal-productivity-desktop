import GlassCard from "./GlassCard";
import PrimaryButton from "./PrimaryButton";

function CreateNote() {
    return (
        <GlassCard minHeight="300px">
            <h2
                style={{
                    marginBottom: "24px",
                }}
            >
                Create Note
            </h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    height: "100%",
                }}
            >
                <input
                    placeholder="Note title"
                    style={{
                        background:
                            "rgba(255,255,255,0.04)",

                        border:
                            "1px solid var(--glass-border)",

                        borderRadius: "12px",

                        padding: "14px",

                        color:
                            "var(--text-primary)",

                        outline: "none",
                    }}
                />

                <textarea
                    placeholder="Write your note..."
                    rows={10}
                    style={{
                        resize: "none",

                        background:
                            "rgba(255,255,255,0.04)",

                        border:
                            "1px solid var(--glass-border)",

                        borderRadius: "12px",

                        padding: "14px",

                        color:
                            "var(--text-primary)",

                        outline: "none",

                        flex: 1,

                        fontFamily: "inherit",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <PrimaryButton>
                        Create Note
                    </PrimaryButton>
                </div>
            </div>
        </GlassCard>
    );
}

export default CreateNote;