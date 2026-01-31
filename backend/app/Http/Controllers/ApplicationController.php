<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Handles apply to job (store) and student's own applications (update, destroy).
 * Notifications are handled by teammate (do not implement here).
 */
class ApplicationController extends Controller
{
    /**
     * Store a new application (Apply to Job).
     * Required: student_id, job_id, fullname, email.
     * Optional: phone, message, status (default pending).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|exists:students,id',
            'job_id'    => 'required|exists:jobs,id',
            'fullname'  => 'required|string|max:255',
            'email'     => 'required|email',
            'phone'     => 'nullable|string|max:50',
            'message'   => 'nullable|string|max:2000',
            'status'    => 'nullable|string|in:pending,accepted,rejected,completed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Prevent duplicate application (same student + job)
        $exists = Application::where('student_id', $request->student_id)
            ->where('job_id', $request->job_id)
            ->exists();
        if ($exists) {
            return response()->json(
                ['message' => 'You have already applied to this job.'],
                422
            );
        }

        $application = Application::create([
            'student_id' => $request->student_id,
            'job_id'     => $request->job_id,
            'fullname'   => $request->fullname,
            'email'      => $request->email,
            'phone'      => $request->phone,
            'message'    => $request->message,
            'status'     => $request->input('status', 'pending'),
        ]);

        $application->load('job');
        return response()->json($application, 201);
    }

    /**
     * Update an application. Student can update ONLY their own.
     * Request must include student_id (for ownership check when auth is not used).
     */
    public function update(Request $request, $id)
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        // Ownership: student can only update their own application
        $studentId = $request->input('student_id');
        if (!$studentId || (int) $application->student_id !== (int) $studentId) {
            return response()->json(['message' => 'Unauthorized to update this application'], 403);
        }

        $validator = Validator::make($request->all(), [
            'fullname' => 'sometimes|required|string|max:255',
            'email'    => 'sometimes|required|email',
            'phone'    => 'nullable|string|max:50',
            'message'  => 'nullable|string|max:2000',
            'status'   => 'nullable|string|in:pending,accepted,rejected,completed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $application->update($request->only(['fullname', 'email', 'phone', 'message', 'status']));
        $application->load('job');
        return response()->json($application);
    }

    /**
     * Delete an application. Student can delete ONLY their own.
     * Request must include student_id: use query param ?student_id= for DELETE (e.g. /api/applications/1?student_id=5).
     */
    public function destroy(Request $request, $id)
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $studentId = $request->query('student_id') ?? $request->input('student_id');
        if (!$studentId || (int) $application->student_id !== (int) $studentId) {
            return response()->json(['message' => 'Unauthorized to delete this application'], 403);
        }

        $application->delete();
        return response()->json(['message' => 'Application deleted']);
    }
}
