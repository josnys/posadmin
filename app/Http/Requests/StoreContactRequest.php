<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
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
               'type' => ['required', 'string'],
               'reference' => ['required', 'string', 'max:60'],
               'link' => ['sometimes', 'nullable', 'string', 'max:80'],
          ];
     }
}
