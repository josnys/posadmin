<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Person;
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
          $person = new Person;
          $person->firstname = 'Josny J.';
          $person->lastname = 'Severe';
          $person->code = '0001';
          $person->dob = '1984-05-21';
          $person->sex = 'Man';
          $person->identification = '008-378-446-3';
          $person->identification_type = 'CIN';
          $person->address = 'Anndan lakay mwen';
          $person->phone = '50948091228';
          $person->save();

          $user = new User;
          $user->person_id = $person->id;
          $user->username = 'josnys';
          $user->email = 'dirjos2014@gmail.com';
          $user->pin = '1234';
          $user->multi_connect = true;
          $user->password = Hash::make('password');
          $user->profile_url = null;
          $user->save();
          $user->syncRoles([1]);
     }
}
