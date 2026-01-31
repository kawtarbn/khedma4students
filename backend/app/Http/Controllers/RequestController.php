<?php

namespace App\Http\Controllers;
use App\Models\RequestModel;
use Illuminate\Http\Request as HttpRequest;


class RequestController extends Controller
{
    public function index()
    {
        return response()->json(RequestModel::all());
    }

    public function show($id)
    {
        return response()->json(RequestModel::findOrFail($id));
    }

    public function store(HttpRequest $request)
    {
        return response()->json(
            RequestModel::create($request->all()),
            201
        );
    }

    public function update(HttpRequest $request, $id)
    {
        $req = RequestModel::findOrFail($id);
        $req->update($request->all());
        return response()->json($req);
    }

    public function destroy($id)
    {
        RequestModel::findOrFail($id)->delete();
        return response()->json(['message' => 'Request deleted']);
    }

    
}
