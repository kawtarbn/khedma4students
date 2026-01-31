<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NotificationPreference extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'email_notifications',
        'push_notifications',
        'application_notifications',
        'message_notifications',
        'review_notifications',
        'job_notifications',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_notifications' => 'boolean',
        'push_notifications' => 'boolean',
        'application_notifications' => 'boolean',
        'message_notifications' => 'boolean',
        'review_notifications' => 'boolean',
        'job_notifications' => 'boolean',
    ];

    /**
     * Get the user that owns the notification preferences.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if user should receive notifications of a specific type.
     */
    public function shouldReceiveNotification(string $type): bool
    {
        if (!$this->push_notifications) {
            return false;
        }

        $typeField = $type . '_notifications';
        return $this->{$typeField} ?? true;
    }
}
