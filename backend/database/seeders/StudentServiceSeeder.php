<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\StudentService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample students if they don't exist
        $students = [
            [
                'name' => 'Amina Kaci',
                'email' => 'amina.kaci@email.dz',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'Youcef Meziane',
                'email' => 'youcef.meziane@email.dz',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'Sarah Hadj',
                'email' => 'sarah.hadj@email.dz',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'Karim Belkacem',
                'email' => 'karim.belkacem@email.dz',
                'password' => bcrypt('password'),
            ],
        ];

        foreach ($students as $studentData) {
            $student = User::firstOrCreate(
                ['email' => $studentData['email']],
                $studentData
            );
        }

        // Create sample services
        $services = [
            [
                'title' => 'Graphic Designer Available for Freelance Work',
                'description' => 'Computer Science student offering graphic design services. Experienced in logos, posters, social media content. Available evenings and weekends.',
                'category' => 'Freelance & Digital Work',
                'city' => 'Oran',
                'availability' => 'Mon-Fri: 6PM-10PM, Weekends: All day',
                'rating' => 4.8,
                'review_count' => 8,
                'student_email' => 'amina.kaci@email.dz',
            ],
            [
                'title' => 'Web Developer Available - React & Node.js',
                'description' => 'Engineering student specializing in web development. Can build websites, web apps, and provide maintenance. Proficient in modern frameworks.',
                'category' => 'Freelance & Digital Work',
                'city' => 'Annaba',
                'availability' => 'Flexible schedule, remote preferred',
                'rating' => 5.0,
                'review_count' => 15,
                'student_email' => 'youcef.meziane@email.dz',
            ],
            [
                'title' => 'English Lessons Available - All Levels',
                'description' => 'Bilingual student offering English lessons for all levels. IELTS preparation available. Patient and experienced tutor with proven results.',
                'category' => 'Tutoring & Education',
                'city' => 'Tlemcen',
                'availability' => 'Tue/Thu/Sat 2PM-6PM',
                'rating' => 4.9,
                'review_count' => 20,
                'student_email' => 'sarah.hadj@email.dz',
            ],
            [
                'title' => 'Translation Services - French/Arabic/English',
                'description' => 'Languages student offering professional translation services. Quick delivery and accurate translations. Documents, websites, and content.',
                'category' => 'Freelance & Digital Work',
                'city' => 'Alger',
                'availability' => 'Available every day',
                'rating' => 4.6,
                'review_count' => 11,
                'student_email' => 'karim.belkacem@email.dz',
            ],
            [
                'title' => 'Mathematics Tutoring - High School & University',
                'description' => 'Mathematics major offering tutoring services. Specialized in algebra, calculus, and statistics. Help with homework and exam preparation.',
                'category' => 'Tutoring & Education',
                'city' => 'Constantine',
                'availability' => 'Weekdays 4PM-8PM, Weekends 10AM-2PM',
                'rating' => 4.7,
                'review_count' => 13,
                'student_email' => 'amina.kaci@email.dz',
            ],
            [
                'title' => 'Home Delivery Services - Local Area',
                'description' => 'Reliable delivery service for packages, food, and documents. Fast and secure delivery within the city. Available on short notice.',
                'category' => 'Service & Delivery',
                'city' => 'Blida',
                'availability' => 'Daily 9AM-9PM',
                'rating' => 4.3,
                'review_count' => 6,
                'student_email' => 'youcef.meziane@email.dz',
            ],
            [
                'title' => 'Photography Services - Events & Portraits',
                'description' => 'Photography student offering professional photography services. Events, portraits, product photography. High-quality images with editing.',
                'category' => 'Freelance & Digital Work',
                'city' => 'Sétif',
                'availability' => 'Flexible, including weekends',
                'rating' => 4.9,
                'review_count' => 18,
                'student_email' => 'sarah.hadj@email.dz',
            ],
            [
                'title' => 'Personal Fitness Training',
                'description' => 'Sports science student offering personal training services. Custom workout plans, nutrition advice, and progress tracking. Home or gym sessions.',
                'category' => 'Health & Wellness',
                'city' => 'Oran',
                'availability' => 'Early mornings and evenings',
                'rating' => 4.5,
                'review_count' => 9,
                'student_email' => 'karim.belkacem@email.dz',
            ],
        ];

        foreach ($services as $serviceData) {
            $student = User::where('email', $serviceData['student_email'])->first();
            
            StudentService::create([
                'student_id' => $student->id,
                'title' => $serviceData['title'],
                'description' => $serviceData['description'],
                'category' => $serviceData['category'],
                'city' => $serviceData['city'],
                'availability' => $serviceData['availability'],
                'rating' => $serviceData['rating'],
                'review_count' => $serviceData['review_count'],
                'application_count' => rand(5, 25),
                'views' => rand(50, 300),
                'is_active' => true,
            ]);
        }

        $this->command->info('Student services seeded successfully!');
    }
}
