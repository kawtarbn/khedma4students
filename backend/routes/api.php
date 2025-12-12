<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\EmployerController;

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