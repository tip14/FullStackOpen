import React from "react";
import "../index.css";

const Notification = ({ data }) => {
  if (!data.message) return null;

  const notificationClass = data.success
    ? "success-notification"
    : "error-notification";

  return <p className={notificationClass}>{data.message}</p>;
};

export default Notification;
