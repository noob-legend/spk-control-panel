import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import axios from "axios";

import Button from "../components/ui/Button";
import DataTable from "../components/tables/DataTable";
import PriorityBadge from "../components/ui/PriorityBadge";
import AddProductModal from "../components/spk/AddProductModal";
import EditProductModal from "../components/spk/EditProductModal";

export default function SPKDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [spk, setSpk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchSPK = async () => {
    try {
      const res = await axios.get(`${API}/api/spk/${id}`);
      const data = res.data?.data || res.data;
      setSpk(data);
    } catch (err) {
      setSpk(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSPK();
  }, [id]);

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      await axios.delete(`${API}/api/product/${productId}`);
      fetchSPK(); // refresh data
    } catch (err) {
      console.error("Gagal menghapus produk", err);
    }
  };

  const productColumns = [
    { key: "item", label: "Item" },
    { key: "model", label: "Model" },
    { key: "warna", label: "Warna" },
    { key: "tebal", label: "Tebal" },
    { key: "lebar", label: "Lebar" },
    { key: "panjang", label: "Panjang" },
    { key: "qty", label: "Qty" },
    { key: "press", label: "Press" },
    { key: "sisa", label: "Sisa" },
    {
      key: "aksi",
      label: "Aksi",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(row);
            }}
          >
            <Pencil size={16} />
          </button>
          <button
            className="p-2 bg-red-600 hover:bg-red-700 rounded"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteProduct(row._id);
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!spk) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-400 text-lg mb-4">SPK tidak ditemukan</p>
        <Button onClick={() => navigate("/spk")}>Kembali ke SPK</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={() => navigate("/spk")}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Kembali
        </Button>

        <PriorityBadge level={spk.level_kepentingan} />
      </div>

      {/* Info Grid */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6">
        <div className="border-b border-gray-700 pb-6">
          <h1 className="text-3xl font-bold text-white">{spk.nomor_spk}</h1>
          <p className="text-gray-400 mt-1">
            Detail informasi Surat Perintah Kerja
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <InfoItem label="Customer" value={spk.customer} />
          <InfoItem label="Proyek" value={spk.proyek} />
          <InfoItem label="Nomor OC" value={spk.nomor_oc} />
          <InfoItem label="Status" value={spk.status} />
          <InfoItem label="Total Unit" value={spk.total_unit} />
          <InfoItem
            label="Tanggal Dibuat"
            value={
              spk.tanggal_dibuat
                ? new Date(spk.tanggal_dibuat).toLocaleDateString()
                : "-"
            }
          />
          <InfoItem
            label="Deadline"
            value={
              spk.tanggal_deadline
                ? new Date(spk.tanggal_deadline).toLocaleDateString()
                : "-"
            }
          />
        </div>
      </div>

      {/* Detail Produk */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Detail Produk</h2>
          <Button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} /> Tambah Produk
          </Button>
        </div>

        <DataTable columns={productColumns} data={spk.detail_produk || []} />
      </div>

      {/* Modal Tambah Produk */}
      {showModal && (
        <AddProductModal
          spkId={spk._id}
          onClose={() => setShowModal(false)}
          onAdded={fetchSPK}
        />
      )}

      {/* Modal Edit Produk */}
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdated={fetchSPK}
        />
      )}
    </div>
  );
}

/* Info Item */
function InfoItem({ label, value }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <p className="text-gray-400 text-xs uppercase tracking-wide">{label}</p>
      <p className="text-white font-medium mt-1">{value || "-"}</p>
    </div>
  );
}
