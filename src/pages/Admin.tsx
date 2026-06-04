import { useEffect, useRef, useState } from 'react';
import { Plus, Pencil, Trash2, X, LogOut, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase, type DbProduct } from '../lib/supabase';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

type FormData = {
  name: string;
  type: 'Kalyani Cotton' | 'Soft Silk';
  price: string;
  mrp: string;
  is_new: boolean;
  in_stock: boolean;
  image_url: string;
};

const EMPTY: FormData = {
  name: '', type: 'Kalyani Cotton', price: '', mrp: '',
  is_new: false, in_stock: true, image_url: '',
};

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState('');

  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<DbProduct | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const notify = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1');
      setAuthed(true);
    } else {
      setPwErr('Wrong password. Try again.');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthed(false);
  };

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) loadProducts();
  }, [authed]);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setShowForm(true);
  };

  const openEdit = (p: DbProduct) => {
    setEditing(p);
    setForm({
      name: p.name, type: p.type,
      price: String(p.price), mrp: p.mrp ? String(p.mrp) : '',
      is_new: p.is_new, in_stock: p.in_stock, image_url: p.image_url,
    });
    setShowForm(true);
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('product-images').upload(path, file);
    if (error) { notify('Image upload failed: ' + error.message, false); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: publicUrl }));
    setUploading(false);
    notify('Image uploaded!');
  };

  const save = async () => {
    if (!form.name.trim() || !form.price || !form.image_url) {
      notify('Name, price and image are required.', false);
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      type: form.type,
      price: Number(form.price),
      mrp: form.mrp ? Number(form.mrp) : null,
      is_new: form.is_new,
      in_stock: form.in_stock,
      image_url: form.image_url,
    };
    if (editing) {
      const { error } = await supabase.from('products').update(payload).eq('id', editing.id);
      if (error) notify('Update failed: ' + error.message, false);
      else { notify('Product updated!'); setShowForm(false); loadProducts(); }
    } else {
      const { error } = await supabase.from('products').insert(payload);
      if (error) notify('Add failed: ' + error.message, false);
      else { notify('Product added!'); setShowForm(false); loadProducts(); }
    }
    setSaving(false);
  };

  const deleteProduct = async (p: DbProduct) => {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from('products').delete().eq('id', p.id);
    if (error) notify('Delete failed: ' + error.message, false);
    else { notify('Product deleted!'); loadProducts(); }
  };

  // ── Login screen ──────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-sm shadow-md p-8">
          <img src="/logo.png" alt="A1 Sanskriti Silks" className="h-14 mx-auto mb-6 object-contain" />
          <h1 className="text-center font-medium text-xl text-wine-deep mb-6">Admin Login</h1>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwErr(''); }}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Enter admin password"
            className="w-full border border-wine/20 rounded-sm px-4 py-3 text-[14px] outline-none focus:border-wine mb-2"
          />
          {pwErr && <p className="text-red-500 text-[12px] mb-2">{pwErr}</p>}
          <button onClick={login} className="w-full bg-wine-deep text-white text-[12px] tracking-[0.2em] uppercase font-semibold py-3 rounded-sm hover:bg-wine transition-colors">
            Login
          </button>
        </div>
      </div>
    );
  }

  // ── Admin panel ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-wine-deep text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="h-9 object-contain" />
          <span className="font-medium text-[15px]">Admin Panel</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-white/70 hover:text-white text-[12px] transition-colors">
            View Site ↗
          </a>
          <button onClick={logout} className="flex items-center gap-1.5 text-white/70 hover:text-white text-[12px] transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-8">
        {/* Title + Add button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[22px] font-medium text-ink">Products</h2>
            <p className="text-ink-soft text-[13px]">{products.length} products in store</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-wine-deep text-white text-[12px] tracking-[0.15em] uppercase font-semibold px-4 py-2.5 rounded-sm hover:bg-wine transition-colors"
          >
            <Plus size={15} /> Add Product
          </button>
        </div>

        {/* Products grid */}
        {loading ? (
          <div className="text-center py-20 text-ink-soft">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
                <div className="relative aspect-[4/3] bg-gray-50">
                  <img
                    src={p.image_url.startsWith('http') ? p.image_url : `http://localhost:5173${p.image_url}`}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                  />
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    <button
                      onClick={() => openEdit(p)}
                      className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center hover:bg-gold/10 transition-colors"
                    >
                      <Pencil size={12} className="text-ink" />
                    </button>
                    <button
                      onClick={() => deleteProduct(p)}
                      className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={12} className="text-red-500" />
                    </button>
                  </div>
                  {!p.in_stock && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-1 tracking-widest uppercase">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-medium text-[14px] leading-tight truncate">{p.name}</p>
                  <p className="text-[11px] text-ink-soft mt-0.5">{p.type}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[14px] font-semibold text-wine-deep">₹{p.price}</span>
                    {p.mrp && <span className="text-[12px] text-ink-soft line-through">₹{p.mrp}</span>}
                    {p.is_new && <span className="text-[9px] bg-gold/20 text-gold px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">New</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-medium text-[17px]">{editing ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowForm(false)}>
                <X size={20} className="text-ink-soft hover:text-ink" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[11px] tracking-[0.12em] uppercase text-ink-soft mb-1.5">Product Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Mayil Kalyani"
                  className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-[14px] outline-none focus:border-wine"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-[11px] tracking-[0.12em] uppercase text-ink-soft mb-1.5">Category *</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as FormData['type'] }))}
                  className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-[14px] outline-none focus:border-wine bg-white"
                >
                  <option>Kalyani Cotton</option>
                  <option>Soft Silk</option>
                </select>
              </div>

              {/* Price + MRP */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] tracking-[0.12em] uppercase text-ink-soft mb-1.5">Selling Price (₹) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="1299"
                    className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-[14px] outline-none focus:border-wine"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.12em] uppercase text-ink-soft mb-1.5">MRP (₹) — optional</label>
                  <input
                    type="number"
                    value={form.mrp}
                    onChange={(e) => setForm((f) => ({ ...f, mrp: e.target.value }))}
                    placeholder="1799"
                    className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-[14px] outline-none focus:border-wine"
                  />
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-[11px] tracking-[0.12em] uppercase text-ink-soft mb-1.5">Product Image *</label>
                {form.image_url && (
                  <img
                    src={form.image_url.startsWith('http') ? form.image_url : `http://localhost:5173${form.image_url}`}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-sm mb-2 border border-gray-100"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); }}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-full border-2 border-dashed border-gray-200 hover:border-wine rounded-sm py-3 text-[12px] text-ink-soft hover:text-wine flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload size={14} />
                  {uploading ? 'Uploading...' : form.image_url ? 'Change Image' : 'Upload Image'}
                </button>
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-[14px]">
                  <input type="checkbox" checked={form.is_new}
                    onChange={(e) => setForm((f) => ({ ...f, is_new: e.target.checked }))}
                    className="accent-wine w-4 h-4" />
                  Mark as New
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[14px]">
                  <input type="checkbox" checked={form.in_stock}
                    onChange={(e) => setForm((f) => ({ ...f, in_stock: e.target.checked }))}
                    className="accent-wine w-4 h-4" />
                  In Stock
                </label>
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-200 text-ink text-[12px] tracking-[0.15em] uppercase font-semibold py-3 rounded-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving || uploading}
                className="flex-1 bg-wine-deep text-white text-[12px] tracking-[0.15em] uppercase font-semibold py-3 rounded-sm hover:bg-wine transition-colors disabled:opacity-60"
              >
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-3 rounded-sm shadow-lg text-white text-[13px] z-[200] transition-all ${toast.ok ? 'bg-emerald-600' : 'bg-red-600'}`}>
          {toast.ok ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
