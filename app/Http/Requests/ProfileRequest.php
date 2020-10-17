<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
     /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
     public function authorize()
     {
          return true;
     }

     /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
     public function rules()
     {
          return [
               'fname' => ['required', 'string', 'max:255'],
               'lname' => ['required', 'string', 'max:255'],
               'dob' => ['sometimes', 'date'],
               'sex' => ['sometimes', 'string'],
               'identification' => ['required', 'alpha_dash'],
               'identificationType' => ['required', 'string'],
               'phone' => ['required'],
               'current_username' => ['required'],
               'username' => ['required', 'exclude_if:current_username,'.auth()->user()->username, 'string', 'max:30', 'unique:users'],
               'current_email' => ['required'],
               'email' => ['required', 'exclude_if:current_email,'.auth()->user()->email, 'string', 'email', 'max:255', 'unique:users'],
               'photo' => ['sometimes', 'exclude_if:selectedAvatar,null', 'image', 'max:2048', 'mimes:jpeg,jpg,png']
          ];
     }
}
