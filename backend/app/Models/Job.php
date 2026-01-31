<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Job model.
 * Assumes a jobs table already exists (created by teammate).
 * Expected columns: id, title, description, category, city, employer_id, created_at, updated_at
 */
class Job extends Model
{
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
}
