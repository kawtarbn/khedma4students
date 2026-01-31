<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Notification;
use App\Services\NotificationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class NotificationTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        Sanctum::actingAs($this->user);
    }

    public function test_user_can_get_their_notifications(): void
    {
        Notification::factory()->count(3)->create(['user_id' => $this->user->id]);
        Notification::factory()->count(2)->create(); // Notifications for other users

        $response = $this->getJson('/api/notifications');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_user_can_get_unread_notifications_only(): void
    {
        Notification::factory()->count(2)->create(['user_id' => $this->user->id, 'is_read' => false]);
        Notification::factory()->count(1)->create(['user_id' => $this->user->id, 'is_read' => true]);

        $response = $this->getJson('/api/notifications?unread_only=true');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
    }

    public function test_user_can_get_unread_count(): void
    {
        Notification::factory()->count(3)->create(['user_id' => $this->user->id, 'is_read' => false]);
        Notification::factory()->count(2)->create(['user_id' => $this->user->id, 'is_read' => true]);

        $response = $this->getJson('/api/notifications/unread-count');

        $response->assertStatus(200)
            ->assertJson([
                'user_id' => $this->user->id,
                'unread_count' => 3
            ]);
    }

    public function test_user_can_mark_notification_as_read(): void
    {
        $notification = Notification::factory()->create(['user_id' => $this->user->id, 'is_read' => false]);

        $response = $this->patchJson("/api/notifications/{$notification->id}/read");

        $response->assertStatus(200);
        $this->assertDatabaseHas('notifications', [
            'id' => $notification->id,
            'is_read' => true
        ]);
    }

    public function test_user_can_mark_all_notifications_as_read(): void
    {
        Notification::factory()->count(3)->create(['user_id' => $this->user->id, 'is_read' => false]);

        $response = $this->postJson('/api/notifications/mark-all-read');

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'All notifications marked as read',
                'updated_count' => 3
            ]);
    }

    public function test_user_can_delete_notification(): void
    {
        $notification = Notification::factory()->create(['user_id' => $this->user->id]);

        $response = $this->deleteJson("/api/notifications/{$notification->id}");

        $response->assertStatus(200)
            ->assertJson(['message' => 'Notification deleted successfully']);
        
        $this->assertDatabaseMissing('notifications', ['id' => $notification->id]);
    }

    public function test_user_can_delete_all_notifications(): void
    {
        Notification::factory()->count(3)->create(['user_id' => $this->user->id]);

        $response = $this->deleteJson('/api/notifications/delete-all');

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'All notifications deleted successfully',
                'deleted_count' => 3
            ]);
    }

    public function test_user_cannot_access_other_users_notifications(): void
    {
        $otherUser = User::factory()->create();
        $notification = Notification::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->getJson("/api/notifications/{$notification->id}");

        $response->assertStatus(404);
    }

    public function test_notification_service_creates_notification(): void
    {
        $service = new NotificationService();

        $notification = $service->createNotification(
            $this->user,
            'test',
            'Test Notification',
            'This is a test notification',
            'bell'
        );

        $this->assertDatabaseHas('notifications', [
            'id' => $notification->id,
            'user_id' => $this->user->id,
            'type' => 'test',
            'title' => 'Test Notification',
            'description' => 'This is a test notification',
            'icon' => 'bell'
        ]);
    }
}
