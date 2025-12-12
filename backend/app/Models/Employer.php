<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name', 'email', 'password', 'company', 'city',
        'contact_person', 'phone', 'location', 'description'
    ];

    protected $hidden = ['password'];
}