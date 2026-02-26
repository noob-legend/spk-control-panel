import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function SPKForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({
    nomor_spk: "",
    nomor_oc: "",
    customer: "",
    proyek: "",
    level_kepentingan: 1,
    status: "Produksi",
    tanggal_dibuat: "",
    tanggal_deadline: "",
    total_unit: 0,
  });

  // Update form jika ada initialData (untuk edit)
  useEffect(() => {
    if (initialData) {
      setForm({
        nomor_spk: initialData.nomor_spk || "",
        nomor_oc: initialData.nomor_oc || "",
        customer: initialData.customer || "",
        proyek: initialData.proyek || "",
        level_kepentingan: initialData.level_kepentingan || 1,
        status: initialData.status || "Produksi",
        tanggal_dibuat: initialData.tanggal_dibuat
          ? new Date(initialData.tanggal_dibuat).toISOString().split("T")[0]
          : "",
        tanggal_deadline: initialData.tanggal_deadline
          ? new Date(initialData.tanggal_deadline).toISOString().split("T")[0]
          : "",
        total_unit: initialData.total_unit || 0,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "level_kepentingan" || name === "total_unit"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <Input
        name="nomor_spk"
        label="Nomor SPK"
        value={form.nomor_spk}
        onChange={handleChange}
      />
      <Input
        name="nomor_oc"
        label="Nomor OC"
        value={form.nomor_oc}
        onChange={handleChange}
      />
      <Input
        name="customer"
        label="Customer"
        value={form.customer}
        onChange={handleChange}
      />
      <Input
        name="proyek"
        label="Proyek"
        value={form.proyek}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="level_kepentingan"
        label="Prioritas (1–3)"
        value={form.level_kepentingan}
        onChange={handleChange}
      />

      <select
        name="status"
        className="bg-gray-800 p-2 rounded"
        value={form.status}
        onChange={handleChange}
      >
        <option>Produksi</option>
        <option>Packing</option>
        <option>Pengiriman</option>
        <option>Selesai</option>
      </select>

      <Input
        type="date"
        name="tanggal_dibuat"
        label="Tanggal Dibuat"
        value={form.tanggal_dibuat}
        onChange={handleChange}
      />
      <Input
        type="date"
        name="tanggal_deadline"
        label="Deadline"
        value={form.tanggal_deadline}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="total_unit"
        label="Total Unit"
        value={form.total_unit}
        onChange={handleChange}
      />

      <div className="col-span-2 mt-4">
        <Button type="submit">Simpan SPK</Button>
      </div>
    </form>
  );
}
