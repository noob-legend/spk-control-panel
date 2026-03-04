import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import DataTable from "../components/tables/DataTable";
import PriorityBadge from "../components/ui/PriorityBadge";

export default function SPK() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const api = axios.create({
  baseURL: API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSPK = async () => {
    try {
      const response = await axios.get(`${API}/api/spk`, {
        params: {
          search: searchTerm,
          status: filterStatus,
          page: currentPage,
          limit: 10,
        },
      });

      setData(Array.isArray(response.data.data) ? response.data.data : []);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSPK();
  }, [searchTerm, filterStatus, currentPage]);

  // 🔥 DELETE SPK
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus SPK ini?")) return;

    try {
      await api.delete(`/api/spk/${id}`);
      fetchSPK(); // refresh data
    } catch (error) {
      console.error("Gagal menghapus SPK", error);
    }
  };

  const columns = [
    {
      key: "nomor_spk",
      label: "Nomor SPK",
    },
    {
      key: "customer",
      label: "Customer",
    },
    {
      key: "level_kepentingan",
      label: "Priority",
      render: (value) => <PriorityBadge level={value} />,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => {
        const statusColors = {
          Produksi: "bg-blue-900 text-blue-200",
          Packing: "bg-purple-900 text-purple-200",
          Pengiriman: "bg-orange-900 text-orange-200",
          Selesai: "bg-green-900 text-green-200",
        };

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[value] || "bg-gray-700 text-gray-200"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    // 🔥 KOLOM AKSI
    {
      key: "aksi",
      label: "Aksi",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/spk/edit/${row._id}`);
            }}
            className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id);
            }}
            className="p-2 bg-red-600 hover:bg-red-700 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">SPK Management</h1>

      <Input
        label="Cari SPK atau Customer"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="flex justify-between items-center">
        <Button onClick={() => navigate("/spk/create")}>+ Tambah SPK</Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        onRowClick={(row) => navigate(`/spk/${row._id}`)}
      />

      <div className="flex gap-2">
        <Button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Sebelumnya
        </Button>

        <Button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Berikutnya
        </Button>
      </div>
    </div>
  );
}
