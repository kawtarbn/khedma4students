<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['application', 'message', 'review', 'job', 'system'];
        $type = $this->faker->randomElement($types);

        return [
            'user_id' => User::factory(),
            'type' => $type,
            'title' => match($type) {
                'application' => 'New Application Received',
                'message' => 'New Message',
                'review' => 'New Review',
                'job' => 'New Job Posted',
                'system' => 'System Notification',
                default => 'Notification'
            },
            'description' => $this->faker->sentence(),
            'icon' => $this->faker->randomElement(['bell', 'message-circle', 'star', 'briefcase', 'info']),
            'is_read' => $this->faker->boolean(30), // 30% chance of being read
            'related_id' => $this->faker->optional()->numberBetween(1, 1000),
            'related_type' => $this->faker->optional()->randomElement(['job', 'application', 'review', 'message']),
        ];
    }

    /**
     * Indicate that the notification is unread.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_read' => false,
        ]);
    }

    /**
     * Indicate that the notification is read.
     */
    public function read(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_read' => true,
        ]);
    }

    /**
     * Create an application notification.
     */
    public function application(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'application',
            'title' => 'New Application Received',
            'icon' => 'briefcase',
            'related_type' => 'application',
        ]);
    }

    /**
     * Create a message notification.
     */
    public function message(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'message',
            'title' => 'New Message',
            'icon' => 'message-circle',
            'related_type' => 'message',
        ]);
    }

    /**
     * Create a review notification.
     */
    public function review(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'review',
            'title' => 'New Review',
            'icon' => 'star',
            'related_type' => 'review',
        ]);
    }
}
