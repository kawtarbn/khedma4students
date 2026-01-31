<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index()
    {
        return response()->json(Student::all());
    }

    public function show($id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        return response()->json($student);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'password' => 'required|string|min:6',
            'university' => 'required|string|max:255',
            'city' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $student = Student::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'university' => $request->university,
            'city' => $request->city,
        ]);

        return response()->json($student, 201);
    }

    public function update(Request $request, $id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'full_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:students,email,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $student->update($request->only([
            'full_name', 'email', 'phone', 'location',
            'university', 'major', 'year_of_study', 'bio'
        ]));

        return response()->json($student);
    }

    public function destroy($id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $student->delete();
        return response()->json(['message' => 'Student deleted']);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $student = Student::where('email', $request->email)->first();

        if (!$student || !Hash::check($request->password, $student->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json(['student' => $student]);
    }

    public function getServices($studentId)
    {
        return response()->json([]);
    }

    /**
     * Get applications for the given student (My Applications).
     * Returns applications with job and employer info for display.
     */
    public function getApplications($studentId)
    {
        $applications = Application::where('student_id', $studentId)
            ->with(['job', 'job.employer'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Shape for frontend: title, employer_name, status, created_at, etc.
        $data = $applications->map(function ($app) {
            return [
                'id'            => $app->id,
                'student_id'    => $app->student_id,
                'job_id'        => $app->job_id,
                'title'         => $app->job ? $app->job->title : null,
                'employer_name' => $app->job && $app->job->employer ? $app->job->employer->company : null,
                'status'        => $app->status,
                'fullname'      => $app->fullname,
                'email'         => $app->email,
                'phone'         => $app->phone,
                'message'       => $app->message,
                'created_at'    => $app->created_at,
                'updated_at'    => $app->updated_at,
            ];
        });

        return response()->json($data);
    }
}