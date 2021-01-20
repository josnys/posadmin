<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UserRequest;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\PasswordRequest;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Person;
use App\Models\Role;
use App\Models\Store;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
     protected $userSex;
     protected $identityType;

     public function __construct()
     {
          $this->userSex = [
               ['code' => 'Man', 'name' => 'Man'],
               ['code' => 'Woman', 'name' => 'Woman']
          ];
          $this->identityType = [
               ['code' => 'CIN', 'name' => 'CIN'],
               ['code' => 'Passport', 'name' => 'Passport'],
               ['code' => 'Driver License', 'name' => 'Driver License']
          ];
     }

     public function index()
     {
          try {
               $users = User::with('person')->with('roles')->paginate(20)->transform(function($user){
                    $roles = array();
                    foreach($user->roles as $rl){
                         array_push($roles, $rl->display_name);
                    }
                    return [
                         'id' => $user->id,
                         'code' => $user->person->code,
                         'name' => $user->person->name,
                         'username' => $user->username,
                         'email' => $user->email,
                         'avatar' => ($user->profile_url) ? route('show.image', 'users/'.$user->profile_url) : null,
                         'roles' => $roles
                    ];
               });

               return Inertia::render('Admin/User/Index', ['data' => $users]);
          } catch (\Exception $e) {
               Log::error('User index', ['data' => $e]);
          }
     }

     public function create()
     {
          try {
               return Inertia::render('Admin/User/Create', ['data' => [
                    'sexes' => $this->userSex,
                    'identityType' => $this->identityType
               ]]);
          } catch (\Exception $e) {
               Log::error('User create', ['data' => $e]);
          }
     }

     public function store(CreateUserRequest $request)
     {
          try {
               DB::transaction(function() use ($request){
                    $code = Person::generateCode();
                    $person = new Person;
                    $person->firstname = $request->get('fname');
                    $person->lastname = $request->get('lname');
                    $person->code = $code;
                    $person->dob = $request->get('dob');
                    $person->sex = $request->get('sex');
                    $person->identification = $request->get('identification');
                    $person->identification_type = $request->get('identificationType');
                    $person->address = $request->get('address');
                    $person->phone = $request->get('phone');
                    $person->save();
                    $pid = $person->id;

                    $user = new User;
                    $user->person_id = $pid;
                    $user->username = $request->get('username');
                    $user->email = $request->get('email');
                    $user->password = Hash::make($request->get('password'));
                    if($request->get('pin') != null){
                         $user->pin = $request->get('pin');
                    }
                    $user->save();
               });
               return redirect()->route('user.index')->with('success', 'User saved successfully.');
          } catch (\Exception $e) {
               Log::error('User store', ['data' => $e]);
          }
     }

     public function edit(User $user)
     {
          try {
               $person = Person::find($user->person_id);
               return Inertia::render('Admin/User/Edit', ['data' => [
                    'id' => $user->id,
                    'fname' => $person->firstname,
                    'lname' => $person->lastname,
                    'code' => $person->code,
                    'dob' => $person->dob,
                    'sex' => $person->sex,
                    'identification' => $person->identification,
                    'identificationType' => $person->identification_type,
                    'address' => $person->address,
                    'phone' => $person->phone,
                    'pin' => $user->pin,
                    'multiConnect' => ($user->multi_connect) ? true : false,
                    'username' => $user->username,
                    'email' => $user->email,
                    'avatar' => ($user->profile_url) ? route('show.image', 'users/'.$user->profile_url) : null,
                    'sexes' => $this->userSex,
                    'identityType' => $this->identityType
               ]]);
          } catch (\Exception $e) {
               Log::error('User edit', ['data' => $e]);
          }
     }

     public function update(UserRequest $request, User $user)
     {
          try {
               DB::transaction(function() use ($request, &$user){
                    $person = Person::find($user->person_id);
                    $person->firstname = $request->get('fname');
                    $person->lastname = $request->get('lname');
                    $person->dob = $request->get('dob');
                    $person->sex = $request->get('sex');
                    $person->identification = $request->get('identification');
                    $person->identification_type = $request->get('identificationType');
                    $person->address = $request->get('address');
                    $person->phone = $request->get('phone');
                    $person->update();

                    $user->update();
               });
               return redirect()->route('user.index')->with('success', 'User updated successfully.');
          } catch (\Exception $e) {
               Log::error('User update', ['data' => $e]);
          }
     }

     public function getRoles(User $user)
     {
          try {
               $_roles = Role::all();
               $user_roles = array();
               $rol_es = $user->with('roles')->find($user->id);
               foreach($rol_es->roles as $ur){
                    array_push($user_roles, $ur->id);
               }

               $roles = array();
               foreach($_roles as $rl){
                    array_push($roles, [
                         'id' => $rl->id,
                         'display' => $rl->display_name,
                         'description' => $rl->description,
                         'isCheck' => in_array($rl->id, $user_roles)
                    ]);
               }
               $person = Person::find($user->person_id);
               return Inertia::render('Admin/User/Role', [
                    'data' => [
                         'roles' => $roles,
                         'user' => [
                              'id' => $user->id,
                              'name' => $person->name,
                              'username' => $user->username,
                              'email' => $user->email,
                              'avatar' => null
                         ],
                         'user_roles' => $user_roles
                    ]
               ]);
          } catch (\Exception $e) {
               Log::error('User get role', ['data' => $e]);
          }
     }

     public function postRole(Request $request, User $user)
     {
          try {
               $request->validate([
                    'user_roles' => ['required', 'array'],
                    'user_roles.*' => ['integer'],
               ]);
               $user->syncRoles($request->get('user_roles'));
               return redirect()->route('user.index')->with('success', 'Role successfully assigned to '.$user->name);
          } catch (\Exception $e) {
               Log::error('User post role', ['data' => $e]);
          }
     }

     public function getResetPassword(User $user)
     {
          try {
               $person = Person::find($user->person_id);
               return Inertia::render('Admin/User/ChangePassword', ['data' => [
                    'id' => $user->id,
                    'name' => $person->name,
                    'code' => $user->code,
               ]]);
          } catch (\Exception $e) {
               Log::error('User reset password', ['data' => $e]);
          }
     }

     public function postResetPassword(PasswordRequest $request, User $user)
     {
          try {
               $user->password = Hash::make($request->get('password'));
               if($request->get('pin') != null){
                    $user->pin = $request->get('pin');
               }
               $user->update();
               return redirect()->route('user.index')->with('success', 'User Password changed successfully.');
          } catch (\Exception $e) {
               Log::error('User post reset password', ['data' => $e]);
          }
     }

     public function getUserStore(User $user)
     {
          try {
               $user = User::with('person')->with('roles')->with('stores')->find($user->id);
               $roles = array();
               foreach($user->roles as $rl){
                    array_push($roles, $rl->display_name);
               }
               $storeId = array();
               $ustores = array();
               foreach($user->stores as $store){
                    array_push($storeId, $store->id);
                    array_push($ustores, [
                         'id' => $store->id,
                         'name' => $store->name,
                         'type' => $store->type,
                    ]);
               }
               $_stores = Store::active()->get();
               $stores = array();
               foreach($_stores as $store){
                    array_push($stores, [
                         'id' => $store->id,
                         'name' => $store->name,
                         'type' => $store->type,
                         'isCheck' => in_array($store->id, $storeId)
                    ]);
               }

               return Inertia::render('Admin/User/Store', ['data' => [
                    'stores' => $stores,
                    'user' => [
                         'id' => $user->id,
                         'name' => $user->person->name,
                         'username' => $user->username,
                         'roles' => $roles,
                         'user_store' => $ustores
                    ]
               ]]);
          } catch (\Exception $e) {
               Log::error('User get stores', ['data' => $e]);
          }
     }

     public function postUserStore(Request $request, User $user)
     {
          try {
               $request->validate([
                    'user_store' => ['required', 'array'],
                    'user_store.*' => ['integer'],
               ]);
               $user->stores()->sync($request->get('user_store'));
               return redirect()->route('user.index')->with('success', 'Store successfully assigned to '.$user->name);
          } catch (\Exception $e) {
               Log::error('User post stores', ['data' => $e]);
          }
     }
}
