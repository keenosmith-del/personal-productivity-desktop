import { useState, useRef } from "react";

import FloatingLayer from "./FloatingLayer";

function SubmenuTrigger({
    trigger,
    children,
}) {
    const [open, setOpen] = useState(false);

    const triggerRef = useRef(null);

    const menuRef = useRef(null);

    const closeTimeout = useRef(null);

    const openMenu = () => {
        clearTimeout(closeTimeout.current);
        setOpen(true);
    };

    const closeMenu = () => {
        closeTimeout.current = setTimeout(() => {
            setOpen(false);
        }, 150);
    };

    return (
        <div
            ref={triggerRef}
            style={{
                position: "relative",
            }}
            onMouseEnter={() =>
                openMenu()
            }
            onMouseLeave={(e) => {
                const related = e.relatedTarget;

                if (
                    menuRef.current?.contains(related)
                ) {
                    return;
                }

                closeMenu();
            }}
        >
            {trigger}

            <FloatingLayer
                anchorRef={triggerRef}
                open={open}
                placement="right"
                offset={8}
            >
                <div
                    ref={menuRef}
                    onMouseEnter={() => openMenu()}
                    onMouseLeave={(e) => {
                        const related = e.relatedTarget;

                        if (
                            triggerRef.current?.contains(related)
                        ) {
                            return;
                        }

                        closeMenu();
                    }}
                    style={{
                        // change for width of dropdown
                        width: "196px",

                        background:
                            "rgba(20, 20, 20, 0)",

                        backdropFilter:
                            "blur(8px)",

                        border:
                            "1px solid rgba(255,255,255,0.10)",

                        boxShadow:
                            "0 20px 50px rgba(0,0,0,0.35)",

                        borderRadius: "18px",

                        padding: "8px",

                        display: "flex",

                        overflow: "visible",

                        flexDirection: "column",

                        gap: "4px",

                        zIndex: 2001,
                    }}
                >
                    {children}
                </div>
            </FloatingLayer>
        </div>
    );
}

export default SubmenuTrigger;