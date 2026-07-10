import { NotebookPen } from "lucide-react";

function NoteFolderPreviewCard({
    // build
}) {
    // const isPlaceholder = !note;

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();

                // onClick?.();
            }}
            style={{
                width: "100%",

                height: "150px",

                background:
                    "rgba(255,255,255,0.025)",

                border:
                    "1px solid rgba(255,255,255,0.06)",

                borderRadius: "20px",

                padding: "16px",

                display: "flex",

                flexDirection: "column",

                overflow: "hidden",

                cursor: "pointer",

                transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                    "translateY(-2px)";

                e.currentTarget.style.background =
                    "rgba(15,15,15,0.2)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.025)";
            }}
        >

            {/*
            {isPlaceholder ? (

                <div
                    style={{
                        flex: 1,

                        display: "flex",

                        flexDirection: "column",

                        justifyContent:
                            "center",

                        alignItems:
                            "center",

                        textAlign: "center",

                        gap: "10px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "2rem",

                            opacity: 0.35,
                        }}
                    >
                        <NotebookPen 
                        size={18}
                        />
                    </div>

                    <div
                        style={{
                            fontSize: "0.72rem",

                            opacity: 0.45,
                        }}
                    >
                        Create new note
                    </div>
                </div>

            ) : (

                <>
                    {/* TITLE */}{/*
                    <div
                        style={{
                            fontSize: "0.82rem",

                            fontWeight: "350",

                            letterSpacing: "-0.02em",

                            marginBottom: "10px",

                            display:
                                "-webkit-box",

                            WebkitLineClamp: 2,

                            WebkitBoxOrient:
                                "vertical",

                            overflow:
                                "hidden",
                        }}
                    >
                        Note Title
                    </div>

                    {/* CONTENT */}{/*

                    <div
                        style={{
                            fontSize: "0.68rem",

                            lineHeight: 1.4,

                            opacity: 0.55,

                            display:
                                "-webkit-box",

                            WebkitLineClamp: 5,

                            WebkitBoxOrient:
                                "vertical",

                            overflow:
                                "hidden",
                        }}
                    >
                        {/* {note.content || "Empty note."} */}{/*
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
                    </div>

                    <div
                        style={{
                            flex: 1,
                        }}
                    />
                </>
            )}
            */}

            {/* TITLE */}
                    <div
                        style={{
                            fontSize: "0.82rem",

                            fontWeight: "350",

                            letterSpacing: "-0.02em",

                            marginBottom: "10px",

                            display:
                                "-webkit-box",

                            WebkitLineClamp: 2,

                            WebkitBoxOrient:
                                "vertical",

                            overflow:
                                "hidden",
                        }}
                    >
                        Note Title
                    </div>

                    {/* CONTENT */}

                    <div
                        style={{
                            fontSize: "0.68rem",

                            lineHeight: 1.4,

                            opacity: 0.55,

                            display:
                                "-webkit-box",

                            WebkitLineClamp: 5,

                            WebkitBoxOrient:
                                "vertical",

                            overflow:
                                "hidden",
                        }}
                    >
                        {/* {note.content || "Empty note."} */}
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
                    </div>

                    <div
                        style={{
                            flex: 1,
                        }}
                    />
        </div>
    );
}

export default NoteFolderPreviewCard;