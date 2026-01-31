<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestModel extends Model
{
    use HasFactory;

    
    protected $table = 'requests';

    protected $fillable = [
        'title',
        'description',
        'category',
        'city',
        'contactEmail',
        'contactPhone',
        'pay',
        'availability',
        'status'
    ];
}
