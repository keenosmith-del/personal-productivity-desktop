import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function FloatingLayer({
    anchorRef,
    open,
    children,
    layerRef,
    placement = "bottom",
    offset = 8,
    refreshKey,
}) {
    const [position, setPosition] =
        useState({
            top: 0,
            left: 0,
            transform: "",
        });

    const MENU_WIDTH = 196;

    useEffect(() => {
        if (!open || !anchorRef?.current)
            return;

        const rect =
            anchorRef.current.getBoundingClientRect();

        let top;
        let left;
        let transform = "";

        switch (placement) {

            case "right": {

                top = rect.top + rect.height / 2;

                const fitsRight =
                    rect.right + offset + MENU_WIDTH <
                    window.innerWidth;

                if (fitsRight) {
                    left = rect.right + offset;
                    transform = "translateY(-50%)";
                } else {
                    left = rect.left - offset;
                    transform = "translate(-100%, -50%)";
                }

                break;
            }

            case "left": {

                top = rect.top + rect.height / 2;

                const fitsLeft =
                    rect.left - offset - MENU_WIDTH >
                    0;

                if (fitsLeft) {
                    left = rect.left - offset;
                    transform = "translate(-100%, -50%)";
                } else {
                    left = rect.right + offset;
                    transform = "translateY(-50%)";
                }

                break;
            }

            case "top":

                top = rect.top - offset;

                left = rect.left + rect.width / 2;

                transform = "translate(-50%, -100%)";

                break;

            default: {

                top = rect.bottom + offset;

                const fitsRight =
                    rect.left + MENU_WIDTH <
                    window.innerWidth;

                if (fitsRight) {
                    left = rect.left;
                    transform = "";
                } else {
                    left = rect.right;
                    transform = "translateX(-100%)";
                }

                break;
            }
        }

        setPosition({
            top,
            left,
            transform,
        });

    }, [
        open,
        anchorRef,
        placement,
        offset,
        refreshKey,
    ]);

    if (!open) return null;

    return createPortal(
        <div
            ref={layerRef}
            style={{
                position: "fixed",

                top: position.top,

                left: position.left,

                transform: position.transform,

                zIndex: 9999,
            }}
        >
            {children}
        </div>,
        document.body
    );
}

export default FloatingLayer;