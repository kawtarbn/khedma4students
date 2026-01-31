# Notification Testing Guide

## 🎯 Sample Data Created

I've created sample notifications for testing:

### **Test Users Created:**
- **Student:** `student@example.com` / `password`
- **Employer:** `employer@example.com` / `password`

### **Sample Notifications:**

#### **For Student (student@example.com):**
1. **New Application Received** (unread) - 2 hours ago
2. **New Message** (unread) - 5 hours ago  
3. **New Rating Received** (read) - 1 day ago
4. **Service Expiring Soon** (read) - 2 days ago

#### **For Employer (employer@example.com):**
1. **New Job Application** (unread) - 1 hour ago
2. **Service Contact Request** (unread) - 3 hours ago
3. **Job Post Expiring Soon** (read) - 1 day ago

## 🧪 Testing Examples

### **1. Test API Endpoints**

#### **Get All Notifications:**
```bash
# For student (ID 1)
curl -X GET "http://127.0.0.1:8000/api/notifications?user_id=1" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN"

# For employer (ID 2)  
curl -X GET "http://127.0.0.1:8000/api/notifications?user_id=2" \
  -H "Accept: application/json"
```

#### **Get Unread Count:**
```bash
curl -X GET "http://127.0.0.1:8000/api/notifications/unread-count?user_id=1" \
  -H "Accept: application/json"
```

#### **Mark as Read:**
```bash
curl -X PATCH "http://127.0.0.1:8000/api/notifications/1/read" \
  -H "Accept: application/json"
```

#### **Delete Notification:**
```bash
curl -X DELETE "http://127.0.0.1:8000/api/notifications/1" \
  -H "Accept: application/json"
```

#### **Mark All as Read:**
```bash
curl -X PATCH "http://127.0.0.1:8000/api/notifications/mark-all-read?user_id=1" \
  -H "Accept: application/json"
```

### **2. Test Frontend**

#### **Step 1: Login as Student**
```javascript
// In browser console
localStorage.setItem('studentId', '1');
localStorage.setItem('studentName', 'Test Student');
window.location.reload();
```

#### **Step 2: Navigate to Notifications**
```
http://localhost:3000/Notifications
```

#### **Step 3: Test Features**
- ✅ See 2 unread notifications
- ✅ Click "Mark All as Read" 
- ✅ Click individual notification actions
- ✅ Delete notifications
- ✅ Mark as read individually

#### **Step 4: Login as Employer**
```javascript
// In browser console
localStorage.setItem('employerId', '2');
localStorage.setItem('employerName', 'Test Employer');
window.location.reload();
```

### **3. Test with Postman**

#### **Collection Setup:**
```json
{
  "info": {
    "name": "Notification API Tests"
  },
  "item": [
    {
      "name": "Get Notifications",
      "request": {
        "method": "GET",
        "url": "http://127.0.0.1:8000/api/notifications",
        "header": [
          {
            "key": "Accept",
            "value": "application/json"
          }
        ]
      }
    }
  ]
}
```

### **4. Test Notification Creation**

#### **Create New Notification:**
```bash
curl -X POST "http://127.0.0.1:8000/api/notifications" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "user_id": 1,
    "type": "message",
    "title": "Test Notification",
    "description": "This is a test notification",
    "icon": "message"
  }'
```

### **5. Test Filtering**

#### **Filter by Type:**
```bash
curl -X GET "http://127.0.0.1:8000/api/notifications?type=message&user_id=1"
```

#### **Filter Unread Only:**
```bash
curl -X GET "http://127.0.0.1:8000/api/notifications?unread_only=true&user_id=1"
```

#### **Sort by Date:**
```bash
curl -X GET "http://127.0.0.1:8000/api/notifications?sort_by=created_at&sort_order=desc&user_id=1"
```

## 🔍 Expected Results

### **API Responses:**

#### **Get Notifications:**
```json
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "type": "application_received",
      "title": "New Application Received",
      "description": "Your application for \"Web Developer\" position has been received by Tech Company.",
      "icon": "briefcase",
      "is_read": false,
      "created_at": "2024-01-31T13:00:00.000000Z",
      "updated_at": "2024-01-31T13:00:00.000000Z"
    }
  ],
  "links": {...},
  "meta": {...}
}
```

#### **Unread Count:**
```json
{
  "unread_count": 2
}
```

### **Frontend Behavior:**

✅ **Notifications page loads** with sample data  
✅ **Unread count shows** correct number  
✅ **Mark as Read** updates notification status  
✅ **Delete** removes notification  
✅ **Mark All as Read** clears all unread  

## 🚀 Quick Test Script

### **Test All Endpoints:**
```bash
#!/bin/bash

BASE_URL="http://127.0.0.1:8000/api"

echo "Testing Notification API..."

# Test 1: Get notifications
echo "1. Getting notifications..."
curl -s "$BASE_URL/notifications?user_id=1" | jq .

# Test 2: Get unread count
echo "2. Getting unread count..."
curl -s "$BASE_URL/notifications/unread-count?user_id=1" | jq .

# Test 3: Mark as read
echo "3. Marking notification as read..."
curl -s -X PATCH "$BASE_URL/notifications/1/read" | jq .

# Test 4: Create notification
echo "4. Creating notification..."
curl -s -X POST "$BASE_URL/notifications" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "type": "test",
    "title": "Test Notification",
    "description": "This is a test"
  }' | jq .

echo "Testing complete!"
```

## 📱 Mobile Testing

### **Test on Mobile:**
1. Open browser in mobile mode
2. Navigate to `/Notifications`
3. Test responsive design
4. Test touch interactions

## 🎯 Success Criteria

✅ **API returns correct data**  
✅ **Frontend displays notifications**  
✅ **Actions work** (mark read, delete)  
✅ **Unread count updates**  
✅ **Error handling works**  
✅ **Loading states show**  

Start testing with the sample data I created! 🚀
