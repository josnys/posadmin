<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RolePermissionSeeder extends Seeder
{
     /**
     * Run the database seeds.
     *
     * @return void
     */
     public function run()
     {
          $roles = [
               [
                    'name' => 'super-user',
                    'display_name' => 'Super User',
                    'description' => 'Generally should be the business owner, or the technical guy(s).'
               ]
          ];

          $permissions = [
               [
                    'name' => 'create-permission',
                    'display_name' => 'Create Permission',
                    'description' => 'Allow user to create permissions.'
               ],
               [
                    'name' => 'read-permission',
                    'display_name' => 'Read Permission',
                    'description' => 'Allow user to read the list of permissions.'
               ],
               [
                    'name' => 'update-permission',
                    'display_name' => 'Update Permission',
                    'description' => 'Allow user to update permissions.'
               ],
               [
                    'name' => 'delete-permission',
                    'display_name' => 'Delete Permission',
                    'description' => 'Allow user to delete permissions.'
               ],
               [
                    'name' => 'assign-permission',
                    'display_name' => 'Assign Permission',
                    'description' => 'Allow user to assign permissions to other users in the system.'
               ],
               [
                    'name' => 'create-role',
                    'display_name' => 'Create Role',
                    'description' => 'Allow user to create role.'
               ],
               [
                    'name' => 'read-role',
                    'display_name' => 'Read Role',
                    'description' => 'Allow user to read role.'
               ],
               [
                    'name' => 'update-role',
                    'display_name' => 'Update Role',
                    'description' => 'Allow user to update role.'
               ],
               [
                    'name' => 'delete-role',
                    'display_name' => 'Delete Role',
                    'description' => 'Allow user to create roles.'
               ],
               [
                    'name' => 'assign-role',
                    'display_name' => 'Assign Role',
                    'description' => 'Allow user to assign role to other users.'
               ],
               [
                    'name' => 'create-user',
                    'display_name' => 'Create User',
                    'description' => 'Allow a user to create users.'
               ],
               [
                    'name' => 'read-user',
                    'display_name' => 'Read User',
                    'description' => 'Allow user to read list of users.'
               ],
               [
                    'name' => 'update-user',
                    'display_name' => 'Update User',
                    'description' => 'Allow user to update user\'s account.'
               ],
               [
                    'name' => 'delete-user',
                    'display_name' => 'Delete User',
                    'description' => 'Allow user to delete user\'s accounts.'
               ],
               [
                    'name' => 'change-password-user',
                    'display_name' => 'Change Password User',
                    'description' => 'Allow user to change other user\'s password'
               ],
          ];

          $permissionIds = array();
          foreach($permissions as $permission){
               $p = new Permission;
               $p->name = $permission['name'];
               $p->display_name = $permission['display_name'];
               $p->description = $permission['description'];
               $p->save();
               array_push($permissionIds, $p->id);
          }

          foreach($roles as $role){
               $r = new Role;
               $r->name = $role['name'];
               $r->display_name = $role['display_name'];
               $r->description = $role['description'];
               $r->save();
               $r->syncPermissions($permissionIds);
          }
     }
}
