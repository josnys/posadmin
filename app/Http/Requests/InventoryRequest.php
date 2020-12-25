<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InventoryRequest extends FormRequest
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
               'stock' => ['required', 'numeric', 'gt:0'],
               'quantity' => ['required', 'numeric', 'gt:0']
          ];
     }

     public function messages()
     {
          return [
               'stock.required' => 'The stock number is required',
               'stock.numeric' => 'The stock should be numeric',
               'stock.gt' => 'The stock number should be greater than 0',
               'quantity.required' => 'The quantity field is required',
               'quantity.numeric' => 'The quantity field should be numeric',
               'quantity.gt' => 'The quantity field should be greater than 0',
          ];
     }
}
