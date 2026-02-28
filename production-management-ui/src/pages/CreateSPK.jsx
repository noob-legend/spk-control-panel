import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SPKForm from "../components/spk/SPKForm";

export default function CreateSPK() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    const cleanedData = {
      ...form,
      level_kepentingan: Number(form.level_kepentingan),
      total_unit: Number(form.total_unit),
      tanggal_dibuat: form.tanggal_dibuat || null,
      tanggal_deadline: form.tanggal_deadline || null,
    };

    try {
      await axios.post(`${API}/api/spk`, cleanedData);

      toast.success("SPK berhasil ditambahkan");
      navigate("/spk");
    } catch (error) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Tambah SPK</h1>
      <SPKForm onSubmit={handleSubmit} />
    </div>
  );
}
