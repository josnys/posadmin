<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
          ];
     }
}
