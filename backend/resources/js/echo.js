import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true
});

// Listen for application notifications
window.Echo.private(`user.${userId}`)
    .listen('ApplicationSubmitted', (e) => {
        console.log('New application submitted:', e);
        // Show notification in UI
        showNotification(e.message, 'info');
        
        // Update notification count
        updateNotificationCount();
    });

// Generic notification listener
window.Echo.private(`user.${userId}`)
    .listen('.notification', (e) => {
        console.log('New notification:', e);
        showNotification(e.title, e.type);
        updateNotificationCount();
    });

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function updateNotificationCount() {
    // Fetch updated count from API
    fetch('/api/notifications/unread-count')
        .then(response => response.json())
        .then(data => {
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.textContent = data.unread_count;
                badge.style.display = data.unread_count > 0 ? 'block' : 'none';
            }
        });
}
