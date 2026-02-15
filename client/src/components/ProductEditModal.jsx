import { useState, useEffect, useRef } from 'react'

export default function ProductEditModal({ product, open, onClose, onSave }) {
  const [form, setForm] = useState(null)
  const prevPreviewRef = useRef(null)

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        price: (product.price || '').toString(),
        stock: (product.stock || '').toString(),
        description: product.description || '',
        category: product.category || 'medical',
        image: product.image || '',
        imageFile: null,
        previewUrl: product.image || '',
      })
    } else {
      setForm(null)
    }
  }, [product])

  useEffect(() => {
    const prev = prevPreviewRef.current
    if (prev && prev.startsWith && prev.startsWith('blob:') && form && prev !== form.previewUrl) {
      try { URL.revokeObjectURL(prev) } catch (e) {}
    }
    prevPreviewRef.current = form?.previewUrl
    return () => {
      const cur = prevPreviewRef.current
      if (cur && cur.startsWith && cur.startsWith('blob:')) {
        try { URL.revokeObjectURL(cur) } catch (e) {}
      }
    }
  }, [form?.previewUrl])

  if (!open || !form) return null

  const handleFileChange = (file) => {
    if (!file) {
      setForm((p) => ({ ...p, imageFile: null, previewUrl: '' }))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setForm((prev) => ({ ...prev, imageFile: file, previewUrl: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.stock) {
      alert('Please fill required fields')
      return
    }
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      description: form.description || '',
      category: form.category || 'medical',
    }
    if (form.imageFile) payload.imageFile = form.imageFile
    await onSave(product.id, payload)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{product?.id ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">Close</button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" required />
          <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input" type="number" step="0.01" required />
          <input value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input" type="number" required />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
            <option value="medical">Medical Supplies</option>
            <option value="mobility">Mobility Aids</option>
            <option value="bedroom">Bedroom Equipment</option>
            <option value="bathroom">Bathroom Aids</option>
            <option value="footwear">Footwear</option>
            <option value="braces">Braces & Support</option>
            <option value="diagnostics">Diagnostics</option>
            <option value="personal-care">Personal Care</option>
          </select>
          <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input" placeholder="Image URL" />
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} className="input" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input col-span-1 md:col-span-2" rows="3" />
          <div className="col-span-1 md:col-span-2 flex items-center space-x-2">
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <div className="ml-4 w-20 h-20 bg-gray-100 border rounded overflow-hidden">
              {form.previewUrl ? (
                <img src={form.previewUrl} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
