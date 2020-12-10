<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RoleRequest;
use App\Models\Role;
use App\Models\Permission;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class RoleController extends Controller
{
     public function create()
     {
          try {
               $roles = Role::paginate(100)->transform(function($role){
                    return [
                         'id' => $role->id,
                         'name' => $role->name,
                         'display' => $role->display_name,
                         'description' => $role->description
                    ];
               });
               return Inertia::render('Admin/Security/CreateRole', ['data' => $roles]);
          } catch (\Exception $e) {
               Log::error('Role index', ['data' => $e]);
          }
     }

     public function store(RoleRequest $request)
     {
          try {
               $role = new Role;
               $role->name = $request->get('name');
               $role->display_name = $request->get('display');
               $role->description = $request->get('description');
               $role->save();
               return response()->json([
                    'message' => 'Role created successfully.',
                    'data' => [
                         'id' => $role->id,
                         'name' => $role->name,
                         'display' => $role->display_name,
                         'description' => $role->description
                    ]
               ], 201);
          } catch (\Exception $e) {
               Log::error('Role create', ['data' => $e]);
          }
     }

     public function edit(Role $role)
     {
          try {
               return Inertia::render('Admin/Security/EditRole', ['data' => [
                    'id' => $role->id,
                    'name' => $role->name,
                    'display' => $role->display_name,
                    'description' => $role->description
               ]]);
          } catch (\Exception $e) {
               Log::error('Role edit', ['data' => $e]);
          }
     }

     public function update(RoleRequest $request, Role $role)
     {
          try {
               $role->display_name = $request->get('display');
               $role->description = $request->get('description');
               $role->update();

               return redirect()->route('security.index')->with('success', 'Role Updated.');
          } catch (\Exception $e) {
               Log::error('Role update', ['data' => $e]);
          }
     }

     public function getAssign(Role $role)
     {
          try {
               $role = $role->with('permissions')->find($role->id);
               $_permissions = Permission::all();
               $role_permission = array();
               foreach($role->permissions as $rp){
                    array_push($role_permission, $rp->id);
               }

               $permissions = array();
               foreach($_permissions as $permission){
                    array_push($permissions, [
                         'id' => $permission->id,
                         'display' => $permission->display_name,
                         'description' => $permission->description,
                         'isCheck' => in_array($permission->id, $role_permission)
                    ]);
               }

               return Inertia::render('Admin/Security/AssignPermission', ['data' => [
                    'role' => [
                         'id' => $role->id,
                         'display' => $role->display_name,
                         'name' => $role->name,
                         'description' => $role->description
                    ],
                    'permissions' => $permissions,
                    'role_permissions' => $role_permission
               ]]);
          } catch (\Exception $e) {
               Log::error('Role get assign', ['data' => $e]);
          }
     }

     public function postAssign(Request $request, Role $role)
     {
          try {
               $request->validate([
                    'role_permissions' => ['required', 'array'],
                    'role_permissions.*' => ['integer'],
               ]);
               $role->syncPermissions($request->get('role_permissions'));
               return redirect()->route('security.index')->with('success', 'Permissions successfully assigned to '.$role->display_name);
          } catch (\Exception $e) {
               Log::error('Role post assign', ['data' => $e]);
          }
     }
}
