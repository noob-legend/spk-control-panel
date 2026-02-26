import { useState } from "react";
import axios from "axios";
import Button from "../ui/Button";

export default function EditProductModal({ product, onClose, onUpdated }) {
  const [form, setForm] = useState({
    item: product.item || "",
    model: product.model || "",
    warna: product.warna || "",
    tebal: product.tebal || "",
    lebar: product.lebar || "",
    panjang: product.panjang || "",
    qty: product.qty || "",
    press: product.press || "",
    sisa: product.sisa || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/product/${product._id}`, {
        ...form,
        qty: Number(form.qty),
        press: Number(form.press),
        sisa: Number(form.sisa),
        tebal: Number(form.tebal),
        lebar: Number(form.lebar),
        panjang: Number(form.panjang),
      });

      onUpdated();
      onClose();
    } catch (error) {
      console.error("Gagal update produk:", error);
      alert("Gagal update produk");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-white mb-6">Edit Produk</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Input
            label="Item"
            name="item"
            value={form.item}
            onChange={handleChange}
          />
          <Input
            label="Model"
            name="model"
            value={form.model}
            onChange={handleChange}
          />
          <Input
            label="Warna"
            name="warna"
            value={form.warna}
            onChange={handleChange}
          />
          <Input
            label="Tebal"
            name="tebal"
            value={form.tebal}
            onChange={handleChange}
          />
          <Input
            label="Lebar"
            name="lebar"
            value={form.lebar}
            onChange={handleChange}
          />
          <Input
            label="Panjang"
            name="panjang"
            value={form.panjang}
            onChange={handleChange}
          />
          <Input
            label="Qty"
            name="qty"
            value={form.qty}
            onChange={handleChange}
          />
          <Input
            label="Press"
            name="press"
            value={form.press}
            onChange={handleChange}
          />
          <Input
            label="Sisa"
            name="sisa"
            value={form.sisa}
            onChange={handleChange}
          />

          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <Button variant="secondary" type="button" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan Perubahan</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Reusable Input */
function Input({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-400 text-sm mb-1">{label}</label>
      <input
        {...props}
        className="bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
