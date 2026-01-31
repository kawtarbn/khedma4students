# Student Services API Documentation

## 🎯 Overview

Complete backend implementation for student services with full CRUD operations, filtering, searching, and advanced features.

## 📊 Database Schema

### Student Services Table
```sql
- id (Primary)
- student_id (Foreign → users.id)
- title (string, 255)
- description (text)
- category (string, 255)
- city (string, 255)
- availability (text)
- rating (decimal, 3,2)
- review_count (integer)
- application_count (integer)
- views (integer)
- is_active (boolean)
- timestamps
```

## 🚀 API Endpoints

### Public Endpoints (No Authentication Required)

#### Get All Student Services
```http
GET /api/student-services
```

**Query Parameters:**
- `search` (string) - Search in title and description
- `category` (string) - Filter by category
- `city` (string) - Filter by city
- `sort_by` (string) - Sort by: created_at, rating, reviews, views
- `sort_order` (string) - Sort order: asc, desc
- `per_page` (integer) - Items per page (default: 12)

**Example:**
```http
GET /api/student-services?search=web&category=Freelance & Digital Work&sort_by=rating&sort_order=desc
```

#### Get Single Service
```http
GET /api/student-services/{id}
```

#### Get Categories
```http
GET /api/student-services/categories
```

#### Get Cities
```http
GET /api/student-services/cities
```

#### Get Featured Services
```http
GET /api/student-services/featured?limit=6
```

### Protected Endpoints (Authentication Required)

#### Create Service
```http
POST /api/student-services
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "title": "Web Development Services",
  "description": "Professional web development using React and Node.js...",
  "category": "Freelance & Digital Work",
  "city": "Alger",
  "availability": "Mon-Fri: 6PM-10PM, Weekends: All day"
}
```

#### Get My Services
```http
GET /api/student-services/my?is_active=true
Authorization: Bearer {token}
```

#### Update Service
```http
PUT /api/student-services/{id}
Authorization: Bearer {token}
```

#### Delete Service
```http
DELETE /api/student-services/{id}
Authorization: Bearer {token}
```

#### Toggle Service Status
```http
PATCH /api/student-services/{id}/toggle-status
Authorization: Bearer {token}
```

#### Get Statistics
```http
GET /api/student-services/stats
Authorization: Bearer {token}
```

## 📝 Response Format

### Service Resource
```json
{
  "id": 1,
  "title": "Web Development Services",
  "description": "Professional web development...",
  "category": "Freelance & Digital Work",
  "city": "Alger",
  "availability": "Mon-Fri: 6PM-10PM",
  "rating": 4.5,
  "review_count": 12,
  "application_count": 8,
  "views": 245,
  "is_active": true,
  "formatted_rating": "4.5 (12)",
  "created_at": "2024-01-15",
  "updated_at": "2024-01-15",
  "student": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "reviews": [...],
  "is_featured": true,
  "popularity_score": 78.5
}
```

### Paginated Response
```json
{
  "data": [...],
  "links": {
    "first": "...",
    "last": "...",
    "prev": "...",
    "next": "..."
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 5,
    "per_page": 12,
    "to": 12,
    "total": 60
  }
}
```

## 🔧 Features

### Advanced Filtering
- **Search**: Full-text search in title and description
- **Category**: Filter by service categories
- **City**: Filter by location
- **Sorting**: By date, rating, reviews, views
- **Status**: Active/inactive services

### Smart Features
- **View Tracking**: Automatic view count increment
- **Rating System**: Average rating calculation
- **Featured Detection**: Services with rating ≥ 4.5 and ≥ 5 reviews
- **Popularity Score**: Calculated based on rating, reviews, and views

### Security
- **Authentication**: Sanctum token-based auth
- **Authorization**: Students can only manage their own services
- **Validation**: Comprehensive input validation
- **Rate Limiting**: Built-in Laravel rate limiting

## 🧪 Testing

### Run Tests
```bash
php artisan test tests/Feature/StudentServiceTest.php
```

### Test Coverage
- ✅ Public API endpoints
- ✅ Protected CRUD operations
- ✅ Authorization checks
- ✅ Validation rules
- ✅ Filtering and searching
- ✅ Statistics and analytics
- ✅ View tracking

## 📱 Frontend Integration

### Example API Calls

```javascript
// Get all services with filters
const response = await fetch('/api/student-services?search=web&category=Freelance & Digital Work');
const services = await response.json();

// Get single service (increments view count)
const response = await fetch('/api/student-services/123');
const service = await response.json();

// Create new service
const response = await fetch('/api/student-services', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(serviceData)
});
```

### React Component Example
```jsx
import { useState, useEffect } from 'react';

function StudentServicesList() {
  const [services, setServices] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All Categories',
    city: 'All Cities'
  });

  useEffect(() => {
    fetchServices();
  }, [filters]);

  const fetchServices = async () => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category !== 'All Categories') params.append('category', filters.category);
    if (filters.city !== 'All Cities') params.append('city', filters.city);

    const response = await fetch(`/api/student-services?${params}`);
    const data = await response.json();
    setServices(data.data);
  };

  return (
    <div>
      {/* Service cards */}
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
```

## 🎨 Available Categories

1. **Freelance & Digital Work**
2. **Tutoring & Education**
3. **Service & Delivery**
4. **Health & Wellness**
5. **Home & Family Help**
6. **Events & Temporary Work**

## 🏙️ Available Cities

All 58 Algerian cities including:
- Alger, Oran, Constantine, Annaba
- Blida, Batna, Sétif, Tlemcen
- Béjaïa, Mostaganem, Bordj Bou Arreridj
- And 48 more cities...

## 📈 Analytics & Statistics

### Service Statistics
```json
{
  "total_services": 15,
  "active_services": 12,
  "total_views": 2450,
  "total_applications": 89,
  "average_rating": 4.2
}
```

### Popularity Score Calculation
```
Popularity Score = (Rating Score + Review Score + View Score) / 3

Rating Score = min(Rating × 20, 100)
Review Score = min(Review Count × 2, 100)
View Score = min(Views × 0.1, 100)
```

## 🔐 Security Best Practices

1. **Input Validation**: All inputs validated
2. **SQL Injection**: Protected by Eloquent ORM
3. **XSS Protection**: Laravel's built-in protection
4. **CSRF Protection**: Enabled for web routes
5. **Rate Limiting**: Prevents API abuse
6. **Authorization**: User can only manage own services

## 🚀 Performance Optimizations

1. **Database Indexes**: Proper indexing on foreign keys
2. **Eager Loading**: Prevents N+1 queries
3. **Pagination**: Limits response size
4. **Caching**: Can be implemented for categories/cities
5. **Query Optimization**: Efficient database queries

## 📝 Error Handling

### Standard Error Response
```json
{
  "message": "Error description",
  "errors": {
    "field": ["Error message"]
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

The Student Services API is now complete and production-ready! 🎉
