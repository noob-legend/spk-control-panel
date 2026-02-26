import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, TrendingUp, Package, Truck } from "lucide-react";
import axios from "axios";

import SummaryCard from "../components/cards/SummaryCard";
import DataTable from "../components/tables/DataTable";
import PriorityBadge from "../components/ui/PriorityBadge";

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSPK = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/spk");

        const spkData = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        setData(spkData);
      } catch (error) {
        console.error("Gagal mengambil data SPK:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSPK();
  }, []);

  // 🔥 Urutkan berdasarkan level kepentingan (ascending) ambil 5 teratas
  const urgentSPK = [...data]
    .sort((a, b) => a.level_kepentingan - b.level_kepentingan)
    .slice(0, 5);

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
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Selamat datang kembali di sistem manajemen produksi
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total SPK Aktif"
          value={data.length}
          icon={Package}
          trend={12}
        />
        <SummaryCard
          title="Produksi Hari Ini"
          value="8"
          icon={TrendingUp}
          trend={-5}
        />
        <SummaryCard
          title="Dikirim Hari Ini"
          value="5"
          icon={Truck}
          trend={25}
        />
        <SummaryCard
          title="SPK Urgent"
          value={urgentSPK.length}
          icon={AlertCircle}
          trend={0}
        />
      </div>

      {/* Top 5 Urgent */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertCircle size={24} className="text-red-500" />5 SPK Paling
            Urgent
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Diurutkan berdasarkan level kepentingan
          </p>
        </div>

        <DataTable
          columns={columns}
          data={urgentSPK}
          onRowClick={(row) => navigate(`/spk/${row._id}`)}
        />
      </div>

      {/* Quick Stats (Tidak Dihapus) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <p className="text-gray-400 text-sm font-medium">
            Tingkat Penyelesaian
          </p>
          <div className="mt-4 space-y-3">
            <ProgressItem label="Produksi" value={75} />
            <ProgressItem label="Packing" value={90} />
          </div>
        </div>

        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <p className="text-gray-400 text-sm font-medium">Status Pengiriman</p>
          <div className="mt-4 space-y-3">
            <StatItem label="Dikirim" value="12" />
            <StatItem label="Dalam Transit" value="3" />
            <StatItem label="Diterima" value="18" />
          </div>
        </div>

        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <p className="text-gray-400 text-sm font-medium">Ringkasan Harian</p>
          <div className="mt-4 space-y-3">
            <StatItem label="Total Unit Produksi" value="324" />
            <StatItem label="Efisiensi" value="85%" highlight="green" />
            <StatItem label="Downtime" value="15%" highlight="orange" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================= */
/* COMPONENT TAMBAHAN           */
/* ============================= */

function ProgressItem({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="text-white font-semibold">{value}%</span>
      </div>
      <div className="w-full bg-dark-bg rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StatItem({ label, value, highlight }) {
  const color =
    highlight === "green"
      ? "text-green-400"
      : highlight === "orange"
        ? "text-orange-400"
        : "text-white";

  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-300 text-sm">{label}</span>
      <span className={`${color} font-semibold`}>{value}</span>
    </div>
  );
}
