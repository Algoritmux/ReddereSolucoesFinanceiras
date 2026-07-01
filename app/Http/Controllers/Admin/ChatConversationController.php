<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChatConversation;
use Illuminate\Http\RedirectResponse;

class ChatConversationController extends Controller
{
    public function destroy(ChatConversation $chatConversation): RedirectResponse
    {
        $chatConversation->delete();

        return back()->with('success', 'Conversa removida.');
    }
}
