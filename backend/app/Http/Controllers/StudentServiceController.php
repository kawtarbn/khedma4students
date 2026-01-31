<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentServiceRequest;
use App\Http\Requests\UpdateStudentServiceRequest;
use App\Http\Resources\StudentServiceResource;
use App\Models\StudentService;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StudentServiceController extends Controller
{
    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Display a listing of student services.
     */
    public function index(Request $request): AnonymousResourceCollection|JsonResponse
    {
        try {
            $query = StudentService::with(['student', 'reviews'])->active();

            // Search functionality
            if ($request->has('search')) {
                $query->search($request->search);
            }

            // Filter by category
            if ($request->has('category') && $request->category !== 'All Categories') {
                $query->ofCategory($request->category);
            }

            // Filter by city
            if ($request->has('city') && $request->city !== 'All Cities') {
                $query->inCity($request->city);
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');

            switch ($sortBy) {
                case 'rating':
                    $query->orderByRating($sortOrder);
                    break;
                case 'reviews':
                    $query->orderByReviews($sortOrder);
                    break;
                case 'views':
                    $query->orderBy('views', $sortOrder);
                    break;
                default:
                    $query->orderBy($sortBy, $sortOrder);
                    break;
            }

            // Pagination
            $perPage = $request->get('per_page', 12);
            $services = $query->paginate($perPage);

            return StudentServiceResource::collection($services);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching student services',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created student service.
     */
    public function store(StoreStudentServiceRequest $request): JsonResponse
    {
        try {
            $service = StudentService::create([
                'student_id' => auth()->id(),
                'title' => $request->title,
                'description' => $request->description,
                'category' => $request->category,
                'city' => $request->city,
                'availability' => $request->availability,
            ]);

            return response()->json(new StudentServiceResource($service), 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating student service',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified student service.
     */
    public function show(int $id): JsonResponse
    {
        try {
            $service = StudentService::with(['student', 'reviews'])
                ->active()
                ->findOrFail($id);

            // Increment view count
            $service->incrementViews();

            return response()->json(new StudentServiceResource($service));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching student service',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified student service.
     */
    public function update(UpdateStudentServiceRequest $request, int $id): JsonResponse
    {
        try {
            $service = StudentService::where('student_id', auth()->id())
                ->findOrFail($id);

            $service->update($request->validated());

            return response()->json(new StudentServiceResource($service->fresh()));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating student service',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified student service.
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $service = StudentService::where('student_id', auth()->id())
                ->findOrFail($id);

            $service->delete();

            return response()->json([
                'message' => 'Student service deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting student service',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get services for the authenticated student.
     */
    public function myServices(Request $request): AnonymousResourceCollection|JsonResponse
    {
        try {
            $query = StudentService::where('student_id', auth()->id())
                ->with(['reviews']);

            // Filter by status
            if ($request->has('is_active')) {
                $query->where('is_active', $request->boolean('is_active'));
            }

            $services = $query->latest()->paginate($request->get('per_page', 10));

            return StudentServiceResource::collection($services);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching your services',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle service active status.
     */
    public function toggleStatus(int $id): JsonResponse
    {
        try {
            $service = StudentService::where('student_id', auth()->id())
                ->findOrFail($id);

            $service->update(['is_active' => !$service->is_active]);

            return response()->json([
                'message' => 'Service status updated successfully',
                'is_active' => $service->is_active
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating service status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get available categories.
     */
    public function getCategories(): JsonResponse
    {
        return response()->json([
            'categories' => StudentService::getAvailableCategories()
        ]);
    }

    /**
     * Get available cities.
     */
    public function getCities(): JsonResponse
    {
        return response()->json([
            'cities' => StudentService::getAvailableCities()
        ]);
    }

    /**
     * Get featured services.
     */
    public function featured(Request $request): AnonymousResourceCollection|JsonResponse
    {
        try {
            $services = StudentService::with(['student', 'reviews'])
                ->active()
                ->orderByRating('desc')
                ->orderBy('review_count', 'desc')
                ->take($request->get('limit', 6))
                ->get();

            return StudentServiceResource::collection($services);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching featured services',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get services statistics for dashboard.
     */
    public function getStats(): JsonResponse
    {
        try {
            $studentId = auth()->id();
            
            $stats = [
                'total_services' => StudentService::where('student_id', $studentId)->count(),
                'active_services' => StudentService::where('student_id', $studentId)->active()->count(),
                'total_views' => StudentService::where('student_id', $studentId)->sum('views'),
                'total_applications' => StudentService::where('student_id', $studentId)->sum('application_count'),
                'average_rating' => StudentService::where('student_id', $studentId)->avg('rating') ?? 0,
            ];

            return response()->json($stats);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
