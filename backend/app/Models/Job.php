<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'city',
        'employer_id',
    ];

    /**
     * Job belongs to one employer.
     */
    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }

    /**
     * Job has many applications.
     */
    public function applications()
    {
        return $this->hasMany(Application::class);
    }
        'contactEmail',
        'contactPhone',
        'status'
    ];
}
