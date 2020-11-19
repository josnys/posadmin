<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UserRequest;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\PasswordRequest;
use App\Models\User;
use App\Models\Role;
use Inertia\Inertia;

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
          $users = User::with('roles')->paginate(20)->transform(function($user){
               $roles = array();
               foreach($user->roles as $rl){
                    array_push($roles, $rl->display_name);
               }
               return [
                    'id' => $user->id,
                    'code' => $user->code,
                    'name' => $user->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'avatar' => ($user->profile_url) ? route('show.image', 'users/'.$user->profile_url) : null,
                    'roles' => $roles
               ];
          });

          return Inertia::render('Admin/User/Index', ['data' => $users]);
     }

     public function create()
     {
          return Inertia::render('Admin/User/Create', ['data' => [
               'sexes' => $this->userSex,
               'identityType' => $this->identityType
          ]]);
     }

     public function store(CreateUserRequest $request)
     {
          $code = User::generateCode();
          $exist = User::where('code', $code)->first();
          while($exist != null){
               $code = User::generateCode();
               $exist = User::where('code', $code)->first();
          }
          $user = new User;
          $user->firstname = $request->get('fname');
          $user->lastname = $request->get('lname');
          $user->code = $code;
          $user->dob = $request->get('dob');
          $user->sex = $request->get('sex');
          $user->identification = $request->get('identification');
          $user->identification_type = $request->get('identificationType');
          $user->address = $request->get('address');
          $user->phone = $request->get('phone');
          $user->username = $request->get('username');
          $user->email = $request->get('email');
          $user->password = Hash::make($request->get('password'));
          if($request->get('pin') != null){
               $user->pin = $request->get('pin');
          }
          $user->save();
          return redirect()->route('user.index')->with('success', 'User saved successfully.');
     }

     public function edit(User $user)
     {
          return Inertia::render('Admin/User/Edit', ['data' => [
               'id' => $user->id,
               'fname' => $user->firstname,
               'lname' => $user->lastname,
               'code' => $user->code,
               'dob' => $user->dob,
               'sex' => $user->sex,
               'identification' => $user->identification,
               'identificationType' => $user->identification_type,
               'address' => $user->address,
               'phone' => $user->phone,
               'pin' => $user->pin,
               'multiConnect' => ($user->multi_connect) ? true : false,
               'username' => $user->username,
               'email' => $user->email,
               'avatar' => ($user->profile_url) ? route('show.image', 'users/'.$user->profile_url) : null,
               'sexes' => $this->userSex,
               'identityType' => $this->identityType
          ]]);
     }

     public function update(UserRequest $request, User $user)
     {
          $user->firstname = $request->get('fname');
          $user->lastname = $request->get('lname');
          $user->dob = $request->get('dob');
          $user->sex = $request->get('sex');
          $user->identification = $request->get('identification');
          $user->identification_type = $request->get('identificationType');
          $user->address = $request->get('address');
          $user->phone = $request->get('phone');
          $user->update();
          return redirect()->route('user.index')->with('success', 'User updated successfully.');
     }

     public function getRoles(User $user)
     {
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

          return Inertia::render('Admin/User/Role', [
               'data' => [
                    'roles' => $roles,
                    'user' => [
                         'id' => $user->id,
                         'name' => $user->name,
                         'username' => $user->username,
                         'email' => $user->email,
                         'avatar' => null
                    ],
                    'user_roles' => $user_roles
               ]
          ]);
     }

     public function postRole(Request $request, User $user)
     {
          $request->validate([
               'user_roles' => ['required', 'array'],
               'user_roles.*' => ['integer'],
          ]);
          $user->syncRoles($request->get('user_roles'));
          return redirect()->route('user.index')->with('success', 'Role successfully assigned to '.$user->name);
     }

     public function getResetPassword(User $user)
     {
          return Inertia::render('Admin/User/ChangePassword', ['data' => [
               'id' => $user->id,
               'name' => $user->name,
               'code' => $user->code,
          ]]);
     }

     public function postResetPassword(PasswordRequest $request, User $user)
     {
          $user->password = Hash::make($request->get('password'));
          if($request->get('pin') != null){
               $user->pin = $request->get('pin');
          }
          $user->update();
          return redirect()->route('user.index')->with('success', 'User Password changed successfully.');
     }
}
