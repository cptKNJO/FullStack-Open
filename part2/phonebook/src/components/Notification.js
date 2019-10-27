import React from "react";

const Notification = ({ successMessage, errorMessage }) => {
    if (successMessage !== null) {
        return <div className="success">{successMessage}</div>
    }
    if (errorMessage !== null) {
        return <div className="error">{errorMessage}</div>
    }

    return <div></div>
}

export default Notification;