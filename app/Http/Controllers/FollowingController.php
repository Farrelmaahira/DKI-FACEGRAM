<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

use function PHPUnit\Framework\isNull;

class FollowingController extends Controller
{
    public function follow($username)
    {
        $authUser = Auth::user();
        $user = User::where('username', $username)->first();

        if ($user == null) {
            return response()->json([
                'message' => 'not found'
            ], 404);
        }

        if ($user->id == $authUser->id) {
            return response()->json([
                'mesage' => 'youre not allowed to follow yourself'
            ]);
        }


        $follow = Follow::query();
        $alreadyFoll = $follow->where([
            'follower_id' => $authUser->id,
            'following_id' => $user->id
        ])->first();

        if ($alreadyFoll != null) {
            if ($alreadyFoll->is_accepted == false) {
                return response()->json([
                    'mesage' => 'you already followed',
                    'status' => 'requested'
                ]);
            }
        }

        if ($user->is_private == true) {
            Follow::create([
                'follower_id' => $authUser->id,
                'following_id' => $user->id,
                'is_accepted' => false
            ]);
            return response()->json([
                'message' => 'follow success',
                'status' => 'requested'
            ]);
        }
        Follow::create([
            'follower_id' => $authUser->id,
            'following_id' => $user->id,
            'is_accepted' => false
        ]);
        return response()->json([
            'message' => 'follow success',
            'status' => 'following'
        ]);
    }

    public function unfollow($username)
    {
        $authUser = Auth::user()->id;
        $user = User::where('username', $username)->first();
        $follow = Follow::query();

        if($user == null) {
            return response()->json([
                'message' => 'user not found'
            ], 404);
        }

        $userFollow = $follow->where([
            'follower_id' => $authUser,
            'following_id' => $user->id
        ]);

        if($userFollow->first() == null) {
            return response()->json([
                'messagee' => 'you are not following the user'
            ], 422); 
        }

        $userFollow->delete();
        if($userFollow) {
            return response()->json([
                'message' => 'unfollow success'
            ], 204);
        }

    }

    public function getAllFollowing()
    {
        $authUser = Auth::user();
        return response()->json([
            'following' =>$authUser->following
        ]);
    }

    public function acceptFollower($username)
    {
        $user = Auth::user();
        $follower = $user->follower->where('username', $username)->first();
        if(is_null($follower)) {
            return response()->json([
                'message' => 'the user if not following you'
            ]);
        }
        $followQ = Follow::where([
            'follower_id' => $follower->id,
            'following_id' => $user->id
        ]);

        $followQ->update([
            'is_accepted' => true
        ]);

        if($followQ) {
            return response()->json([
                'message' => 'Follow request accepted'
            ]);
        }
    }

    public function getAllFollower($username)
    {
        $user = User::where('username', $username)->first();
        if(is_null($user)) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        $userFollower = collect($user->follower);
        $filter = $userFollower->filter(function($user){
            return $user->pivot->is_accepted == 1;
        });
        return response()->json([
            'followers' => $filter
        ]);
    }
}
