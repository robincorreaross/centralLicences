'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/')

  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Ross Manager</h2>
      </div>

      <nav className="sidebar-nav">
        <Link 
          href="/dashboard" 
          className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <span className="nav-text">Dashboard</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <span className="nav-text">Sair do Sistema</span>
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: calc(100vh - 40px);
          margin: 20px;
          display: flex;
          flex-direction: column;
          padding: 32px 16px;
          position: sticky;
          top: 20px;
          z-index: 100;
          background: rgba(10, 22, 40, 0.8) !important;
          border-radius: 20px;
        }

        .sidebar-header {
          margin-bottom: 48px;
          display: flex;
          justify-content: center;
        }

        .sidebar-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--accent-blue);
          letter-spacing: -1px;
          margin: 0;
          text-transform: uppercase;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        :global(.nav-item) {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 14px;
          border-radius: 12px;
          color: #94A3B8;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .nav-text {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        :global(.nav-item:hover) {
          background: rgba(255, 255, 255, 0.05);
          color: #FFF;
        }

        :global(.nav-item.active) {
          background: rgba(79, 195, 247, 0.15);
          color: var(--accent-blue);
          border: 1px solid rgba(79, 195, 247, 0.2);
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .logout-btn {
          width: 100%;
          background: transparent;
          border: none;
          color: #94A3B8;
          padding: 14px;
          cursor: pointer;
          transition: all 0.25s;
          font-weight: 600;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logout-btn:hover {
          background: rgba(239, 83, 80, 0.1);
          color: #EF5350;
        }
      `}</style>
    </aside>
  )
}
