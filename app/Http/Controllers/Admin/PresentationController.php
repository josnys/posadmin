<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PresentationRequest;
use App\Models\Presentation;
use Inertia\Inertia;

class PresentationController extends Controller
{
     public function index()
     {
          $presentations = Presentation::paginate(50)->transform(function($presentation){
               return [
                    'id' => $presentation->id,
                    'name' => $presentation->name,
                    'status' => ($presentation->status) ? true : false,
                    'statusCaption' => ($presentation->status) ? 'Active' : 'Inactive'
               ];
          });

          return Inertia::render('Admin/Presentation/Index', ['data' => $presentations]);
     }

     public function create()
     {
          return Inertia::render('Admin/Presentation/Create');
     }

     public function store(PresentationRequest $request)
     {
          $presentation = new Presentation;
          $presentation->name = $request->get('name');
          $presentation->status = ($request->get('status') == 'true') ? true : false;
          $presentation->save();

          return redirect()->route('presentation.index')->with('success', 'Presentation saved successfully.');
     }

     public function Edit(Presentation $presentation)
     {
          return Inertia::render('Admin/Presentation/Edit', ['data' => [
               'id' => $presentation->id,
               'name' => $presentation->name,
               'status' => ($presentation->status) ? true : false,
          ]]);
     }

     public function update(PresentationRequest $request, Presentation $presentation)
     {
          $presentation->name = $request->get('name');
          $presentation->status = ($request->get('status') == 'true') ? true : false;
          $presentation->update();

          return redirect()->route('presentation.index')->with('success', 'Presentation updated successfully.');
     }
}
