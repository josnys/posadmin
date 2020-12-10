<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PurchaseRequest extends FormRequest
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
               'supplier' => ['required', 'numeric', 'gt:0'],
               'receipt' => ['required', 'string'],
               'amount' => ['numeric'],
               'tax' => ['numeric'],
               'transport' => ['numeric'],
               'products' => ['required', 'array'],
               'products.*.cost' => ['exclude_if:products.*.qty_recieve,0', 'gt:0']
          ];
     }

     public function messages()
     {
          return [
               'products.*.cost.gt' => 'The cost must be greater than 0.'
          ];
     }
}
