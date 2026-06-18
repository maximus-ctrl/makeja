<?php
namespace App\Http\Controllers\Api;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\ClientProfile;
use App\Models\ProviderProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string','max:120'],
            'email' => ['required','email','unique:users,email'],
            'phone' => ['nullable','string','max:30'],
            'password' => ['required','string','min:8'],
            'role' => ['required', Rule::in([UserRole::Client->value, UserRole::Provider->value])],
            'business_name' => ['nullable','string','max:160'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'role' => $data['role'],
            'password' => Hash::make($data['password']),
            'is_active' => true,
        ]);

        if ($user->role === UserRole::Provider->value) {
            ProviderProfile::create(['user_id'=>$user->id,'business_name'=>$data['business_name'] ?? $user->name,'verification_status'=>'unverified']);
        } else {
            ClientProfile::create(['user_id'=>$user->id]);
        }

        return response()->json(['user'=>$user, 'token'=>$user->createToken('makeja-api')->plainTextToken], 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate(['email'=>['required','email'], 'password'=>['required','string']]);
        $user = User::where('email', $data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message'=>'Invalid login details.'], 422);
        }
        if (!$user->is_active) return response()->json(['message'=>'Account disabled.'], 403);
        return response()->json(['user'=>$user, 'token'=>$user->createToken('makeja-api')->plainTextToken]);
    }

    public function me(Request $request){ return response()->json(['user'=>$request->user()->load(['providerProfile','clientProfile'])]); }
    public function logout(Request $request){ $request->user()->currentAccessToken()?->delete(); return response()->json(['message'=>'Logged out']); }
}
