import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationCard from "../components/NotificationCard";


const notifications = [
  {
    title: "New Application Received",
    description: "Amina Kaci sent you a message about the graphic design project",
    time: "10d ago",
    icon: "media/briefcase.png",
    iconAlt: "bag",
    accent: true,
    actions: [
      { icon: "media/delete.png", alt: "delete" },
      { icon: "media/read (1).png", alt: "mark read" },
    ],
  },
  {
    title: "New Message",
    description: "Amina Kaci sent you a message about the graphic design project",
    time: "10d ago",
    icon: "media/message.png",
    iconAlt: "message",
    accent: true,
    actions: [
      { icon: "media/delete.png", alt: "delete" },
      { icon: "media/read (1).png", alt: "mark read" },
    ],
  },
  {
    title: "New Rating Recieved",
    description: "You received a 5-star rating from Youcef Meziane",
    time: "11d ago",
    icon: "media/star (1).png",
    iconAlt: "star",
    actions: [{ icon: "media/delete.png", alt: "delete" }],
  },
  {
    title: "Job Expiring Soon",
    description: 'Your "Web Developer Available" post will expire in 2 days',
    time: "11d ago",
    icon: "media/exclamation.png",
    iconAlt: "exclamation",
    actions: [{ icon: "media/delete.png", alt: "delete" }],
  },
  {
    title: "Application Accepted",
    description: 'Your application for "Café Assistant" has been accepted!',
    time: "12d ago",
    icon: "media/briefcase.png",
    iconAlt: "bag",
    actions: [{ icon: "media/delete.png", alt: "delete" }],
  },
  {
    title: "New Message",
    description: "Pizza Express replied to your inquiry about delivery timing",
    time: "12d ago",
    icon: "media/message.png",
    iconAlt: "message",
    actions: [{ icon: "media/delete.png", alt: "delete" }],
  },
  {
    title: "Rating Reminder",
    description: "Don't forget to rate your experience with Leila Boudiaf",
    time: "13d ago",
    icon: "media/star (1).png",
    iconAlt: "star",
    actions: [{ icon: "media/delete.png", alt: "delete" }],
  },
];

export default function Notifications() {
  return (
    <div>
      <Header variant="guest" />
      <Header variant="student" />
      <Header variant="employer" />

      <section className="Notifications">
        <div className="notifi">
          <img src="media/bell.png" alt="bell" />
          <h2>Notifications</h2>
        </div>
        <div className="unread">
          <p>2 unread</p>
        </div>

        {notifications.map((item) => (
          <NotificationCard key={item.title + item.time} notification={item} />
        ))}
      </section>

      <Footer />
    </div>
  );
}

