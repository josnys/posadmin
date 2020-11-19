<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SupplierRequest extends FormRequest
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
               'name' => ['required', 'string', 'max:80'],
               'country' => ['required', 'string', 'max:60'],
               'state' => ['required', 'string', 'max:60'],
               'city' => ['required', 'string', 'max:60'],
               'phone' => ['required', 'alpha_num', 'max:20'],
               'email' => ['exclude_unless:email,null', 'email'],
          ];
     }
}
