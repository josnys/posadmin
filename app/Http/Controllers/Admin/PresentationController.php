<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PresentationRequest;
use App\Models\Presentation;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class PresentationController extends Controller
{
     public function index()
     {
          try {
               $presentations = Presentation::paginate(50)->transform(function($presentation){
                    return [
                         'id' => $presentation->id,
                         'name' => $presentation->name,
                         'status' => ($presentation->status) ? true : false,
                         'statusCaption' => ($presentation->status) ? 'Active' : 'Inactive'
                    ];
               });

               return Inertia::render('Admin/Presentation/Index', ['data' => $presentations]);
          } catch (\Exception $e) {
               Log::error('Presentation index', ['data' => $e]);
          }
     }

     public function create()
     {
          try {
               return Inertia::render('Admin/Presentation/Create');
          } catch (\Exception $e) {
               Log::error('Presentation create', ['data' => $e]);
          }
     }

     public function store(PresentationRequest $request)
     {
          try {
               $presentation = new Presentation;
               $presentation->name = $request->get('name');
               $presentation->status = ($request->get('status') == 'true') ? true : false;
               $presentation->save();

               return redirect()->route('presentation.index')->with('success', 'Presentation saved successfully.');
          } catch (\Exception $e) {
               Log::error('Presentation store', ['data' => $e]);
          }
     }

     public function Edit(Presentation $presentation)
     {
          try {
               return Inertia::render('Admin/Presentation/Edit', ['data' => [
                    'id' => $presentation->id,
                    'name' => $presentation->name,
                    'status' => ($presentation->status) ? true : false,
               ]]);
          } catch (\Exception $e) {
               Log::error('Presentation edit', ['data' => $e]);
          }
     }

     public function update(PresentationRequest $request, Presentation $presentation)
     {
          try {
               $presentation->name = $request->get('name');
               $presentation->status = ($request->get('status') == 'true') ? true : false;
               $presentation->update();

               return redirect()->route('presentation.index')->with('success', 'Presentation updated successfully.');
          } catch (\Exception $e) {
               Log::error('Presentation update', ['data' => $e]);
          }
     }
}
