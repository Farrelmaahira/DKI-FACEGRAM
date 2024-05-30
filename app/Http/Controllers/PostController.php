<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\PostAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $vld = Validator::make($request->all(), [
            'page' => 'min:0|integer',
            'size' => 'min:1|integer',
        ]);

        if($vld->fails()) {
            return response()->json([
                'message' => 'invalid field',
                'errors' => $vld->messages()
            ], 422);
        }

        $size = 10; 
        $request->get('size') ? $size = $request->get('size') : $size = 10;
        $post = Post::paginate($size);
        return response()->json([
            'size' => $post->perPage(),
            'page' => $post->currentPage(), 
            'posts' => PostResource::collection($post),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $vld = Validator::make($request->all(), [
            'caption' => 'required',
            'attachments' => 'required|array',
            'attachments.*' => 'mimes:jpg,jpeg,png,gif,webp'
        ]);
        if($vld->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $vld->messages()
            ]);
        }
        $attachments = $request->file('attachments');
        $post = Post::create([
            'user_id' => $user->id,
            'caption' => $request->caption
        ]);
        foreach($attachments as $attachment) {
            $path = $attachment->storeAs('attachments', $attachment->getClientOriginalName());
            PostAttachment::create([
                'post_id' => $post->id,
                'storage_path' => $path
            ]);
        }
        return response()->json([
            'message' => 'Post Success'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Auth::user()->id;
        $post = Post::find($id);

        if($post->user_id === $user) {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }

        if($post == null) {
            return response()->json([
                'message' => 'Post not found'
            ]);
        }
        $post->delete();
        if($post) {
            return response()->json([
                'message' => 'Post has been deleted'
            ], 204);
        }
    }
}
