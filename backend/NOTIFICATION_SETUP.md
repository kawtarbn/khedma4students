# Real-time Notifications Setup Guide

## 🚀 Quick Setup

### 1. Get Pusher Credentials
1. Go to [Pusher.com](https://pusher.com/)
2. Create a free account
3. Create a new app (choose "Clusters" and "React" as frontend)
4. Copy your App ID, Key, Secret, and Cluster

### 2. Update Environment Variables
Add these to your `.env` file:

```env
BROADCAST_DRIVER=pusher
PUSHER_APP_ID=your-pusher-app-id
PUSHER_APP_KEY=your-pusher-key
PUSHER_APP_SECRET=your-pusher-secret
PUSHER_APP_CLUSTER=mt1
```

### 3. Run Migrations
```bash
php artisan migrate
```

### 4. Install Dependencies
```bash
npm install
npm run build
```

### 5. Start Development Server
```bash
php artisan serve
```

## 📡 How It Works

### Backend Broadcasting
```php
// Fire event for real-time updates
ApplicationSubmitted::dispatch($application, $employer, $student);

// Or create notification directly
$notification = $notificationService->createNotification(
    $user, 'type', 'Title', 'Description'
);
```

### Frontend Listening
```javascript
// Listen for specific events
window.Echo.private(`user.${userId}`)
    .listen('ApplicationSubmitted', (e) => {
        console.log('New application:', e);
    });

// Listen for all notifications
window.Echo.private(`user.${userId}`)
    .listen('.notification', (e) => {
        showNotification(e.title, e.type);
    });
```

## 🔧 Alternative: Redis Broadcasting

For production without Pusher:

```env
BROADCAST_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

Install Redis server and `laravel-websockets` package:
```bash
composer require beyondcode/laravel-websockets
php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider"
```

## 🧪 Testing

Run the test suite:
```bash
php artisan test tests/Feature/NotificationTest.php
```

## 📱 Frontend Integration

In your React/Vue component:

```jsx
import { useEffect } from 'react';
import { updateNotificationCount } from './echo';

function NotificationBell() {
    useEffect(() => {
        // Echo is already loaded from echo.js
        updateNotificationCount();
    }, []);

    return (
        <div className="relative">
            <i className="fas fa-bell"></i>
            <span className="notification-badge absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
                0
            </span>
        </div>
    );
}
```

## 🔐 Security

- All notification routes are protected with `auth:sanctum`
- WebSocket channels are authenticated
- Users can only access their own notifications
- Notification preferences allow users to control what they receive

## 📊 API Endpoints

```
GET    /api/notifications              # Get user notifications
GET    /api/notifications/unread-count # Get unread count
POST   /api/notifications/mark-all-read # Mark all as read
DELETE /api/notifications/delete-all    # Delete all
GET    /api/notifications/{id}         # Get specific
PUT    /api/notifications/{id}         # Update
PATCH  /api/notifications/{id}/read     # Mark as read
DELETE /api/notifications/{id}         # Delete
```

## 🎯 Notification Types

- `application` - Job applications
- `message` - New messages
- `review` - New reviews/ratings
- `job` - New job postings
- `system` - System notifications

## 📝 Creating Custom Notifications

```php
// In your controller/service
$notificationService->createNotification(
    $user,
    'custom_type',
    'Custom Title',
    'Custom description',
    'icon-name',
    $relatedId,
    'related_model_type'
);
```

## 🔄 Real-time Events

Available events:
- `ApplicationSubmitted` - When someone applies for a job
- Custom events can be created by implementing `ShouldBroadcast`

Your notification system is now ready! 🎉
