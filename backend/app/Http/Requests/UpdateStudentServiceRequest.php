<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|min:50|max:2000',
            'category' => 'sometimes|required|string|max:255',
            'city' => 'sometimes|required|string|max:255',
            'availability' => 'sometimes|required|string|min:10|max:500',
            'is_active' => 'sometimes|boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The service title is required.',
            'title.max' => 'The title may not be greater than 255 characters.',
            'description.required' => 'The service description is required.',
            'description.min' => 'The description must be at least 50 characters.',
            'description.max' => 'The description may not be greater than 2000 characters.',
            'category.required' => 'The service category is required.',
            'city.required' => 'The city is required.',
            'availability.required' => 'The availability information is required.',
            'availability.min' => 'The availability information must be at least 10 characters.',
        ];
    }
}
