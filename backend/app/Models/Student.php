<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens; 
use Illuminate\Foundation\Auth\User as Authenticatable; 
use Illuminate\Notifications\Notifiable;

class Student extends Authenticatable
{
    use HasApiTokens, Notifiable; 

    protected $fillable = [
        'full_name',
        'email',
        'password',
        'university',
        'city',
        'phone',
        'location',
        'major',
        'year_of_study',
        'bio'
    ];

    protected $hidden = ['password'];
}
