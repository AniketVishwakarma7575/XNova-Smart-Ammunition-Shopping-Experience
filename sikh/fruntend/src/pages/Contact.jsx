import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // very basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Name, email and message are required.');
      return;
    }
    // simple email regex
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Please enter a valid email.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Server error');
      }

      setSuccess('Message sent — we will contact you soon!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-6">
        <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Get in touch</h1>
          <p className="mt-2 text-gray-600">Questions about orders, products or collaborations? Send us a message.</p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* FORM */}
          <motion.section initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-red-600 bg-red-50 p-2 rounded">{error}</div>}
              {success && <div className="text-green-700 bg-green-50 p-2 rounded">{success}</div>}

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="Your full name"
                  aria-required="true"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="you@example.com"
                  aria-required="true"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Subject (optional)</span>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="Order question, product inquiry..."
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="Write your message..."
                  aria-required="true"
                />
              </label>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 bg-black text-white px-5 py-2 rounded-full font-medium shadow hover:opacity-95 disabled:opacity-60"
                >
                  {loading ? (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  ) : null}
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>

                <div className="text-sm text-gray-500">
                  Or reach us at <a href="mailto:help@nikestore.example" className="underline">help@XNova - Aim.example</a>
                </div>
              </div>
            </form>
          </motion.section>

          {/* CONTACT INFO + MAP */}
          <motion.aside initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="text-xl font-semibold">Customer Support</h3>
              <p className="mt-2 text-gray-600">Mon — Fri: 9:00 — 18:00</p>

              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                <li><strong>Phone:</strong> <a href="tel:+911234567890" className="underline">+91 12345 67890</a></li>
                <li><strong>Email:</strong> <a href="mailto:support@nikestore.example" className="underline">support@XNova-Aim.example</a></li>
                <li><strong>Address:</strong> 123 XNova - Aim St, Thane, Maharashtra</li>
              </ul>

              <div className="mt-4 flex gap-2">
                <a href="/shop" className="px-3 py-2 border rounded text-sm">Shop</a>
                <a href="/about" className="px-3 py-2 border rounded text-sm">About</a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Replace src with your store location map or keep iframe */}
              <iframe
                title="store-location"
                src="https://www.google.com/maps?q=Thane+India&output=embed"
                className="w-full h-56 border-0"
                loading="lazy"
              />
            </div>

            <div className="bg-white rounded-lg shadow p-4 text-sm text-gray-600">
              <h4 className="font-semibold mb-2">Frequently asked</h4>
              <ul className="space-y-2">
                <li><strong>Orders:</strong> Shipping in 3–7 business days.</li>
                <li><strong>Returns:</strong> 30 days return policy.</li>
                <li><strong>Size help:</strong> Check product page size chart.</li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
};

export default Contact;
