import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Check } from 'lucide-react'
import Button from '../components/ui/Button'
import DataTable from '../components/tables/DataTable'
import Input from '../components/ui/Input'

// Dummy palet data
const PALET_DATA = {
  '1': {
    kode_palet: 'PALET-2024-001',
    tanggal_kirim: '2024-01-15',
    status: 'sent',
    admin_pembuat: 'Admin Produksi',
    foto_bukti: '/images/bukti-pengiriman.jpg',
    produk: [
      {
        id: 1,
        nama_produk: 'Pintu Kaca 80x200',
        qty: 5,
        satuan: 'Unit',
        spk: 'SPK-2024-001',
      },
      {
        id: 2,
        nama_produk: 'Handle Stainless',
        qty: 10,
        satuan: 'Pcs',
        spk: 'SPK-2024-001',
      },
    ],
  },
  '2': {
    kode_palet: 'PALET-2024-002',
    tanggal_kirim: '2024-01-14',
    status: 'received',
    admin_pembuat: 'Admin Produksi',
    diterima_oleh: 'Budi Santoso',
    tanggal_terima: '2024-01-16',
    foto_bukti: '/images/bukti-pengiriman.jpg',
    produk: [
      {
        id: 1,
        nama_produk: 'Pintu Kayu 70x200',
        qty: 8,
        satuan: 'Unit',
        spk: 'SPK-2024-002',
      },
      {
        id: 2,
        nama_produk: 'Finishing Varnish',
        qty: 3,
        satuan: 'Liter',
        spk: 'SPK-2024-002',
      },
    ],
  },
}

export default function PaletDetail({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [receiveData, setReceiveData] = useState({
    diterima_oleh: '',
    tanggal_terima: new Date().toISOString().split('T')[0],
  })
  const [showReceiveForm, setShowReceiveForm] = useState(false)

  const palet = PALET_DATA[id]
  const isAdminPacking = user?.role === 'admin_packing'
  const isAdminProduksi = user?.role === 'admin_produksi'

  if (!palet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-400 text-lg mb-4">Palet tidak ditemukan</p>
        <Button onClick={() => navigate('/palet')}>Kembali ke Palet</Button>
      </div>
    )
  }

  const handleReceive = () => {
    if (receiveData.diterima_oleh.trim()) {
      alert(`Palet diterima oleh: ${receiveData.diterima_oleh}`)
      setShowReceiveForm(false)
    }
  }

  const produktColumns = [
    { key: 'nama_produk', label: 'Nama Produk' },
    { key: 'qty', label: 'Qty' },
    { key: 'satuan', label: 'Satuan' },
    { key: 'spk', label: 'SPK' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/palet')}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">{palet.kode_palet}</h1>
          <p className="text-gray-400 mt-1">Detail Palet Pengiriman</p>
        </div>
      </div>

      {/* Status Badge */}
      <div>
        <span
          className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
            palet.status === 'sent'
              ? 'bg-orange-900 text-orange-200'
              : 'bg-green-900 text-green-200'
          }`}
        >
          {palet.status === 'sent' ? 'Dikirim' : 'Diterima'}
        </span>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          {/* Palet Info Card */}
          <div className="bg-dark-surface border border-dark-border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">Informasi Palet</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Kode Palet
                </p>
                <p className="text-white font-medium mt-1">{palet.kode_palet}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Tanggal Kirim
                </p>
                <p className="text-white font-medium mt-1">{palet.tanggal_kirim}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Admin Pembuat
                </p>
                <p className="text-white font-medium mt-1">{palet.admin_pembuat}</p>
              </div>
            </div>
          </div>

          {/* Reception Info (if received) */}
          {palet.status === 'received' && (
            <div className="bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Informasi Penerimaan
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Diterima Oleh
                  </p>
                  <p className="text-white font-medium mt-1">{palet.diterima_oleh}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Tanggal Terima
                  </p>
                  <p className="text-white font-medium mt-1">{palet.tanggal_terima}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Bukti Pengiriman */}
        <div className="space-y-6">
          <div className="bg-dark-surface border border-dark-border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">Bukti Pengiriman</h2>
            <div className="bg-dark-bg rounded-lg p-8 flex items-center justify-center min-h-64">
              <div className="text-center">
                <Upload size={40} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">
                  Foto bukti pengiriman
                </p>
              </div>
            </div>

            {isAdminProduksi && palet.status === 'sent' && (
              <Button variant="outline" className="w-full">
                <Upload size={18} />
                Upload Foto Bukti
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Products in Palet */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Produk dalam Palet</h2>
        <DataTable columns={produktColumns} data={palet.produk} />
      </div>

      {/* Receive Form (for admin packing) */}
      {isAdminPacking &&
        palet.status === 'sent' &&
        !showReceiveForm && (
          <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Palet ini belum diterima. Anda dapat menerima palet sekarang.
            </p>
            <Button onClick={() => setShowReceiveForm(true)}>
              <Check size={18} />
              Terima Palet
            </Button>
          </div>
        )}

      {showReceiveForm && (
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Form Penerimaan Palet</h2>
          <div className="space-y-4">
            <Input
              label="Nama Penerima"
              placeholder="Masukkan nama lengkap"
              value={receiveData.diterima_oleh}
              onChange={(e) =>
                setReceiveData({
                  ...receiveData,
                  diterima_oleh: e.target.value,
                })
              }
            />
            <Input
              label="Tanggal Penerimaan"
              type="date"
              value={receiveData.tanggal_terima}
              onChange={(e) =>
                setReceiveData({
                  ...receiveData,
                  tanggal_terima: e.target.value,
                })
              }
            />
            <div className="flex gap-3">
              <Button variant="primary" onClick={handleReceive}>
                <Check size={18} />
                Terima
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowReceiveForm(false)}
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="secondary">Cetak</Button>
        <Button variant="outline" onClick={() => navigate('/palet')}>
          Kembali
        </Button>
      </div>
    </div>
  )
}
