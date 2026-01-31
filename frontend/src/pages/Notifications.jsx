import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationCard from "../components/NotificationCard";
import "../styles/Notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState("all"); // all, unread, read

  // Fetch notifications from API
  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, [filter]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");
      
      let url = 'http://127.0.0.1:8000/api/notifications';
      
      // Add filter parameter
      if (filter === "unread") {
        url += '?unread_only=true';
      } else if (filter === "read") {
        url += '?is_read=true';
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      
      const data = await response.json();
      setNotifications(data.data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      // Fallback to mock data if API fails
      setNotifications(getMockNotifications(filter));
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/notifications/unread-count');
      
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.unread_count || 0);
      }
    } catch (err) {
      console.error('Error fetching unread count:', err);
      setUnreadCount(getMockNotifications("unread").length);
    }
  };

  const getMockNotifications = (filterType = "all") => {
    const allNotifications = [
      {
        id: 1,
        title: "New Application Received",
        description: "Amina Kaci sent you a message about the graphic design project",
        time: "2 hours ago",
        icon: "media/briefcase.png",
        iconAlt: "bag",
        accent: true,
        is_read: false,
        type: "application",
        actions: [
          { icon: "media/delete.png", alt: "delete" },
          { icon: "media/read (1).png", alt: "mark read" },
        ],
      },
      {
        id: 2,
        title: "New Message",
        description: "Youcef Meziane sent you a message about web development services",
        time: "5 hours ago",
        icon: "media/message.png",
        iconAlt: "message",
        accent: true,
        is_read: false,
        type: "message",
        actions: [
          { icon: "media/delete.png", alt: "delete" },
          { icon: "media/read (1).png", alt: "mark read" },
        ],
      },
      {
        id: 3,
        title: "New Rating Received",
        description: "You received a 5-star rating from Sarah Hadj for your tutoring services",
        time: "1 day ago",
        icon: "media/star (1).png",
        iconAlt: "star",
        is_read: true,
        type: "rating",
        actions: [{ icon: "media/delete.png", alt: "delete" }],
      },
      {
        id: 4,
        title: "Service Expiring Soon",
        description: 'Your "Web Developer Available" post will expire in 2 days',
        time: "2 days ago",
        icon: "media/exclamation.png",
        iconAlt: "exclamation",
        is_read: true,
        type: "system",
        actions: [{ icon: "media/delete.png", alt: "delete" }],
      },
      {
        id: 5,
        title: "Application Accepted",
        description: 'Your application for "Café Assistant" has been accepted!',
        time: "3 days ago",
        icon: "media/briefcase.png",
        iconAlt: "bag",
        is_read: true,
        type: "application",
        actions: [{ icon: "media/delete.png", alt: "delete" }],
      },
      {
        id: 6,
        title: "Service Contact Request",
        description: "Karim Belkacem is interested in your graphic design services",
        time: "4 days ago",
        icon: "media/message.png",
        iconAlt: "message",
        is_read: true,
        type: "message",
        actions: [{ icon: "media/delete.png", alt: "delete" }],
      },
    ];

    if (filterType === "unread") {
      return allNotifications.filter(n => !n.is_read);
    } else if (filterType === "read") {
      return allNotifications.filter(n => n.is_read);
    }
    return allNotifications;
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/notifications/${notificationId}/read`, {
        method: 'PATCH'
      });
      
      if (response.ok) {
        setNotifications(prev => 
          prev.map(notif => 
            notif.id === notificationId ? { ...notif, is_read: true } : notif
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
      // Fallback for mock data
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/notifications/${notificationId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        const deletedNotif = notifications.find(n => n.id === notificationId);
        setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
        if (deletedNotif && !deletedNotif.is_read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
      // Fallback for mock data
      const deletedNotif = notifications.find(n => n.id === notificationId);
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      if (deletedNotif && !deletedNotif.is_read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/notifications/mark-all-read', {
        method: 'PATCH'
      });
      
      if (response.ok) {
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, is_read: true }))
        );
        setUnreadCount(0);
      }
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      // Fallback for mock data
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, is_read: true }))
      );
      setUnreadCount(0);
    }
  };

  const handleDeleteAllRead = async () => {
    const readNotifications = notifications.filter(n => n.is_read);
    
    try {
      // Try API first
      for (const notification of readNotifications) {
        await fetch(`http://127.0.0.1:8000/api/notifications/${notification.id}`, {
          method: 'DELETE'
        });
      }
      setNotifications(prev => prev.filter(notif => !notif.is_read));
    } catch (err) {
      console.error('Error deleting read notifications:', err);
      // Fallback for mock data
      setNotifications(prev => prev.filter(notif => !notif.is_read));
    }
  };

  return (
    <div>
      <Header variant="guest" />
      <Header variant="student" />
      <Header variant="employer" />

      <section className="notifications-container">
        {/* Header */}
        <div className="notifications-header">
          <div className="notifications-title">
            <img src="media/bell.png" alt="bell" className="bell-icon" />
            <div>
              <h2>Notifications</h2>
              <p className="unread-count">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className="notifications-actions">
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllAsRead}
                className="btn btn-primary"
              >
                Mark All as Read
              </button>
            )}
            
            <button 
              onClick={handleDeleteAllRead}
              className="btn btn-secondary"
            >
              Clear Read
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {['all', 'unread', 'read'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`filter-tab ${filter === filterType ? 'active' : ''}`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              {filterType === 'unread' && unreadCount > 0 && (
                <span className="unread-badge">{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading notifications...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <div className="error-message">Error loading notifications</div>
            <button onClick={fetchNotifications} className="btn btn-danger">
              Try Again
            </button>
          </div>
        )}

        {/* Notifications List */}
        {!loading && !error && (
          <>
            {notifications.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>No notifications yet</h3>
                <p>
                  {filter === 'unread' ? 'All caught up!' : 'Check back later for updates'}
                </p>
              </div>
            ) : (
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id || notification.title + notification.time}
                    className={`notification-card ${notification.is_read ? 'read' : 'unread'}`}
                    onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
                  >
                    <div className="notification-content">
                      <img 
                        src={notification.icon} 
                        alt={notification.iconAlt} 
                        className="notification-icon"
                      />
                      
                      <div className="notification-details">
                        <div className="notification-header">
                          <h3 className="notification-title">
                            {notification.title}
                          </h3>
                          <span className="notification-time">
                            {notification.time}
                          </span>
                        </div>
                        
                        <p className="notification-description">
                          {notification.description}
                        </p>
                        
                        <div className="notification-actions">
                          {!notification.is_read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsRead(notification.id);
                              }}
                              className="btn btn-success btn-small"
                            >
                              ✓ Mark as Read
                            </button>
                          )}
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(notification.id);
                            }}
                            className="btn btn-danger btn-small"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}

