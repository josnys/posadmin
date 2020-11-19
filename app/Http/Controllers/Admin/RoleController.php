<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RoleRequest;
use App\Models\Role;
use App\Models\Permission;
use Inertia\Inertia;

class RoleController extends Controller
{
     public function create()
     {
          $roles = Role::paginate(100)->transform(function($role){
               return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'display' => $role->display_name,
                    'description' => $role->description
               ];
          });
          return Inertia::render('Admin/Security/CreateRole', ['data' => $roles]);
     }

     public function store(RoleRequest $request)
     {
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
     }

     public function edit(Role $role)
     {
          return Inertia::render('Admin/Security/EditRole', ['data' => [
               'id' => $role->id,
               'name' => $role->name,
               'display' => $role->display_name,
               'description' => $role->description
          ]]);
     }

     public function update(RoleRequest $request, Role $role)
     {
          $role->display_name = $request->get('display');
          $role->description = $request->get('description');
          $role->update();

          return redirect()->route('security.index')->with('success', 'Role Updated.');
     }

     public function getAssign(Role $role)
     {
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
     }

     public function postAssign(Request $request, Role $role)
     {
          $request->validate([
               'role_permissions' => ['required', 'array'],
               'role_permissions.*' => ['integer'],
          ]);
          $role->syncPermissions($request->get('role_permissions'));
          return redirect()->route('security.index')->with('success', 'Permissions successfully assigned to '.$role->display_name);
     }
}
