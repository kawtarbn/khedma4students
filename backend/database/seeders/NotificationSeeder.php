<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Notification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create sample users
        $student = User::firstOrCreate(
            ['email' => 'student@example.com'],
            [
                'name' => 'Test Student',
                'password' => bcrypt('password'),
                'role' => 'student',
            ]
        );

        $employer = User::firstOrCreate(
            ['email' => 'employer@example.com'],
            [
                'name' => 'Test Employer',
                'password' => bcrypt('password'),
                'role' => 'employer',
            ]
        );

        // Create sample notifications for student
        $studentNotifications = [
            [
                'user_id' => $student->id,
                'type' => 'application_received',
                'title' => 'New Application Received',
                'description' => 'Your application for "Web Developer" position has been received by Tech Company.',
                'icon' => 'briefcase',
                'is_read' => false,
                'created_at' => now()->subHours(2),
            ],
            [
                'user_id' => $student->id,
                'type' => 'message',
                'title' => 'New Message',
                'description' => 'You have a new message from Sarah about the graphic design project.',
                'icon' => 'message',
                'is_read' => false,
                'created_at' => now()->subHours(5),
            ],
            [
                'user_id' => $student->id,
                'type' => 'rating',
                'title' => 'New Rating Received',
                'description' => 'You received a 5-star rating from John Doe for your tutoring services.',
                'icon' => 'star',
                'is_read' => true,
                'created_at' => now()->subDays(1),
            ],
            [
                'user_id' => $student->id,
                'type' => 'system',
                'title' => 'Service Expiring Soon',
                'description' => 'Your "Graphic Design Services" post will expire in 2 days. Renew it to keep it active.',
                'icon' => 'exclamation',
                'is_read' => true,
                'created_at' => now()->subDays(2),
            ],
        ];

        // Create sample notifications for employer
        $employerNotifications = [
            [
                'user_id' => $employer->id,
                'type' => 'application_received',
                'title' => 'New Job Application',
                'description' => 'Amina Kaci applied for your "Web Developer" position.',
                'icon' => 'briefcase',
                'is_read' => false,
                'created_at' => now()->subHours(1),
            ],
            [
                'user_id' => $employer->id,
                'type' => 'service_contact',
                'title' => 'Service Contact Request',
                'description' => 'Youcef Meziane is interested in your "Graphic Design Services" and sent you a message.',
                'icon' => 'message',
                'is_read' => false,
                'created_at' => now()->subHours(3),
            ],
            [
                'user_id' => $employer->id,
                'type' => 'system',
                'title' => 'Job Post Expiring Soon',
                'description' => 'Your "Mobile App Developer" job post will expire in 3 days.',
                'icon' => 'exclamation',
                'is_read' => true,
                'created_at' => now()->subDays(1),
            ],
        ];

        // Insert notifications
        foreach ($studentNotifications as $notification) {
            Notification::create($notification);
        }

        foreach ($employerNotifications as $notification) {
            Notification::create($notification);
        }

        $this->command->info('Sample notifications created successfully!');
    }
}
