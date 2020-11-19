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
               [
                    'name' => 'create-category',
                    'display_name' => 'Create Category',
                    'description' => 'Allow users to create a Category'
               ],
               [
                    'name' => 'read-category',
                    'display_name' => 'Read Category',
                    'description' => 'Allow user to read Category'
               ],
               [
                    'name' => 'update-category',
                    'display_name' => 'Update Category',
                    'description' => 'Allow user to modify Category'
               ],
               [
                    'name' => 'delete-category',
                    'display_name' => 'Delete Category',
                    'description' => 'Allow user to delete a Category'
               ],
               [
                    'name' => 'create-subcategory',
                    'display_name' => 'Create Subcategory',
                    'description' => 'Allow users to create a Subcategory'
               ],
               [
                    'name' => 'read-subcategory',
                    'display_name' => 'Read Subcategory',
                    'description' => 'Allow user to read Subcategory'
               ],
               [
                    'name' => 'update-subcategory',
                    'display_name' => 'Update Subcategory',
                    'description' => 'Allow user to modify Subcategory'
               ],
               [
                    'name' => 'delete-subcategory',
                    'display_name' => 'Delete Subcategory',
                    'description' => 'Allow user to delete a Subcategory'
               ],
               [
                    'name' => 'create-presentation',
                    'display_name' => 'Create Presentation',
                    'description' => 'Allow users to create a Presentation'
               ],
               [
                    'name' => 'read-presentation',
                    'display_name' => 'Read Presentation',
                    'description' => 'Allow user to read Presentation'
               ],
               [
                    'name' => 'update-presentation',
                    'display_name' => 'Update Presentation',
                    'description' => 'Allow user to modify Presentation'
               ],
               [
                    'name' => 'delete-presentation',
                    'display_name' => 'Delete Presentation',
                    'description' => 'Allow user to delete a Presentation'
               ],
               [
                    'name' => 'create-agency',
                    'display_name' => 'Create Agency',
                    'description' => 'Allow users to create a Agency'
               ],
               [
                    'name' => 'read-agency',
                    'display_name' => 'Read Agency',
                    'description' => 'Allow user to read Agency'
               ],
               [
                    'name' => 'update-agency',
                    'display_name' => 'Update Agency',
                    'description' => 'Allow user to modify Agency'
               ],
               [
                    'name' => 'delete-agency',
                    'display_name' => 'Delete Agency',
                    'description' => 'Allow user to delete a Agency'
               ],
               [
                    'name' => 'create-supplier',
                    'display_name' => 'Create Supplier',
                    'description' => 'Allow users to create a Supplier'
               ],
               [
                    'name' => 'read-supplier',
                    'display_name' => 'Read Supplier',
                    'description' => 'Allow user to read Supplier'
               ],
               [
                    'name' => 'update-supplier',
                    'display_name' => 'Update Supplier',
                    'description' => 'Allow user to modify Supplier'
               ],
               [
                    'name' => 'delete-supplier',
                    'display_name' => 'Delete Supplier',
                    'description' => 'Allow user to delete a Supplier'
               ],
               [
                    'name' => 'create-product',
                    'display_name' => 'Create product',
                    'description' => 'Allow users to create a product'
               ],
               [
                    'name' => 'read-product',
                    'display_name' => 'Read product',
                    'description' => 'Allow user to read product'
               ],
               [
                    'name' => 'update-product',
                    'display_name' => 'Update product',
                    'description' => 'Allow user to modify product'
               ],
               [
                    'name' => 'delete-product',
                    'display_name' => 'Delete product',
                    'description' => 'Allow user to delete a product'
               ],
               [
                    'name' => 'configure-product',
                    'display_name' => 'Configure product',
                    'description' => 'Allow user to configure a product'
               ],
               [
                    'name' => 'create-product-configuration',
                    'display_name' => 'Create product configuration',
                    'description' => 'Allow users to create a product configuration'
               ],
               [
                    'name' => 'read-product-configuration',
                    'display_name' => 'Read product configuration',
                    'description' => 'Allow user to read product configuration'
               ],
               [
                    'name' => 'update-product-configuration',
                    'display_name' => 'Update product configuration',
                    'description' => 'Allow user to modify product configuration'
               ],
               [
                    'name' => 'delete-product-configuration',
                    'display_name' => 'Delete product configuration',
                    'description' => 'Allow user to delete a product configuration'
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
