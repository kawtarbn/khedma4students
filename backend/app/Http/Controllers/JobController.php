<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index() { return response()->json(Job::all()); }
    public function show($id) { return response()->json(Job::findOrFail($id)); }
    public function store(Request $request) { return response()->json(Job::create($request->all()), 201); }
    public function update(Request $request, $id) {
        $job = Job::findOrFail($id);
        $job->update($request->all());
        return response()->json($job);
    }
    public function destroy($id) {
        Job::findOrFail($id)->delete();
        return response()->json(['message' => 'Job deleted']);
    }
}
