<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use GuzzleHttp\Psr7\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();



        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {


            $query->where("name", "LIKE", "%" . request("name") . "%");
        }

        if (request("status")) {


            $query->where("status", request("status"));
        }

        $projects = $query->orderBy($sortField, $sortDirection)->paginate(5);

        return inertia("Project/Index", [
            'projects' =>  ProjectResource::collection($projects),
            "queryParams" => request()->query() ?: null,
            "success" => session("success")


        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {

        $data = $request->validated();

        $image = $data["image"] ?? null;

        $data["created_by"] = Auth::user()->id;
        $data["updated_by"] = Auth::user()->id;


        if ($image) {
            $img_path = $image->store("images", "public");
        }

        $data["image_path"] = $img_path;

        Project::create($data);

        return   to_route("project.index")->with("success", "Project successfully created!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {

        $query = $project->tasks();
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");


        if (request("name")) {

            $query->where("name", "LIKE", "%" . request("name") .  "%");
        }

        if (request("status")) {


            $query->where("status", "LIKE", "%" . request("status") . "%");
        }



        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(5);

        return inertia("Project/Show", [
            "project" => new ProjectResource($project),
            "tasks" =>  TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {



        return inertia("Project/Edit", [

            "project" => new  ProjectResource($project),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {


        // dd($request->name);
        $name = $request->name;


        $image = $request->image ?? null;

        $data = $request->validated();
        $data["updated_by"] = Auth::user()->id;



        if ($image) {

            if ($project->image_path) {
                Storage::disk("public")->delete($project->image_path);
            }

            $img_path = $image->store("images", "public");
            $data["image_path"] = $img_path;
        }

        $project->update($data);

        return    to_route("project.index")->with("success", "Project " . $name . " successfully updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //

        // Project::delete($project);

        $name = $project->name;


        $project->delete();



        if ($project->image_path) {
            Storage::disk("public")->delete($project->image_path);
        }



        return   to_route("project.index")->with("success", "Project " . $name . " successfully deleted");
    }
}
