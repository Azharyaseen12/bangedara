"use client";

import React, { useState } from 'react';
import Button from '../../components/Button';
import { useToaster } from '../../components/Toaster';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToaster();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send message');
      showToast('Message sent successfully!', 'success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      showToast('Failed to send message', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col items-center justify-center px-4 py-12 animate-fade-in-up">
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2 text-center">Get in Touch</h1>
        <p className="text-base text-emerald-700 mb-8 text-center">We'd love to hear from you. Reach out with any questions, feedback, or just to say salaam!</p>
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input id="name" name="name" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition bg-white" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input id="email" name="email" type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition bg-white" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea id="message" name="message" required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition bg-white" value={form.message} onChange={handleChange} />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold tracking-wide btn-hover">{loading ? 'Sending...' : 'Send Message'}</Button>
        </form>
        <div className="mt-10 text-center">
          <div className="text-emerald-700 font-semibold">Phone: <a href="tel:+1234567890" className="underline">+1 234 567 890</a></div>
          <div className="text-emerald-700 font-semibold">Email: <a href="mailto:info@bangedara.com" className="underline">info@bangedara.com</a></div>
        </div>
      </div>
    </main>
  );
} 