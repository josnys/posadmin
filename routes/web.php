<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WelcomeController;

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

Route::get('/img/{path}', [App\Http\Controllers\ImageController::class, 'show'])->where('path', '.*')->name('show.image');

Route::group(['middleware' => ['auth']], function(){
     // Profile
     Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
     Route::get('/profile', [App\Http\Controllers\HomeController::class, 'profile'])->name('profile');
     Route::put('/profile/{user}', [App\Http\Controllers\HomeController::class, 'postProfile'])->name('profile.save');
     Route::post('/profile/{user}/password', [App\Http\Controllers\HomeController::class, 'postProfilePassword'])->name('profile.password');

     // Security -- Roles & Permissions
     Route::get('/security', [App\Http\Controllers\Admin\SecurityController::class, 'index'])->name('security.index');
     // Permissions
     Route::get('/permission', [App\Http\Controllers\Admin\PermissionController::class, 'create'])->middleware('permission:create-permission')->name('permission.create');
     Route::post('/permission', [App\Http\Controllers\Admin\PermissionController::class, 'store'])->middleware('permission:create-permission')->name('permission.store');
     Route::get('/permission/{permission}/edit', [App\Http\Controllers\Admin\PermissionController::class, 'edit'])->middleware('permission:update-permission')->name('permission.edit');
     Route::post('/permission/{permission}/edit', [App\Http\Controllers\Admin\PermissionController::class, 'update'])->middleware('permission:update-permission')->name('permission.update');
     // Roles
     Route::get('/role', [App\Http\Controllers\Admin\RoleController::class, 'create'])->middleware('permission:create-role')->name('role.create');
     Route::post('/role', [App\Http\Controllers\Admin\RoleController::class, 'store'])->middleware('permission:create-role')->name('role.store');
     Route::get('/role/{role}/edit', [App\Http\Controllers\Admin\RoleController::class, 'edit'])->middleware('permission:update-role')->name('role.edit');
     Route::post('/role/{role}/edit', [App\Http\Controllers\Admin\RoleController::class, 'update'])->middleware('permission:update-role')->name('role.update');
     Route::get('/role/{role}/assign', [App\Http\Controllers\Admin\RoleController::class, 'getAssign'])->middleware('permission:assign-permission')->name('role.get.assign');
     Route::post('/role/{role}/assign', [App\Http\Controllers\Admin\RoleController::class, 'postAssign'])->middleware('permission:assign-permission')->name('role.post.assign');

     // Users
     Route::get('/user', [App\Http\Controllers\Admin\UserController::class, 'index'])->middleware('permission:read-user')->name('user.index');
     Route::get('/user/create', [App\Http\Controllers\Admin\UserController::class, 'create'])->middleware('permission:create-user')->name('user.create');
     Route::post('/user/create', [App\Http\Controllers\Admin\UserController::class, 'store'])->middleware('permission:create-user')->name('user.store');
     Route::get('/user/{user}/edit', [App\Http\Controllers\Admin\UserController::class, 'edit'])->middleware('permission:update-user')->name('user.edit');
     Route::post('/user/{user}/edit', [App\Http\Controllers\Admin\UserController::class, 'update'])->middleware('permission:update-user')->name('user.update');
     Route::get('/user/{user}/role', [App\Http\Controllers\Admin\UserController::class, 'getRoles'])->middleware('permission:assign-role')->name('user.get.role');
     Route::post('/user/{user}/role', [App\Http\Controllers\Admin\UserController::class, 'postRole'])->middleware('permission:assign-role')->name('user.post.role');
     Route::get('/user/{user}/resetPassword', [App\Http\Controllers\Admin\UserController::class, 'getResetPassword'])->middleware('permission:change-password-user')->name('user.get.resetpassword');
     Route::post('/user/{user}/resetPassword', [App\Http\Controllers\Admin\UserController::class, 'postResetPassword'])->middleware('permission:change-password-user')->name('user.post.resetpassword');
});
