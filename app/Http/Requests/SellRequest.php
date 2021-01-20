<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SellRequest extends FormRequest
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
               'customer' => ['required', 'numeric', 'gt:0'],
               'amount' => ['required', 'numeric', 'min:0'],
               'tax' => ['required', 'numeric', 'min:0'],
               'delivery' => ['required', 'numeric', 'min:0'],
               'discount' => ['required', 'numeric', 'min:0'],
               'items' => ['required', 'array'],
               'items.*.product_id' => ['required', 'numeric', 'gt:0'],
               'items.*.inventory_code' => ['required', 'numeric', 'gt:0'],
               'items.*.quantity' => ['required', 'numeric', 'gt:0'],
               'items.*.price' => ['required', 'numeric', 'gt:0'],
               'payments' => ['required', 'array'],
               'payments.*.method' => ['exclude_if:payments,null', 'required', 'numeric', 'gt:0'],
               'payments.*.currency' => ['exclude_if:payments,null', 'required', 'numeric', 'gt:0'],
               'payments.*.amount' => ['exclude_if:payments,null', 'required', 'numeric'],
               'payments.*.paid' => ['exclude_if:payments,null', 'required', 'numeric', 'gt:0'],
          ];
     }
}
