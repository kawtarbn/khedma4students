<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Employer;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // ---------------- STUDENT LOGIN ----------------
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $student = Student::where('email', $request->email)->first();

        if (!$student || !Hash::check($request->password, $student->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $student->createToken('student-token')->plainTextToken;

        return response()->json([
            'student' => $student,
            'token' => $token
        ]);
    }

    // ---------------- STUDENT LOGOUT ----------------
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    // ---------------- EMPLOYER LOGIN ----------------
    public function employerLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $employer = Employer::where('email', $request->email)->first();

        if (!$employer || !Hash::check($request->password, $employer->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $employer->createToken('employer-token')->plainTextToken;

        return response()->json([
            'employer' => $employer,
            'token' => $token
        ]);
    }

    // ---------------- EMPLOYER LOGOUT ----------------
    public function employerLogout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
