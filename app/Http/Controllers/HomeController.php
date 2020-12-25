<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ProfileRequest;
use App\Http\Requests\PasswordRequest;
use App\Models\User;
use App\Models\Person;
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
               $user = User::with('person')->find(Auth::user()->id);
               return Inertia::render('Dashboard/User/Profile', [
                    'data' => [
                         'id' => $user->id,
                         'fname' => $user->person->firstname,
                         'lname' => $user->person->lastname,
                         'code' => $user->person->code,
                         'dob' => $user->person->dob,
                         'sex' => $user->person->sex,
                         'identification' => $user->person->identification,
                         'identificationType' => $user->person->identification_type,
                         'address' => $user->person->address,
                         'phone' => $user->person->phone,
                         'pin' => $user->pin,
                         'multiConnect' => ($user->multi_connect) ? true : false,
                         'username' => $user->username,
                         'email' => $user->email,
                         'avatar' => ($user->profile_url) ? route('show.image', 'users/'.$user->profile_url) : null,
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
               $person = Person::find($user->person_id);
               $mediaName = null;
               if($request->hasFile('photo')){
                    $mediaPath = $request->file('photo')->store('users/');
                    $index = count(explode('/', $mediaPath)) - 1;
                    $mediaName = explode('/', $mediaPath)[$index];
               }
               $person->firstname = $request->get('fname');
               $person->lastname = $request->get('lname');
               $person->dob = $request->get('dob');
               $person->sex = $request->get('sex');
               $person->identification = $request->get('identification');
               $person->identification_type = $request->get('identificationType');
               $person->address = $request->get('address');
               $person->phone = $request->get('phone');
               $person->update();
               $user->username = $request->get('username');
               $user->email = $request->get('email');
               $user->profile_url = $mediaName;
               $user->update();
               return response()->json([
                    'name' => $person->name,
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
