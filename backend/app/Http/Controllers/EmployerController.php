<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class EmployerController extends Controller
{
    public function index()
    {
        return response()->json(Employer::all());
    }

    public function show($id)
    {
        $employer = Employer::find($id);
        if (!$employer) {
            return response()->json(['message' => 'Employer not found'], 404);
        }
        return response()->json($employer);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:employers,email',
            'password' => 'required|string|min:6',
            'company' => 'required|string|max:255',
            'city' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $employer = Employer::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'company' => $request->company,
            'city' => $request->city,
        ]);

        return response()->json($employer, 201);
    }

    public function update(Request $request, $id)
    {
        $employer = Employer::find($id);
        if (!$employer) {
            return response()->json(['message' => 'Employer not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'full_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:employers,email,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $employer->update($request->only([
            'full_name', 'email', 'company', 'city',
            'contact_person', 'phone', 'location', 'description'
        ]));

        return response()->json($employer);
    }

    public function destroy($id)
    {
        $employer = Employer::find($id);
        if (!$employer) {
            return response()->json(['message' => 'Employer not found'], 404);
        }
        $employer->delete();
        return response()->json(['message' => 'Employer deleted']);
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

        $employer = Employer::where('email', $request->email)->first();

        if (!$employer || !Hash::check($request->password, $employer->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json($employer);
    }

    public function getJobs($employerId)
    {
        return response()->json([]);
    }

    public function getApplications($employerId)
    {
        return response()->json([]);
    }
}