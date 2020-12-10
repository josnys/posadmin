<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ProfileRequest;
use App\Http\Requests\PasswordRequest;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
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
     /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
     public function index()
     {
          return Inertia::render('Dashboard/Home');
     }

     public function Profile()
     {
          try {
               return Inertia::render('Dashboard/User/Profile', [
                    'data' => [
                         'id' => Auth::user()->id,
                         'fname' => Auth::user()->firstname,
                         'lname' => Auth::user()->lastname,
                         'code' => Auth::user()->code,
                         'dob' => Auth::user()->dob,
                         'sex' => Auth::user()->sex,
                         'identification' => Auth::user()->identification,
                         'identificationType' => Auth::user()->identification_type,
                         'address' => Auth::user()->address,
                         'phone' => Auth::user()->phone,
                         'pin' => Auth::user()->pin,
                         'multiConnect' => (Auth::user()->multi_connect) ? true : false,
                         'username' => Auth::user()->username,
                         'email' => Auth::user()->email,
                         'avatar' => (Auth::user()->profile_url) ? route('show.image', 'users/'.Auth::user()->profile_url) : null,
                         'sexes' => $this->userSex,
                         'identityType' => $this->identityType
                    ]
               ]);
          } catch (\Exception $e) {
               Log::error('HomeController profile', ['data' => $e]);
          }
     }

     public function postProfile(ProfileRequest $request, User $user)
     {
          try {
               $mediaName = null;
               if($request->hasFile('photo')){
                    $mediaPath = $request->file('photo')->store('users/');
                    $index = count(explode('/', $mediaPath)) - 1;
                    $mediaName = explode('/', $mediaPath)[$index];
               }
               $user->firstname = $request->get('fname');
               $user->lastname = $request->get('lname');
               $user->dob = $request->get('dob');
               $user->sex = $request->get('sex');
               $user->identification = $request->get('identification');
               $user->identification_type = $request->get('identificationType');
               $user->address = $request->get('address');
               $user->phone = $request->get('phone');
               $user->username = $request->get('username');
               $user->email = $request->get('email');
               $user->profile_url = $mediaName;
               $user->update();
               return response()->json([
                    'name' => $user->name,
                    'username' => $user->username,
                    'email' => $user->email
               ], 200);
          } catch (\Exception $e) {
               Log::error('HomeController post profile', ['data' => $e]);
          }
     }

     public function postProfilePassword(PasswordRequest $request, User $user)
     {
          try {
               if(Hash::check($request->get('password'), $user->password)){
                    return response()->json([
                         'errors' => [
                              'current_password' => [
                                   'Current Password is not valid.'
                              ]
                         ]
                    ], 422);
               }
               $user->password = Hash::make($request->get('password'));
               if($request->get('pin') != null){
                    $user->pin = $request->get('pin');
               }
               $user->update();
               Auth::logout();
               return response()->json([
                    'success' => [
                         'Password changed successfully.'
                    ]
               ], 200);
          } catch (\Exception $e) {
               Log::error('HomeController post profile password', ['data' => $e]);
          }
     }
}
