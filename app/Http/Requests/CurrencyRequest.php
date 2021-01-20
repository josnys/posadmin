<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CurrencyRequest extends FormRequest
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
               'prev_code' => ['sometimes'],
               'code' => ['exclude_unless:prev_code,null', 'required', 'string', 'max:5', 'unique:currencies'],
               'sell' => ['sometimes', 'numeric'],
               'buy' => ['sometimes', 'numeric']
          ];
     }
}
