import { LogOut, User } from 'lucide-react'

export default function Header({ user, onLogout }) {
  const getRoleLabel = (role) => {
    const roles = {
      admin_produksi: 'Admin Produksi',
      admin_packing: 'Admin Packing',
      pengunjung: 'Pengunjung',
    }
    return roles[role] || role
  }

  return (
    <header className="bg-dark-surface border-b border-dark-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-300">
          <User size={20} />
          <div>
            <p className="text-sm font-medium text-white">{user?.email}</p>
            <p className="text-xs text-gray-400">{getRoleLabel(user?.role)}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
      >
        <LogOut size={18} />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </header>
  )
}
