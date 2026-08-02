'use client';

import React, { useState } from 'react';
import { PlusCircle, UploadCloud, Pizza, DollarSign, Image as ImageIcon } from 'lucide-react';

export default function FoodCatalog() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Pizza',
    price: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/food/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'New item added to the menu!' });
        setFormData({ name: '', description: '', category: 'Pizza', price: '', image: '' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to add item' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Server connection error.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Pizza className="text-orange-500" size={24} /> Add New Menu Item
        </h2>
        <p className="text-xs text-slate-400 mt-1">Publish new pizzas or beverages directly to your live database.</p>
      </div>

      {message && (
        <div className={`p-3.5 rounded-xl text-xs font-semibold ${message.type === 'success' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800' : 'bg-rose-950/60 text-rose-400 border border-rose-800'
          }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pizza / Item Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Spicy Pepperoni Feast"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
            >
              <option value="Pizza">Pizza</option>
              <option value="Drink">Drink</option>
              <option value="Side">Side</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description & Ingredients</label>
          <textarea
            rows={3}
            required
            placeholder="e.g. Double cheese, jalapeños, spicy pepperoni, oregano"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Price */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Price ($)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-500 text-sm">$</span>
              <input
                type="number"
                step="0.01"
                required
                placeholder="14.99"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-3.5 top-3 text-slate-500" size={16} />
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <PlusCircle size={18} />
          {loading ? 'Adding to Database...' : 'Publish Item'}
        </button>
      </form>
    </div>
  );
}