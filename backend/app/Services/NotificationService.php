<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class NotificationService
{
    /**
     * Create a new notification for a user.
     */
    public function createNotification(User $user, string $type, string $title, string $description, ?string $icon = null, ?int $relatedId = null, ?string $relatedType = null): Notification
    {
        return Notification::create([
            'user_id' => $user->id,
            'type' => $type,
            'title' => $title,
            'description' => $description,
            'icon' => $icon,
            'related_id' => $relatedId,
            'related_type' => $relatedType,
        ]);
    }

    /**
     * Create notification for multiple users.
     */
    public function createBulkNotifications(array $userIds, string $type, string $title, string $description, ?string $icon = null, ?int $relatedId = null, ?string $relatedType = null): Collection
    {
        $notifications = collect();
        
        foreach ($userIds as $userId) {
            $notifications->push(Notification::create([
                'user_id' => $userId,
                'type' => $type,
                'title' => $title,
                'description' => $description,
                'icon' => $icon,
                'related_id' => $relatedId,
                'related_type' => $relatedType,
            ]));
        }
        
        return $notifications;
    }

    /**
     * Get notifications for a user with filters.
     */
    public function getUserNotifications(User $user, array $filters = [])
    {
        $query = Notification::where('user_id', $user->id);

        // Filter by type
        if (isset($filters['type'])) {
            $query->ofType($filters['type']);
        }

        // Filter by read status
        if (isset($filters['is_read'])) {
            $query->where('is_read', $filters['is_read']);
        }

        // Filter unread only
        if (isset($filters['unread_only']) && $filters['unread_only']) {
            $query->unread();
        }

        // Sorting
        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $filters['per_page'] ?? 15;

        return $query->paginate($perPage);
    }

    /**
     * Get unread notification count for a user.
     */
    public function getUnreadCount(User $user): int
    {
        return Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->count();
    }

    /**
     * Mark all notifications as read for a user.
     */
    public function markAllAsRead(User $user): int
    {
        return Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);
    }

    /**
     * Delete all notifications for a user.
     */
    public function deleteAll(User $user): int
    {
        return Notification::where('user_id', $user->id)->delete();
    }

    /**
     * Create application submitted notification.
     */
    public function applicationSubmitted(User $employer, int $applicationId, string $studentName, string $jobTitle): Notification
    {
        return $this->createNotification(
            $employer,
            'application',
            'New Application Received',
            "{$studentName} has applied for the position: {$jobTitle}",
            'briefcase',
            $applicationId,
            'application'
        );
    }

    /**
     * Create application status update notification.
     */
    public function applicationStatusUpdated(User $student, int $applicationId, string $status, string $jobTitle): Notification
    {
        return $this->createNotification(
            $student,
            'application',
            'Application Status Updated',
            "Your application for {$jobTitle} has been {$status}",
            'clipboard-check',
            $applicationId,
            'application'
        );
    }

    /**
     * Create new job posted notification.
     */
    public function jobPosted(array $studentIds, int $jobId, string $jobTitle, string $companyName): Collection
    {
        return $this->createBulkNotifications(
            $studentIds,
            'job',
            'New Job Posted',
            "{$companyName} has posted a new position: {$jobTitle}",
            'briefcase',
            $jobId,
            'job'
        );
    }

    /**
     * Create review notification.
     */
    public function reviewReceived(User $user, int $reviewId, string $reviewerName, int $rating): Notification
    {
        return $this->createNotification(
            $user,
            'review',
            'New Review Received',
            "{$reviewerName} has rated you {$rating} stars",
            'star',
            $reviewId,
            'review'
        );
    }

    /**
     * Create message notification.
     */
    public function messageReceived(User $user, int $messageId, string $senderName): Notification
    {
        return $this->createNotification(
            $user,
            'message',
            'New Message',
            "You have received a new message from {$senderName}",
            'message-circle',
            $messageId,
            'message'
        );
    }
}
