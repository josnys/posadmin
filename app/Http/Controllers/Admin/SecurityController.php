<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Permission;
use Inertia\Inertia;

class SecurityController extends Controller
{
     public function index()
     {
          $roles = Role::paginate(20)->transform(function($role){
               return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'display' => $role->display_name,
                    'description' => $role->description
               ];
          });
          // return Inertia::render('Dashboard/Home');
          return Inertia::render('Admin/Security/Index', ['data' => $roles]);
     }
}