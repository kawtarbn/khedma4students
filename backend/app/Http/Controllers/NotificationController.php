<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNotificationRequest;
use App\Http\Requests\UpdateNotificationRequest;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NotificationController extends Controller
{
    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }
    /**
     * Display a listing of notifications.
     *
     * @param Request $request
     * @return AnonymousResourceCollection|JsonResponse
     */
    public function index(Request $request): AnonymousResourceCollection|JsonResponse
    {
        try {
            // If user_id is not provided, use authenticated user
            $userId = $request->get('user_id', auth()->id());
            
            // Ensure user can only access their own notifications unless admin
            if ($userId != auth()->id() && !auth()->user()->is_admin) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $user = User::findOrFail($userId);
            $filters = $request->only(['type', 'is_read', 'unread_only', 'sort_by', 'sort_order', 'per_page']);
            $notifications = $this->notificationService->getUserNotifications($user, $filters);

            return NotificationResource::collection($notifications);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching notifications',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created notification.
     *
     * @param StoreNotificationRequest $request
     * @return JsonResponse
     */
    public function store(StoreNotificationRequest $request): JsonResponse
    {
        try {
            $notification = Notification::create($request->validated());

            return (new NotificationResource($notification))
                ->response()
                ->setStatusCode(201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating notification',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified notification.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $notification = Notification::find($id);

            if (!$notification) {
                return response()->json([
                    'message' => 'Notification not found'
                ], 404);
            }

            return response()->json(new NotificationResource($notification));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching notification',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified notification.
     *
     * @param UpdateNotificationRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UpdateNotificationRequest $request, int $id): JsonResponse
    {
        try {
            $notification = Notification::find($id);

            if (!$notification) {
                return response()->json([
                    'message' => 'Notification not found'
                ], 404);
            }

            $notification->update($request->validated());

            return response()->json(new NotificationResource($notification->fresh()));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating notification',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified notification.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $notification = Notification::find($id);

            if (!$notification) {
                return response()->json([
                    'message' => 'Notification not found'
                ], 404);
            }

            $notification->delete();

            return response()->json([
                'message' => 'Notification deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting notification',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mark a notification as read.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function markAsRead(int $id): JsonResponse
    {
        try {
            $notification = Notification::find($id);

            if (!$notification) {
                return response()->json([
                    'message' => 'Notification not found'
                ], 404);
            }

            $notification->markAsRead();

            return response()->json(new NotificationResource($notification->fresh()));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error marking notification as read',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mark all notifications as read for a specific user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function markAllAsRead(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id'
            ]);

            $updated = Notification::where('user_id', $request->user_id)
                ->where('is_read', false)
                ->update(['is_read' => true]);

            return response()->json([
                'message' => 'All notifications marked as read',
                'updated_count' => $updated
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error marking notifications as read',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get unread notification count for a user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function unreadCount(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id'
            ]);

            $count = Notification::where('user_id', $request->user_id)
                ->where('is_read', false)
                ->count();

            return response()->json([
                'user_id' => $request->user_id,
                'unread_count' => $count
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching unread count',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete all notifications for a user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAll(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id'
            ]);

            $deleted = Notification::where('user_id', $request->user_id)->delete();

            return response()->json([
                'message' => 'All notifications deleted successfully',
                'deleted_count' => $deleted
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting notifications',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get unread notification count for authenticated user.
     *
     * @return JsonResponse
     */
    public function unreadCountForUser(): JsonResponse
    {
        try {
            $user = auth()->user();
            $count = $this->notificationService->getUnreadCount($user);

            return response()->json([
                'user_id' => $user->id,
                'unread_count' => $count
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching unread count',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mark all notifications as read for authenticated user.
     *
     * @return JsonResponse
     */
    public function markAllAsReadForUser(): JsonResponse
    {
        try {
            $user = auth()->user();
            $updated = $this->notificationService->markAllAsRead($user);

            return response()->json([
                'message' => 'All notifications marked as read',
                'updated_count' => $updated
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error marking notifications as read',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete all read notifications for authenticated user.
     *
     * @return JsonResponse
     */
    public function deleteAllRead(): JsonResponse
    {
        try {
            $user = auth()->user();
            $deleted = Notification::where('user_id', $user->id)
                ->where('is_read', true)
                ->delete();

            return response()->json([
                'message' => 'All read notifications deleted successfully',
                'deleted_count' => $deleted
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting read notifications',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete all notifications for authenticated user.
     *
     * @return JsonResponse
     */
    public function deleteAllForUser(): JsonResponse
    {
        try {
            $user = auth()->user();
            $deleted = $this->notificationService->deleteAll($user);

            return response()->json([
                'message' => 'All notifications deleted successfully',
                'deleted_count' => $deleted
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting notifications',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

