import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import axios from "axios";

export default function AddProductModal({ spkId, onClose, onAdded }) {
  const API = import.meta.env.VITE_API_URL;
  const [form, setForm] = useState({
    kode: "",
    item: "",
    model: "",
    warna: "",
    tebal: 0,
    lebar: 0,
    panjang: 0,
    qty: 0,
    press: 0,
    sisa: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!spkId) {
      alert("SPK tidak valid");
      return;
    }

    setLoading(true);
    const payload = {
      ...form,
      spk_id: spkId,
    };

    // ubah empty string jadi 0 untuk field number
    ["tebal", "lebar", "panjang", "qty", "press", "sisa"].forEach((key) => {
      if (payload[key] === "") payload[key] = 0;
    });
    try {
      console.log("SPK ID TYPE:", typeof spkId);
console.log("SPK ID VALUE:", spkId);
      await axios.post(`${API}/api/product`, payload);
      onAdded();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold text-white">Tambah Produk</h2>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <Input
            name="kode"
            label="Kode"
            value={form.kode}
            onChange={handleChange}
          />

          <Input
            name="item"
            label="Item"
            value={form.item}
            onChange={handleChange}
          />

          <Input
            name="model"
            label="Model"
            value={form.model}
            onChange={handleChange}
          />

          <Input
            name="warna"
            label="Warna"
            value={form.warna}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="tebal"
            min="0"
            label="Tebal"
            value={form.tebal}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="lebar"
            min="0"
            label="Lebar"
            value={form.lebar}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="panjang"
            label="Panjang"
            min="0"
            value={form.panjang}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="qty"
            label="Qty"
            min="0"
            value={form.qty}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="press"
            label="Press"
            min="0"
            value={form.press}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="sisa"
            label="Sisa"
            min="0"
            value={form.sisa}
            onChange={handleChange}
          />
          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={loading || !spkId}>
              {loading ? "Menyimpan..." : "Simpan Produk"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
