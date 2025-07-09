import React, { useState } from 'react';
import Button from './Button';

interface Comment {
  id: number;
  user_username: string;
  created_at: string;
  content: string;
  replies: Reply[];
}
interface Reply {
  id: number;
  user_username: string;
  created_at: string;
  content: string;
}

function getInitials(name: string) {
  if (!name) return '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function CommentList({ comments, onReply, canReply, loadingReply }: {
  comments: Comment[];
  onReply: (commentId: number, content: string) => void;
  canReply: boolean;
  loadingReply: boolean;
}) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});

  return (
    <ul className="divide-y divide-gray-200">
      {comments.map(comment => (
        <li key={comment.id} className="bg-white border border-gray-200 px-4 py-3">
          <div className="flex gap-3 items-start">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-base mt-1">
              {getInitials(comment.user_username)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800 text-sm">{comment.user_username}</span>
                <span className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleString()}</span>
              </div>
              <div className="text-gray-900 text-base mb-1">
                {comment.content}
              </div>
              {canReply && (
                <div className="mb-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs px-3 py-1 text-emerald-700 hover:bg-emerald-50"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    Reply
                  </Button>
                </div>
              )}
              {/* Reply form for this comment */}
              {canReply && replyingTo === comment.id && (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    if (replyContent[comment.id]?.trim()) {
                      onReply(comment.id, replyContent[comment.id]);
                      setReplyContent(rc => ({ ...rc, [comment.id]: '' }));
                      setReplyingTo(null);
                    }
                  }}
                  className="mb-2"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-base bg-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                      placeholder="Write a reply..."
                      value={replyContent[comment.id] || ''}
                      onChange={e => setReplyContent(rc => ({ ...rc, [comment.id]: e.target.value }))}
                      required
                      disabled={loadingReply}
                    />
                    <Button type="submit" loading={loadingReply} size="sm" className="rounded-md px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 btn-hover">
                      Send
                    </Button>
                    <Button type="button" size="sm" variant="ghost" className="rounded-md px-4 py-2" onClick={() => setReplyingTo(null)}>Cancel</Button>
                  </div>
                </form>
              )}
              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <ul className="mt-2 space-y-2 pl-6 border-l-2 border-emerald-50">
                  {comment.replies.map((reply) => (
                    <li key={reply.id} className="">
                      <div className="flex gap-2 items-start">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs mt-1">
                          {getInitials(reply.user_username)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-700 text-xs">{reply.user_username}</span>
                            <span className="text-xs text-gray-400">{new Date(reply.created_at).toLocaleString()}</span>
                          </div>
                          <div className="text-gray-900 text-base">
                            {reply.content}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
} 