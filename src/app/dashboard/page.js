'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/Sidebar'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('name')
    
    if (data) setProjects(data)
    setLoading(false)
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-content fade-in">
        <header className="content-header">
          <h1>Olá, Robinson 👋</h1>
          <p>Selecione um aplicativo para gerenciar as licenças.</p>
        </header>

        <div className="projects-grid">
          {loading ? (
            <p className="loading">Carregando aplicativos...</p>
          ) : (
            projects.map((project) => (
              <Link 
                key={project.id} 
                href={`/dashboard/licenses/${project.table_name}`}
                className="project-card glass"
              >
                <div className="card-content">
                  <div className="project-icon">
                    <ShieldCheck size={22} />
                  </div>
                  <div className="project-info">
                    <h3>{project.name}</h3>
                  </div>
                  <span className="manage-link">Gerenciar</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: #0A1628;
        }
        .dashboard-content {
          flex: 1;
          padding: 40px 60px;
        }
        .content-header h1 {
          font-size: 32px;
          margin-bottom: 8px;
        }
        .content-header p {
          color: var(--text-secondary);
          margin-bottom: 40px;
        }
        .projects-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 420px;
        }
        .project-card {
          display: block;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .card-content {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          transition: all 0.2s ease;
        }
        .project-card:hover .card-content {
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--accent-blue);
          transform: translateX(4px);
        }
        .project-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: rgba(79, 195, 247, 0.1);
          border-radius: 10px;
          color: var(--accent-blue);
          margin-right: 16px;
          flex-shrink: 0;
        }
        .project-info {
          flex: 1;
        }
        .project-info h3 {
          margin: 0;
          color: white;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.2;
        }
        .manage-link {
          background: var(--accent-blue) !important;
          color: var(--bg-deep) !important;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(79, 195, 247, 0.2);
        }
        .project-card:hover .manage-link {
          background: white !important;
          color: var(--bg-deep) !important;
        }
        .loading {
          text-align: center;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  )
}
