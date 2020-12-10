<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\SecurityController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\SubcategoryController;
use App\Http\Controllers\Admin\PresentationController;
use App\Http\Controllers\Admin\AgencyController;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductConfigurationController;
use App\Http\Controllers\Admin\StoreController;
use App\Http\Controllers\Admin\StoreContactController;
use App\Http\Controllers\Admin\PurchaseOrderController;
use App\Http\Controllers\Admin\PurchaseController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [WelcomeController::class, 'index']);

Route::get('/img/{path}', [ImageController::class, 'show'])->where('path', '.*')->name('show.image');

Route::group(['middleware' => ['auth']], function(){
     // Profile
     Route::get('/home', [HomeController::class, 'index'])->name('home');
     Route::get('/profile', [HomeController::class, 'profile'])->name('profile');
     Route::put('/profile/{user}', [HomeController::class, 'postProfile'])->name('profile.save');
     Route::post('/profile/{user}/password', [HomeController::class, 'postProfilePassword'])->name('profile.password');

     // Security -- Roles & Permissions
     Route::get('/security', [SecurityController::class, 'index'])->name('security.index');
     // Permissions
     Route::get('/permission', [PermissionController::class, 'create'])->middleware('permission:create-permission')->name('permission.create');
     Route::post('/permission', [PermissionController::class, 'store'])->middleware('permission:create-permission')->name('permission.store');
     Route::get('/permission/{permission}/edit', [PermissionController::class, 'edit'])->middleware('permission:update-permission')->name('permission.edit');
     Route::post('/permission/{permission}/edit', [PermissionController::class, 'update'])->middleware('permission:update-permission')->name('permission.update');
     // Roles
     Route::get('/role', [RoleController::class, 'create'])->middleware('permission:create-role')->name('role.create');
     Route::post('/role', [RoleController::class, 'store'])->middleware('permission:create-role')->name('role.store');
     Route::get('/role/{role}/edit', [RoleController::class, 'edit'])->middleware('permission:update-role')->name('role.edit');
     Route::post('/role/{role}/edit', [RoleController::class, 'update'])->middleware('permission:update-role')->name('role.update');
     Route::get('/role/{role}/assign', [RoleController::class, 'getAssign'])->middleware('permission:assign-permission')->name('role.get.assign');
     Route::post('/role/{role}/assign', [RoleController::class, 'postAssign'])->middleware('permission:assign-permission')->name('role.post.assign');

     // Users
     Route::get('/user', [UserController::class, 'index'])->middleware('permission:read-user')->name('user.index');
     Route::get('/user/create', [UserController::class, 'create'])->middleware('permission:create-user')->name('user.create');
     Route::post('/user/create', [UserController::class, 'store'])->middleware('permission:create-user')->name('user.store');
     Route::get('/user/{user}/edit', [UserController::class, 'edit'])->middleware('permission:update-user')->name('user.edit');
     Route::post('/user/{user}/edit', [UserController::class, 'update'])->middleware('permission:update-user')->name('user.update');
     Route::get('/user/{user}/role', [UserController::class, 'getRoles'])->middleware('permission:assign-role')->name('user.get.role');
     Route::post('/user/{user}/role', [UserController::class, 'postRole'])->middleware('permission:assign-role')->name('user.post.role');
     Route::get('/user/{user}/resetPassword', [UserController::class, 'getResetPassword'])->middleware('permission:change-password-user')->name('user.get.resetpassword');
     Route::post('/user/{user}/resetPassword', [UserController::class, 'postResetPassword'])->middleware('permission:change-password-user')->name('user.post.resetpassword');

     // Categories
     Route::get('/category', [CategoryController::class, 'index'])->middleware('permission:read-category')->name('category.index');
     Route::get('/category/create', [CategoryController::class, 'create'])->middleware('permission:create-category')->name('category.create');
     Route::post('/category/create', [CategoryController::class, 'store'])->middleware('permission:create-category')->name('category.store');
     Route::get('/category/{category}/edit', [CategoryController::class, 'edit'])->middleware('permission:update-category')->name('category.edit');
     Route::post('/category/{category}/edit', [CategoryController::class, 'update'])->middleware('permission:update-category')->name('category.update');

     // Sub-Categories
     Route::get('/category/{category}/subcategory', [SubcategoryController::class, 'index'])->middleware('permission:read-subcategory')->name('subcategory.index');
     Route::get('/category/{category}/subcategory/create', [SubcategoryController::class, 'create'])->middleware('permission:create-subcategory')->name('subcategory.create');
     Route::post('/category/{category}/subcategory/create', [SubcategoryController::class, 'store'])->middleware('permission:create-subcategory')->name('subcategory.store');
     Route::get('/category/{category}/subcategory/{subcategory}/edit', [SubcategoryController::class, 'edit'])->middleware('permission:update-subcategory')->name('subcategory.edit');
     Route::post('/category/{category}/subcategory/{subcategory}/edit', [SubcategoryController::class, 'update'])->middleware('permission:update-subcategory')->name('subcategory.update');

     // Presentations
     Route::get('/presentation', [PresentationController::class, 'index'])->middleware('permission:read-presentation')->name('presentation.index');
     Route::get('/presentation/create', [PresentationController::class, 'create'])->middleware('permission:create-presentation')->name('presentation.create');
     Route::post('/presentation/create', [PresentationController::class, 'store'])->middleware('permission:create-presentation')->name('presentation.store');
     Route::get('/presentation/{presentation}/edit', [PresentationController::class, 'edit'])->middleware('permission:update-presentation')->name('presentation.edit');
     Route::post('/presentation/{presentation}/edit', [PresentationController::class, 'update'])->middleware('permission:update-presentation')->name('presentation.update');

     // Agencies
     Route::get('/agency', [AgencyController::class, 'index'])->middleware('permission:read-agency')->name('agency.index');
     Route::get('/agency/create', [AgencyController::class, 'create'])->middleware('permission:create-agency')->name('agency.create');
     Route::post('/agency/create', [AgencyController::class, 'store'])->middleware('permission:create-agency')->name('agency.store');
     Route::get('/agency/{agency}/edit', [AgencyController::class, 'edit'])->middleware('permission:update-agency')->name('agency.edit');
     Route::post('/agency/{agency}/edit', [AgencyController::class, 'update'])->middleware('permission:update-agency')->name('agency.update');

     // Suppliers
     Route::get('/supplier', [SupplierController::class, 'index'])->middleware('permission:read-supplier')->name('supplier.index');
     Route::get('/supplier/create', [SupplierController::class, 'create'])->middleware('permission:create-supplier')->name('supplier.create');
     Route::post('/supplier/create', [SupplierController::class, 'store'])->middleware('permission:create-supplier')->name('supplier.store');
     Route::get('/supplier/{supplier}/edit', [SupplierController::class, 'edit'])->middleware('permission:update-supplier')->name('supplier.edit');
     Route::post('/supplier/{supplier}/edit', [SupplierController::class, 'update'])->middleware('permission:update-supplier')->name('supplier.update');

     // Products
     Route::get('/product', [ProductController::class, 'index'])->middleware('permission:update-product')->name('product.index');
     Route::get('/product/create', [ProductController::class, 'create'])->middleware('permission:update-product')->name('product.create');
     Route::post('/product/create', [ProductController::class, 'store'])->middleware('permission:update-product')->name('product.store');
     Route::get('/product/{product}', [ProductController::class, 'show'])->middleware('permission:update-product')->name('product.show');
     Route::get('/product/{product}/edit', [ProductController::class, 'edit'])->middleware('permission:update-product')->name('product.edit');
     Route::post('/product/{product}/edit', [ProductController::class, 'update'])->middleware('permission:update-product')->name('product.update');

     // Product's Configurations
     Route::get('/product/{product}/config', [ProductConfigurationController::class, 'index'])->middleware('permission:read-product-configuration')->name('product.config.index');
     Route::get('/product/{product}/config/create', [ProductConfigurationController::class, 'create'])->middleware('permission:create-product-configuration')->name('product.config.create');
     Route::post('/product/{product}/config/create', [ProductConfigurationController::class, 'store'])->middleware('permission:create-product-configuration')->name('product.config.store');
     Route::get('/product/{product}/config/{config}/edit', [ProductConfigurationController::class, 'edit'])->middleware('permission:update-product-configuration')->name('product.config.edit');
     Route::post('/product/{product}/config/{config}/edit', [ProductConfigurationController::class, 'update'])->middleware('permission:update-product-configuration')->name('product.config.update');

     // Product's search
     Route::post('/product/search', [ProductConfigurationController::class, 'search'])->name('product.search');

     // Stores
     Route::get('/store', [StoreController::class, 'index'])->middleware('permission:read-store')->name('store.index');
     Route::get('/store/create', [StoreController::class, 'create'])->middleware('permission:create-store')->name('store.create');
     Route::post('/store/create', [StoreController::class, 'store'])->middleware('permission:create-store')->name('store.store');
     Route::get('/store/{store}', [StoreController::class, 'show'])->middleware('permission:read-store')->name('store.show');
     Route::get('/store/{store}/edit', [StoreController::class, 'edit'])->middleware('permission:update-store')->name('store.edit');
     Route::post('/store/{store}/edit', [StoreController::class, 'update'])->middleware('permission:update-store')->name('store.update');

     // Store's Contacts
     Route::get('/store/{store}/contact', [StoreContactController::class, 'index'])->middleware('permission:read-store-contact')->name('store.contact.index');
     Route::get('/store/{store}/contact/create', [StoreContactController::class, 'create'])->middleware('permission:create-store-contact')->name('store.contact.create');
     Route::post('/store/{store}/contact/create', [StoreContactController::class, 'store'])->middleware('permission:create-store-contact')->name('store.contact.store');
     Route::get('/store/{store}/contact/{contact}/edit', [StoreContactController::class, 'edit'])->middleware('permission:update-store-contact')->name('store.contact.edit');
     Route::post('/store/{store}/contact/{contact}/edit', [StoreContactController::class, 'update'])->middleware('permission:update-store-contact')->name('store.contact.update');

     // Purchase Orders
     Route::get('/store/{store}/purchase-order', [PurchaseOrderController::class, 'index'])->middleware('permission:read-purchase-order')->name('purchase-order.index');
     Route::get('/store/{store}/purchase-order/create', [PurchaseOrderController::class, 'create'])->middleware('permission:create-purchase-order')->name('purchase-order.create');
     Route::post('/store/{store}/purchase-order/create', [PurchaseOrderController::class, 'store'])->middleware('permission:create-purchase-order')->name('purchase-order.store');
     Route::get('/store/{store}/purchase-order/{purchase}', [PurchaseOrderController::class, 'show'])->middleware('permission:read-purchase-order')->name('purchase-order.show');
     Route::get('/store/{store}/purchase-order/{purchase}/edit', [PurchaseOrderController::class, 'edit'])->middleware('permission:update-purchase-order')->name('purchase-order.edit');
     Route::post('/store/{store}/purchase-order/{purchase}/edit', [PurchaseOrderController::class, 'update'])->middleware('permission:update-purchase-order')->name('purchase-order.update');
     Route::get('/store/{store}/purchase-order/{purchase}/approve', [PurchaseOrderController::class, 'getApprove'])->middleware('permission:approve-purchase-order')->name('purchase-order.get.approve');
     Route::post('/store/{store}/purchase-order/{purchase}/approve', [PurchaseOrderController::class, 'postApprove'])->middleware('permission:approve-purchase-order')->name('purchase-order.post.approve');

     // Purchases
     Route::get('/store/{store}/purchase', [PurchaseController::class, 'index'])->middleware('permission:read-purchase-order')->name('purchase.index');
     Route::get('/store/{store}/purchase/{order}/create', [PurchaseController::class, 'create'])->middleware('permission:read-purchase-order')->name('purchase.create');
     Route::post('/store/{store}/purchase/{order}/create', [PurchaseController::class, 'store'])->middleware('permission:read-purchase-order')->name('purchase.store');
     Route::get('/store/{store}/purchase/{purchase}', [PurchaseController::class, 'show'])->middleware('permission:read-purchase-order')->name('purchase.show');
     Route::get('/store/{store}/purchase/{purchase}/edit', [PurchaseController::class, 'edit'])->middleware('permission:read-purchase-order')->name('purchase.edit');
     Route::post('/store/{store}/purchase/{purchase}/edit', [PurchaseController::class, 'update'])->middleware('permission:read-purchase-order')->name('purchase.update');
});
