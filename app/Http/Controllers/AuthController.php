<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $vld = Validator::make($request->all(), [
            'full_name' => 'required',
            'bio' => 'required|max:100',
            'username' => 'required|min:3|unique:users,username|',
            'password' => 'required|min:6',
            'is_private' => 'boolean'
        ]);

        if ($vld->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $vld->messages()
            ], 401);
        }

        $user = User::create([
            'full_name' => $request->full_name,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'bio' => $request->bio,
            'is_private' => $request->is_private
        ]);

        $token = $user->createToken('myToken')->plainTextToken;
        return response()->json([
            'message' => 'register success',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function login(Request $request)
    {
        $vld = Validator::make($request->all(), [
            'username' => 'required|min:3',
            'password' => 'required|min:6'
        ]);

        if ($vld->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $vld->messages()
            ]);
        }

        $user = User::where('username', $request->username)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Wrong username or password'
            ]);
        }

        $token = $user->createToken('myToken')->plainTextToken;
        return response()->json([
            'message' => 'Login success',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user();
            $user->tokens()->delete();
            if ($user) {
                return response()->json([
                    'message' => 'logout success'
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], $th->getCode());
        }
    }
}
