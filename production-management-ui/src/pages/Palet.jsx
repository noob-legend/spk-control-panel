import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import DataTable from '../components/tables/DataTable'

// Dummy data
const PALET_DATA = [
  {
    id: '1',
    kode_palet: 'PALET-2024-001',
    tanggal_kirim: '2024-01-15',
    status: 'sent',
    admin_pembuat: 'Admin Produksi',
  },
  {
    id: '2',
    kode_palet: 'PALET-2024-002',
    tanggal_kirim: '2024-01-14',
    status: 'received',
    admin_pembuat: 'Admin Produksi',
    diterima_oleh: 'Budi Santoso',
    tanggal_terima: '2024-01-16',
  },
  {
    id: '3',
    kode_palet: 'PALET-2024-003',
    tanggal_kirim: '2024-01-13',
    status: 'received',
    admin_pembuat: 'Admin Produksi',
    diterima_oleh: 'Siti Nurhaliza',
    tanggal_terima: '2024-01-15',
  },
  {
    id: '4',
    kode_palet: 'PALET-2024-004',
    tanggal_kirim: '2024-01-12',
    status: 'sent',
    admin_pembuat: 'Admin Packing',
  },
  {
    id: '5',
    kode_palet: 'PALET-2024-005',
    tanggal_kirim: '2024-01-11',
    status: 'received',
    admin_pembuat: 'Admin Produksi',
    diterima_oleh: 'Ahmad Gunawan',
    tanggal_terima: '2024-01-13',
  },
]

export default function Palet({ user }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const isAdminProduksi = user?.role === 'admin_produksi'
  const isAdminPacking = user?.role === 'admin_packing'

  // Filter data
  const filteredData = PALET_DATA.filter(
    (item) =>
      item.kode_palet.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    {
      key: 'kode_palet',
      label: 'Kode Palet',
    },
    {
      key: 'tanggal_kirim',
      label: 'Tanggal Kirim',
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const statusConfig = {
          sent: { label: 'Dikirim', color: 'bg-orange-900 text-orange-200' },
          received: { label: 'Diterima', color: 'bg-green-900 text-green-200' },
        }
        const config = statusConfig[value] || { label: value, color: 'bg-gray-700 text-gray-200' }
        return (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
            {config.label}
          </span>
        )
      },
    },
    {
      key: 'admin_pembuat',
      label: 'Admin Pembuat',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Manajemen Palet</h1>
        <p className="text-gray-400 mt-2">
          Kelola pengiriman dan penerimaan palet produksi
        </p>
      </div>

      {/* Search & Action Bar */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="flex-1">
            <Input
              label="Cari Kode Palet"
              placeholder="PALET-2024-001..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isAdminProduksi && (
            <Button
              onClick={() => navigate('/palet/create')}
              className="w-full md:w-auto"
            >
              <Plus size={18} />
              Buat Palet
            </Button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="text-xs text-gray-400 self-center">
            Total: {filteredData.length} Palet
          </span>
        </div>
      </div>

      {/* Role-based Info */}
      {isAdminProduksi && (
        <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
          <p className="text-blue-200 text-sm">
            ✓ Anda dapat membuat palet dan upload foto bukti pengiriman
          </p>
        </div>
      )}

      {isAdminPacking && (
        <div className="bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-4">
          <p className="text-purple-200 text-sm">
            ✓ Anda dapat menerima palet dan mencatat penerimaan
          </p>
        </div>
      )}

      {user?.role === 'pengunjung' && (
        <div className="bg-gray-900 bg-opacity-30 border border-gray-700 rounded-lg p-4">
          <p className="text-gray-300 text-sm">
            ℹ Anda dapat melihat data palet (view only)
          </p>
        </div>
      )}

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        onRowClick={(row) => navigate(`/palet/${row.id}`)}
      />

      {/* Data Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <p className="text-gray-400 text-sm font-medium">Total Palet</p>
          <p className="text-3xl font-bold text-primary-400 mt-2">
            {PALET_DATA.length}
          </p>
        </div>
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <p className="text-gray-400 text-sm font-medium">Dikirim</p>
          <p className="text-3xl font-bold text-orange-400 mt-2">
            {PALET_DATA.filter((p) => p.status === 'sent').length}
          </p>
        </div>
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <p className="text-gray-400 text-sm font-medium">Diterima</p>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {PALET_DATA.filter((p) => p.status === 'received').length}
          </p>
        </div>
      </div>
    </div>
  )
}
