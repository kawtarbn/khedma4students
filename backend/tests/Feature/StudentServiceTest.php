<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\StudentService;
use App\Http\Resources\StudentServiceResource;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class StudentServiceTest extends TestCase
{
    use RefreshDatabase;

    protected User $student;
    protected User $otherStudent;

    protected function setUp(): void
    {
        parent::setUp();
        $this->student = User::factory()->create();
        $this->otherStudent = User::factory()->create();
        Sanctum::actingAs($this->student);
    }

    public function test_can_get_student_services_publicly(): void
    {
        StudentService::factory()->count(3)->create(['is_active' => true]);
        StudentService::factory()->create(['is_active' => false]);

        $response = $this->getJson('/api/student-services');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_can_get_single_student_service(): void
    {
        $service = StudentService::factory()->create(['is_active' => true]);

        $response = $this->getJson("/api/student-services/{$service->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'id',
                'title',
                'description',
                'category',
                'city',
                'availability',
                'rating',
                'review_count',
                'student' => [
                    'id',
                    'name',
                    'email'
                ]
            ]);
    }

    public function test_can_create_student_service(): void
    {
        $serviceData = [
            'title' => 'Web Development Services',
            'description' => 'Professional web development using React and Node.js. Available for freelance projects.',
            'category' => 'Freelance & Digital Work',
            'city' => 'Alger',
            'availability' => 'Mon-Fri: 6PM-10PM, Weekends: All day',
        ];

        $response = $this->postJson('/api/student-services', $serviceData);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'title' => $serviceData['title'],
                'category' => $serviceData['category'],
                'city' => $serviceData['city'],
            ]);

        $this->assertDatabaseHas('student_services', [
            'student_id' => $this->student->id,
            'title' => $serviceData['title'],
        ]);
    }

    public function test_can_update_own_student_service(): void
    {
        $service = StudentService::factory()->create([
            'student_id' => $this->student->id
        ]);

        $updateData = [
            'title' => 'Updated Service Title',
            'description' => 'Updated description with more details.',
        ];

        $response = $this->putJson("/api/student-services/{$service->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'title' => $updateData['title'],
            ]);

        $this->assertDatabaseHas('student_services', [
            'id' => $service->id,
            'title' => $updateData['title'],
        ]);
    }

    public function test_cannot_update_other_student_service(): void
    {
        $service = StudentService::factory()->create([
            'student_id' => $this->otherStudent->id
        ]);

        $updateData = [
            'title' => 'Updated Service Title',
        ];

        $response = $this->putJson("/api/student-services/{$service->id}", $updateData);

        $response->assertStatus(404);
    }

    public function test_can_delete_own_student_service(): void
    {
        $service = StudentService::factory()->create([
            'student_id' => $this->student->id
        ]);

        $response = $this->deleteJson("/api/student-services/{$service->id}");

        $response->assertStatus(200)
            ->assertJson(['message' => 'Student service deleted successfully']);

        $this->assertDatabaseMissing('student_services', ['id' => $service->id]);
    }

    public function test_cannot_delete_other_student_service(): void
    {
        $service = StudentService::factory()->create([
            'student_id' => $this->otherStudent->id
        ]);

        $response = $this->deleteJson("/api/student-services/{$service->id}");

        $response->assertStatus(404);
    }

    public function test_can_get_my_services(): void
    {
        StudentService::factory()->count(3)->create([
            'student_id' => $this->student->id
        ]);
        StudentService::factory()->count(2)->create([
            'student_id' => $this->otherStudent->id
        ]);

        $response = $this->getJson('/api/student-services/my');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_can_toggle_service_status(): void
    {
        $service = StudentService::factory()->create([
            'student_id' => $this->student->id,
            'is_active' => true
        ]);

        $response = $this->patchJson("/api/student-services/{$service->id}/toggle-status");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'is_active' => false
            ]);

        $this->assertDatabaseHas('student_services', [
            'id' => $service->id,
            'is_active' => false
        ]);
    }

    public function test_can_get_categories(): void
    {
        $response = $this->getJson('/api/student-services/categories');

        $response->assertStatus(200)
            ->assertJsonStructure(['categories']);
    }

    public function test_can_get_cities(): void
    {
        $response = $this->getJson('/api/student-services/cities');

        $response->assertStatus(200)
            ->assertJsonStructure(['cities']);
    }

    public function test_can_get_featured_services(): void
    {
        StudentService::factory()->highRated()->count(3)->create(['is_active' => true]);
        StudentService::factory()->create(['rating' => 3.0, 'is_active' => true]);

        $response = $this->getJson('/api/student-services/featured');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_search_functionality(): void
    {
        $service1 = StudentService::factory()->create([
            'title' => 'Web Development Services',
            'is_active' => true
        ]);
        $service2 = StudentService::factory()->create([
            'title' => 'Photography Services',
            'is_active' => true
        ]);

        $response = $this->getJson('/api/student-services?search=web');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['title' => 'Web Development Services']);
    }

    public function test_filter_by_category(): void
    {
        StudentService::factory()->create([
            'category' => 'Freelance & Digital Work',
            'is_active' => true
        ]);
        StudentService::factory()->create([
            'category' => 'Tutoring & Education',
            'is_active' => true
        ]);

        $response = $this->getJson('/api/student-services?category=Freelance & Digital Work');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    public function test_filter_by_city(): void
    {
        StudentService::factory()->create(['city' => 'Alger', 'is_active' => true]);
        StudentService::factory()->create(['city' => 'Oran', 'is_active' => true]);

        $response = $this->getJson('/api/student-services?city=Alger');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    public function test_validation_on_create(): void
    {
        $response = $this->postJson('/api/student-services', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'description', 'category', 'city', 'availability']);
    }

    public function test_can_get_statistics(): void
    {
        StudentService::factory()->count(3)->create([
            'student_id' => $this->student->id,
            'rating' => 4.5,
            'views' => 100,
            'application_count' => 10
        ]);

        $response = $this->getJson('/api/student-services/stats');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'total_services',
                'active_services',
                'total_views',
                'total_applications',
                'average_rating'
            ]);
    }

    public function test_view_count_increments(): void
    {
        $service = StudentService::factory()->create([
            'views' => 10,
            'is_active' => true
        ]);

        $this->getJson("/api/student-services/{$service->id}");

        $this->assertEquals(11, $service->fresh()->views);
    }
}
