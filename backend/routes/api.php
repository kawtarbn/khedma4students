<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\StudentServiceController;
use Illuminate\Support\Facades\Auth;

// Student routes
Route::get('/students', [StudentController::class, 'index']);
Route::get('/students/{id}', [StudentController::class, 'show']);
Route::post('/students', [StudentController::class, 'store']);
Route::put('/students/{id}', [StudentController::class, 'update']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);
Route::post('/login', [StudentController::class, 'login']);
Route::get('/students/{id}/services', [StudentController::class, 'getServices']);
Route::get('/students/{id}/applications', [StudentController::class, 'getApplications']);

// Employer routes
Route::get('/employers', [EmployerController::class, 'index']);
Route::get('/employers/{id}', [EmployerController::class, 'show']);
Route::post('/employers', [EmployerController::class, 'store']);
Route::put('/employers/{id}', [EmployerController::class, 'update']);
Route::delete('/employers/{id}', [EmployerController::class, 'destroy']);
Route::post('/employer-login', [EmployerController::class, 'login']);
Route::get('/employers/{id}/jobs', [EmployerController::class, 'getJobs']);
Route::get('/employers/{id}/applications', [EmployerController::class, 'getApplications']);

// Student Services routes (Public)
Route::get('/student-services', [StudentServiceController::class, 'index']);
Route::get('/student-services/{id}', [StudentServiceController::class, 'show']);
Route::get('/student-services/categories', [StudentServiceController::class, 'getCategories']);
Route::get('/student-services/cities', [StudentServiceController::class, 'getCities']);
Route::get('/student-services/featured', [StudentServiceController::class, 'featured']);

// Student Services routes (Protected)
Route::middleware('auth:sanctum')->prefix('student-services')->group(function () {
    // Create new service
    Route::post('/', [StudentServiceController::class, 'store']);
    
    // Get my services
    Route::get('/my', [StudentServiceController::class, 'myServices']);
    
    // Update service
    Route::put('/{id}', [StudentServiceController::class, 'update']);
    Route::patch('/{id}', [StudentServiceController::class, 'update']);
    
    // Delete service
    Route::delete('/{id}', [StudentServiceController::class, 'destroy']);
    
    // Toggle service status
    Route::patch('/{id}/toggle-status', [StudentServiceController::class, 'toggleStatus']);
    
    // Get statistics
    Route::get('/stats', [StudentServiceController::class, 'getStats']);
});

// Notification routes (REST API) - Protected
Route::middleware('auth:sanctum')->prefix('notifications')->group(function () {
    // Get all notifications with optional filters
    Route::get('/', [NotificationController::class, 'index']);
    
    // Get unread count for authenticated user
    Route::get('/unread-count', [NotificationController::class, 'unreadCountForUser']);
    
    // Create a new notification
    Route::post('/', [NotificationController::class, 'store']);
    
    // Get specific notification
    Route::get('/{id}', [NotificationController::class, 'show']);
    
    // Update notification
    Route::put('/{id}', [NotificationController::class, 'update']);
    Route::patch('/{id}', [NotificationController::class, 'update']);
    
    // Delete specific notification
    Route::delete('/{id}', [NotificationController::class, 'destroy']);
    
    // Mark specific notification as read
    Route::patch('/{id}/read', [NotificationController::class, 'markAsRead']);
    
    // Mark all notifications as read
    Route::patch('/mark-all-read', [NotificationController::class, 'markAllAsReadForUser']);
    
    // Delete all read notifications
    Route::delete('/read', [NotificationController::class, 'deleteAllRead']);
    
    // Delete all notifications
    Route::delete('/all', [NotificationController::class, 'deleteAllForUser']);
});