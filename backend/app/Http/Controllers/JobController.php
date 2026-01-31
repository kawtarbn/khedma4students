<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

/**
 * Handles job listing and filtering only.
 * Job creation, update, deletion are handled by teammates.
 */
class JobController extends Controller
{
    /**
     * List jobs with optional filters (search, category, city).
     * Query params: search, category, city
     * - search: matches job title OR description (partial, case-insensitive)
     * - category: exact match; omit or "All Categories" = no filter
     * - city: exact match; omit or "All Cities" = no filter
     */
    public function index(Request $request)
    {
        $query = Job::query()->with('employer');

        // Search: job title OR description
        if ($request->filled('search')) {
            $term = $request->input('search');
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', '%' . $term . '%')
                  ->orWhere('description', 'like', '%' . $term . '%');
            });
        }

        // Filter by category (skip if empty or "All Categories")
        if ($request->filled('category') && $request->input('category') !== 'All Categories') {
            $query->where('category', $request->input('category'));
        }

        // Filter by city (skip if empty or "All Cities")
        if ($request->filled('city') && $request->input('city') !== 'All Cities') {
            $query->where('city', $request->input('city'));
        }

        $jobs = $query->orderBy('created_at', 'desc')->get();

        // Optional: append employer name for frontend (author/company)
        $jobs->each(function ($job) {
            $job->author = $job->employer ? $job->employer->company : null;
            $job->email = $job->employer ? $job->employer->email : null;
        });

        return response()->json($jobs);
    }

    /**
     * Get a single job by ID (for job details page).
     */
    public function show($id)
    {
        $job = Job::with('employer')->find($id);
        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }
        $job->author = $job->employer ? $job->employer->company : null;
        $job->email = $job->employer ? $job->employer->email : null;
        return response()->json($job);
    }
}
