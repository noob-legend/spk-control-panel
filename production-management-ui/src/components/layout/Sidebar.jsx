import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, BarChart3, Package, Boxes } from 'lucide-react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { label: 'SPK', path: '/spk', icon: Package },
    { label: 'Palet', path: '/palet', icon: Boxes },
  ]

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary-600 text-white p-2 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen bg-dark-surface border-r border-dark-border transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-64'
        }`}
      >
        <div className="pt-6 px-6 pb-8">
          <h1 className="text-2xl font-bold text-primary-400">MMS</h1>
          <p className="text-xs text-gray-400 mt-1">Manufacturing System</p>
        </div>

        <nav className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-dark-bg'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}
    </>
  )
}
