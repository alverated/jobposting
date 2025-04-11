<?php

namespace App\Http\Requests;

use App\Enums\UserType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreJobPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /** @var \App\Models\User */
        $user = Auth::user();

        /** @var \App\Enums\UserType */
        $userType = $user->type;

        return $userType === UserType::USER;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'description' => 'required|string|max:10000',
        ];
    }
}
