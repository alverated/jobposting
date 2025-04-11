<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $notifications = $user->notifications()->paginate(10);

        return response()->json($notifications);
    }

    public function unreadCount()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $unreadCount = $user->unreadNotifications()->count();

        return response()->json($unreadCount);
    }

    public function markAsRead(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        /** @var \Illuminate\Notifications\DatabaseNotification|null $notification */
        $notification = $user->notifications()
            ->where('id', $request->route('notification'))
            ->first();

        if ($notification) {
            $notification->markAsRead();

            return response()->json(['message' => 'Notification marked as read']);
        }

        return response()->json(['message' => 'Notification not found'], 404);
    }

    public function markAllAsRead()
    {
        /** @var \App\Models\User */
        $user = Auth::user();

        $user->unreadNotifications->markAsRead();

        return response()->json(['message' => 'All notifications marked as read']);
    }

    public function clear()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $user->notifications()->delete();

        return response()->json(['message' => 'All notifications deleted']);
    }

    public function destroy(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        /** @var \Illuminate\Notifications\DatabaseNotification|null $notification */
        $notification = $user->notifications()
            ->where('id', $request->route('notification'))
            ->first();

        if ($notification) {
            $notification->delete();

            return response()->json(['message' => 'Notification deleted']);
        }

        return response()->json(['message' => 'Notification not found'], 404);
    }
}
