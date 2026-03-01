import { useState } from "react";
import axios from "axios";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ProductForm({ spkId, onSuccess }) {
  const API = import.meta.env.VITE_API_URL;
  const api = axios.create({
  baseURL: API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
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

    try {
      await api.post(`/api/products`, {
        ...form,
        spk_id: spkId,
      });

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan produk");
    }
  };

  return (
    <form className="grid grid-cols-3 gap-3" onSubmit={handleSubmit}>
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
        label="Tebal"
        value={form.tebal}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="lebar"
        label="Lebar"
        value={form.lebar}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="panjang"
        label="Panjang"
        value={form.panjang}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="qty"
        label="Qty"
        value={form.qty}
        onChange={handleChange}
      />

      <div className="col-span-3">
        <Button type="submit">Tambah Item</Button>
      </div>
    </form>
  );
}
