import React from "react";

const Notification = ({ error, success }) => {
  if (error) {
    return <div className="notification error">{error}</div>;
  } else if (success) {
    return <div className="notification success">{success}</div>;
  }

  return null;
};

export default Notification;
