import React from "react";

export default function NotificationCard({ notification }) {
  return (
    <div className="notification-card">
      <div className={notification.accent ? "blue-card" : undefined}>
        <div className="fix">
          <img src={notification.icon} alt={notification.iconAlt || "icon"} />
          <h3>{notification.title}</h3>
        </div>
        <p>{notification.description}</p>
        <div className="time">
          <p>{notification.time}</p>
        </div>
        {notification.actions && notification.actions.length > 0 && (
          <div className={notification.accent ? "delma" : "del"}>
            {notification.actions.map((action) => (
              <img key={action.icon} src={action.icon} alt={action.alt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

