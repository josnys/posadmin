<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
               'slogan' => ['sometimes', 'nullable', 'string', 'max:80'],
               'image' => ['sometimes', 'exclude_if:selectedLogo,null', 'image', 'max:2048', 'mimes:jpeg,jpg,png'],
               'type' => ['required', 'string']
          ];
     }
}
