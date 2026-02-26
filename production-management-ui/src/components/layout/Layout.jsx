import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ user, onLogout, children }) {
  return (
    <div className="flex h-screen bg-dark-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
