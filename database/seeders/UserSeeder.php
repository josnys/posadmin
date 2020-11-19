<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
     /**
     * Run the database seeds.
     *
     * @return void
     */
     public function run()
     {
          $user = new User;
          $user->firstname = 'Josny J.';
          $user->lastname = 'Severe';
          $user->code = '0001';
          $user->username = 'josnys';
          $user->email = 'dirjos2014@gmail.com';
          $user->dob = '1984-05-21';
          $user->sex = 'Man';
          $user->identification = '008-378-446-3';
          $user->identification_type = 'CIN';
          $user->address = 'Anndan lakay mwen';
          $user->phone = '50948091228';
          $user->pin = '1234';
          $user->multi_connect = true;
          $user->password = Hash::make('password');
          $user->profile_url = null;
          $user->save();
          $user->syncRoles([1]);
     }
}
