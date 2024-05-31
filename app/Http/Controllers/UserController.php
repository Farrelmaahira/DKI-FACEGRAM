<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile($username) 
    {
        $user = User::where('username', $username)->first();
        return response()->json([
           'data' => new UserResource($user)
        ]);
    }
}
