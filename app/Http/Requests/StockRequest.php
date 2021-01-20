<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StockRequest extends FormRequest
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
               'products' => ['required', 'array'],
               'products.*.qty_comfirm' => ['required', 'numeric', 'gt:0'],
               'products.*.price' => ['required', 'numeric', 'gt:0'],
          ];
     }
}