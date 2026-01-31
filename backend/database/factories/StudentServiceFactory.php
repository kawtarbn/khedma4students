<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentService>
 */
class StudentServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Freelance & Digital Work',
            'Tutoring & Education',
            'Service & Delivery',
            'Health & Wellness',
            'Home & Family Help',
            'Events & Temporary Work',
        ];

        $cities = [
            'Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna',
            'Sétif', 'Tlemcen', 'Béjaïa', 'Mostaganem', 'Bordj Bou Arreridj',
            'Boumerdès', 'El Oued', 'Skikda', 'Jijel', 'Biskra', 'Béchar',
            'Tébessa', 'Tiaret', 'Médéa', 'Tizi Ouzou', 'Mila', 'Aïn Defla',
        ];

        $titles = [
            'Graphic Designer Available for Freelance Work',
            'Web Development Services - React & Node.js',
            'Professional Photography Services',
            'English Lessons Available - All Levels',
            'Translation Services - French/Arabic/English',
            'Mathematics Tutoring - High School Level',
            'Home Delivery Services Available',
            'Event Planning and Coordination',
            'Social Media Management',
            'Content Writing Services',
            'Video Editing and Production',
            'Mobile App Development',
            'Personal Fitness Training',
            'Home Cleaning Services',
            'Pet Care Services',
        ];

        $availabilities = [
            'Mon-Fri: 6PM-10PM, Weekends: All day',
            'Flexible schedule, remote preferred',
            'Tue/Thu/Sat 2PM-6PM',
            'Available every day 9AM-6PM',
            'Weekends only, flexible hours',
            'Evenings after 5PM',
            'Remote work available worldwide',
            'Local services only, same day available',
        ];

        return [
            'student_id' => User::factory(),
            'title' => $this->faker->randomElement($titles),
            'description' => $this->faker->sentence(15) . ' ' . $this->faker->sentence(10),
            'category' => $this->faker->randomElement($categories),
            'city' => $this->faker->randomElement($cities),
            'availability' => $this->faker->randomElement($availabilities),
            'rating' => $this->faker->randomFloat(1, 3.0, 5.0),
            'review_count' => $this->faker->numberBetween(0, 50),
            'application_count' => $this->faker->numberBetween(0, 30),
            'views' => $this->faker->numberBetween(10, 500),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the service is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Create a service with high rating.
     */
    public function highRated(): static
    {
        return $this->state(fn (array $attributes) => [
            'rating' => $this->faker->randomFloat(1, 4.5, 5.0),
            'review_count' => $this->faker->numberBetween(10, 50),
        ]);
    }

    /**
     * Create a service with many views.
     */
    public function popular(): static
    {
        return $this->state(fn (array $attributes) => [
            'views' => $this->faker->numberBetween(200, 1000),
            'application_count' => $this->faker->numberBetween(20, 100),
        ]);
    }

    /**
     * Create a service in a specific category.
     */
    public function category(string $category): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => $category,
        ]);
    }

    /**
     * Create a service in a specific city.
     */
    public function city(string $city): static
    {
        return $this->state(fn (array $attributes) => [
            'city' => $city,
        ]);
    }
}
