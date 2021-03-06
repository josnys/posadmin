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
               [
                    'name' => 'create-store',
                    'display_name' => 'Create store',
                    'description' => 'Allow users to create a store'
               ],
               [
                    'name' => 'read-store',
                    'display_name' => 'Read store',
                    'description' => 'Allow user to read store'
               ],
               [
                    'name' => 'update-store',
                    'display_name' => 'Update store',
                    'description' => 'Allow user to modify store'
               ],
               [
                    'name' => 'delete-store',
                    'display_name' => 'Delete store',
                    'description' => 'Allow user to delete a store'
               ],
               [
                    'name' => 'create-store-contact',
                    'display_name' => 'Create store contact',
                    'description' => 'Allow users to create a store contact'
               ],
               [
                    'name' => 'read-store-contact',
                    'display_name' => 'Read store contact',
                    'description' => 'Allow user to read store contact'
               ],
               [
                    'name' => 'update-store-contact',
                    'display_name' => 'Update store contact',
                    'description' => 'Allow user to modify store contact'
               ],
               [
                    'name' => 'delete-store-contact',
                    'display_name' => 'Delete store contact',
                    'description' => 'Allow user to delete a store contact'
               ],
               [
                    'name' => 'create-purchase-order',
                    'display_name' => 'Create Purchase Order',
                    'description' => 'Allow users to create a purchase order'
               ],
               [
                    'name' => 'read-purchase-order',
                    'display_name' => 'Read Purchase Order',
                    'description' => 'Allow user to read purchase order'
               ],
               [
                    'name' => 'update-purchase-order',
                    'display_name' => 'Update Purchase Order',
                    'description' => 'Allow user to modify purchase order'
               ],
               [
                    'name' => 'delete-purchase-order',
                    'display_name' => 'Delete Purchase Order',
                    'description' => 'Allow user to delete a purchase order'
               ],
               [
                    'name' => 'approve-purchase-order',
                    'display_name' => 'Approve Purchase Order',
                    'description' => 'Allow user to approve purchase order'
               ],
               [
                    'name' => 'create-purchase',
                    'display_name' => 'Create Purchase',
                    'description' => 'Allow users to create a purchase'
               ],
               [
                    'name' => 'read-purchase',
                    'display_name' => 'Read Purchase',
                    'description' => 'Allow user to read purchase'
               ],
               [
                    'name' => 'update-purchase',
                    'display_name' => 'Update Purchase',
                    'description' => 'Allow user to modify purchase'
               ],
               [
                    'name' => 'delete-purchase',
                    'display_name' => 'Delete Purchase',
                    'description' => 'Allow user to delete a purchase'
               ],
               [
                    'name' => 'approve-purchase',
                    'display_name' => 'Approve Purchase',
                    'description' => 'Allow user to approve purchase'
               ], // rive la
               [
                    'name' => 'create-stock',
                    'display_name' => 'Create Stock',
                    'description' => 'Allow users to create a stock'
               ],
               [
                    'name' => 'read-stock',
                    'display_name' => 'Read Stock',
                    'description' => 'Allow user to read stock'
               ],
               [
                    'name' => 'update-stock',
                    'display_name' => 'Update stock',
                    'description' => 'Allow user to modify stock'
               ],
               [
                    'name' => 'delete-stock',
                    'display_name' => 'Delete stock',
                    'description' => 'Allow user to delete a stock'
               ],
               [
                    'name' => 'approve-stock',
                    'display_name' => 'Approve stock',
                    'description' => 'Allow user to approve stock'
               ],
               [
                    'name' => 'create-inventory',
                    'display_name' => 'Create Inventory',
                    'description' => 'Allow users to create a inventory'
               ],
               [
                    'name' => 'read-inventory',
                    'display_name' => 'Read Inventory',
                    'description' => 'Allow user to read inventory'
               ],
               [
                    'name' => 'update-inventory',
                    'display_name' => 'Update Inventory',
                    'description' => 'Allow user to modify inventory'
               ],
               [
                    'name' => 'delete-inventory',
                    'display_name' => 'Delete Inventory',
                    'description' => 'Allow user to delete a inventory'
               ],
               [
                    'name' => 'create-customer',
                    'display_name' => 'Create Customer',
                    'description' => 'Allow users to create a customer'
               ],
               [
                    'name' => 'read-customer',
                    'display_name' => 'Read Customer',
                    'description' => 'Allow user to read customer'
               ],
               [
                    'name' => 'update-customer',
                    'display_name' => 'Update Customer',
                    'description' => 'Allow user to modify customer'
               ],
               [
                    'name' => 'delete-customer',
                    'display_name' => 'Delete Customer',
                    'description' => 'Allow user to delete a customer'
               ],
               [
                    'name' => 'discount-customer',
                    'display_name' => 'Discount Customer',
                    'description' => 'Allow user to grant discount to Customer'
               ],
               [
                    'name' => 'create-currency',
                    'display_name' => 'Create Currency',
                    'description' => 'Allow users to create a currency'
               ],
               [
                    'name' => 'read-currency',
                    'display_name' => 'Read Currency',
                    'description' => 'Allow user to read currency'
               ],
               [
                    'name' => 'update-currency',
                    'display_name' => 'Update Currency',
                    'description' => 'Allow user to modify currency'
               ],
               [
                    'name' => 'delete-currency',
                    'display_name' => 'Delete Currency',
                    'description' => 'Allow user to delete a currency'
               ],
               [
                    'name' => 'create-payment-method',
                    'display_name' => 'Create Payment Method',
                    'description' => 'Allow users to create a Payment Method'
               ],
               [
                    'name' => 'read-payment-method',
                    'display_name' => 'Read Payment Method',
                    'description' => 'Allow user to read Payment Method'
               ],
               [
                    'name' => 'update-payment-method',
                    'display_name' => 'Update Payment Method',
                    'description' => 'Allow user to modify Payment Method'
               ],
               [
                    'name' => 'delete-payment-method',
                    'display_name' => 'Delete Payment Method',
                    'description' => 'Allow user to delete a Payment Method'
               ],
               [
                    'name' => 'activate-payment-method',
                    'display_name' => 'Activate Payment Method',
                    'description' => 'Allow user to activate a Payment Method'
               ],// rive la
               [
                    'name' => 'create-sell',
                    'display_name' => 'Create Sell',
                    'description' => 'Allow user to use the POS interface to create Sell'
               ],
               [
                    'name' => 'read-sell',
                    'display_name' => 'Read Sell',
                    'description' => 'Allow user to read sell'
               ],
               [
                    'name' => 'update-sell',
                    'display_name' => 'Update Sell',
                    'description' => 'Allow user to modify sell'
               ],
               [
                    'name' => 'delete-sell',
                    'display_name' => 'Delete Sell',
                    'description' => 'Allow user to delete a sell'
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
