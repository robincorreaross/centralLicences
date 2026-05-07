'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/')

  return (
    <>
      <button 
        className="mobile-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para fechar ao clicar fora no mobile */}
      {isOpen && (
        <div className="mobile-overlay" onClick={() => setIsOpen(false)}></div>
      )}

      <aside className={`sidebar glass ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Ross Manager</h2>
        </div>

        <nav className="sidebar-nav">
          <Link 
            href="/dashboard" 
            className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
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
          .mobile-toggle {
            display: none;
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1001;
            background: rgba(10, 22, 40, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .mobile-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 99;
            backdrop-filter: blur(2px);
          }

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
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

          @media (max-width: 768px) {
            .mobile-toggle {
              display: flex;
            }
            .mobile-overlay {
              display: block;
            }
            .sidebar {
              position: fixed;
              top: 0;
              left: 0;
              margin: 0;
              height: 100vh;
              border-radius: 0;
              transform: translateX(-100%);
            }
            .sidebar.open {
              transform: translateX(0);
            }
          }
        `}</style>
      </aside>
    </>
  )
}
