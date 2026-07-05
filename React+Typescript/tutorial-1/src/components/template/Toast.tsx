import React from "react";

/**
 * Position of the prop can be anyone of:
 * "left-center" | "left-top" | "left_bottom" | "centre" | "center-top" | "center-bottom" | "right-center" | "right-top" | "right-bottom"
*/

/* // Simple Life 
type ToastProps = {
    position: "left-center" | "left-top" | "left_bottom" | "centre" | "center-top" | "center-bottom" | "right-center" | "right-top" | "right-bottom"
} */

// Mentos Zindagi
type HorizontalPosition = 'left' | 'center' | 'right'
type VerticalPosition = 'top' | 'center' | 'bottom'
type ToastProps = {
    position: `${HorizontalPosition}-${VerticalPosition}` // contains all possible positions
}  

export const Toast = (props: ToastProps) => {
    return <>
        <div style={{
            backgroundColor: "blue",
            color:"white",
            fontFamily: "Helvetica",
            border: "green",
            textAlign: "center"
        }}>Toast Notification at - {props.position}</div>
    </>
};