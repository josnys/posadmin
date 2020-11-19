<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductConfigurationRequest extends FormRequest
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
               'product' => ['required', 'numeric', 'gt:0'],
               'presentation' => ['required', 'numeric', 'gt:0'],
               'agency' => ['required', 'numeric', 'gt:0'],
               'code' => ['exclude_if:action,edit', 'required', 'alpha_dash', 'unique:product_configurations,code'],
               'transformable' => ['required']
          ];
     }
}
