<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'student_id',
        'job_id',
        'fullname',
        'email',
        'phone',
        'message',
        'status',
    ];

    /**
     * Application belongs to a student.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Application belongs to a job.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
