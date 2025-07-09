import React, { useState } from 'react';
import Button from './Button';

export default function CommentForm({ onSubmit, loading }: { onSubmit: (content: string) => void, loading: boolean }) {
  const [content, setContent] = useState('');
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (content.trim()) {
          onSubmit(content);
          setContent('');
        }
      }}
      className="w-full"
    >
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-base bg-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
          placeholder="Write a comment..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          disabled={loading}
        />
        <Button type="submit" loading={loading} size="md" className="px-5 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-md btn-hover">
          Send
        </Button>
      </div>
    </form>
  );
} 