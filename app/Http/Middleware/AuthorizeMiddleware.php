<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthorizeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $postId = $request->id;
        $isOwnPost = $user->posts->find($postId);
        if(is_null($isOwnPost)) {
            return response()->json([
                'message' => 'forbidden access'
            ], 403);
        }
        
        return $next($request);
    }
}
