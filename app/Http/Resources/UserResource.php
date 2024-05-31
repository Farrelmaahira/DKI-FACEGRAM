<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function isFollowing($data) {
        $status = $data->where('pivot.follower_id', Auth::id())->first();

        if($status == null) {
            return 'Not Following';
        }
        
        if($status->pivot->is_accepted == 1) {
            return 'Following';
        } 

        if($status->pivot->is_accepted == 0) {
            return 'Requested';
        }
    }
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'full_name' => $this->full_name,
            'bio' => $this->bio,
            'is_private' => $this->is_private,
            'is_your_account' => Auth::id() == $this->id ? true : false,
            'following_status' => $this->isFollowing($this->follower),
            'followers_count' => $this->follower->count(),
            'following_count' => $this->following->count(),
            'posts' => PostResource::collection($this->posts),
            'posts_count' => $this->posts->count(),
            'followers' => $this->follower,
            'following' => $this->following
        ];
    }
}
