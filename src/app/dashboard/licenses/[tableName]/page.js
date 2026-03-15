'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/Sidebar'
import LicenseModal from '@/components/LicenseModal'
import { Plus, Search, Edit3, Trash2, Copy } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export default function LicenseManager() {
  const { tableName } = useParams()
  const [licenses, setLicenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState(null)
  const [projectName, setProjectName] = useState('')

  useEffect(() => {
    fetchProjectInfo()
    fetchLicenses()
  }, [tableName])

  const fetchProjectInfo = async () => {
    const { data } = await supabase
      .from('projects')
      .select('name')
      .eq('table_name', tableName)
      .single()
    if (data) setProjectName(data.name)
  }

  const fetchLicenses = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setLicenses(data)
    setLoading(false)
  }

  const handleSave = async (formData) => {
    if (selectedLicense) {
      // Update
      const { error } = await supabase
        .from(tableName)
        .update(formData)
        .eq('id', selectedLicense.id)
    } else {
      // Create
      const { error } = await supabase
        .from(tableName)
        .insert([formData])
    }
    
    setIsModalOpen(false)
    fetchLicenses()
  }

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir esta licença?')) {
      await supabase.from(tableName).delete().eq('id', id)
      fetchLicenses()
    }
  }

  const filteredLicenses = licenses.filter(l => 
    l.machine_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('ID Copiado!')
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-content fade-in">
        <header className="content-header">
          <div className="header-top">
            <h1>{projectName || 'Carregando...'}</h1>
            <button className="btn-primary" onClick={() => { setSelectedLicense(null); setIsModalOpen(true); }}>
              <Plus size={18} /> Novo Cliente
            </button>
          </div>
          <div className="search-bar glass">
            <Search size={18} color="#90A4AE" />
            <input 
              type="text" 
              placeholder="Buscar por Machine ID ou Nome..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="table-container glass">
          <table className="license-table">
            <thead>
              <tr>
                <th>Cliente / ID</th>
                <th>Plano</th>
                <th>Vencimento</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="text-center">Carregando licenças...</td></tr>
              ) : filteredLicenses.length === 0 ? (
                <tr><td colSpan="5" className="text-center">Nenhuma licença encontrada.</td></tr>
              ) : (
                filteredLicenses.map((lic) => (
                  <tr key={lic.id}>
                    <td>
                      <div className="client-info">
                        <strong>{lic.name}</strong>
                        <span>{lic.machine_id}</span>
                      </div>
                    </td>
                    <td><span className="badge-plan">{lic.plan}</span></td>
                    <td>
                      {lic.expiration ? (() => {
                        const [year, month, day] = lic.expiration.split('T')[0].split('-')
                        return `${day}/${month}/${year}`
                      })() : 'Vitalício'}
                    </td>
                    <td>
                      <span className={`status-pill ${lic.status === 'ATIVO' ? 'active' : 'inactive'}`}>
                        {lic.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button onClick={() => copyToClipboard(lic.machine_id)} title="Copiar ID"><Copy size={16} /></button>
                        <button onClick={() => { setSelectedLicense(lic); setIsModalOpen(true); }} title="Editar"><Edit3 size={16} /></button>
                        <button onClick={() => handleDelete(lic.id)} title="Excluir" className="delete-btn"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      <LicenseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
        license={selectedLicense}
        tableName={tableName}
      />

      <style jsx>{`
        .dashboard-layout { display: flex; min-height: 100vh; background: #0A1628; }
        .dashboard-content { flex: 1; padding: 40px 60px; overflow-y: auto; }
        .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .header-top h1 { font-size: 32px; font-weight: 800; letter-spacing: -0.5px; }
        .search-bar { display: flex; align-items: center; gap: 12px; padding: 12px 20px; border-radius: 12px; margin-bottom: 30px; width: 100%; max-width: 500px; }
        .search-bar input { background: transparent; border: none; color: white; outline: none; width: 100%; font-size: 14px; }
        
        .table-container { border-radius: 16px; overflow: hidden; padding: 8px; border: 1px solid var(--glass-border); }
        .license-table { width: 100%; border-collapse: collapse; text-align: left; }
        .license-table th { padding: 18px 20px; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 1px solid var(--glass-border); text-transform: uppercase; letter-spacing: 0.5px; }
        .license-table td { padding: 16px 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.03); vertical-align: middle; }
        
        .client-info { display: flex; flex-direction: column; gap: 2px; }
        .client-info strong { font-size: 15px; color: white; }
        .client-info span { font-size: 11px; font-family: 'JetBrains Mono', 'Courier New', monospace; color: var(--text-secondary); opacity: 0.7; }
        
        .badge-plan { background: rgba(79, 195, 247, 0.1); color: var(--accent-blue); padding: 5px 12px; border-radius: 6px; font-size: 11px; font-weight: 800; border: 1px solid rgba(79, 195, 247, 0.2); display: inline-block; }
        
        .status-pill { padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; display: inline-block; }
        .status-pill.active { background: rgba(102, 187, 106, 0.1); color: var(--success); border: 1px solid rgba(102, 187, 106, 0.2); }
        .status-pill.inactive { background: rgba(239, 83, 80, 0.1); color: var(--error); border: 1px solid rgba(239, 83, 80, 0.2); }
        
        .action-btns { display: flex; gap: 10px; }
        .action-btns button {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          width: 36px;
          height: 36px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0; /* Remove padding que possa desalinhanciar */
        }
        .action-btns button svg {
          display: block;
        }
        .action-btns button:hover { 
          background: var(--accent-blue); 
          color: var(--bg-deep); 
          border-color: var(--accent-blue); 
          transform: translateY(-2px); 
        }
        .action-btns .delete-btn:hover { background: var(--error); color: white; border-color: var(--error); }
        
        .text-center { text-align: center; padding: 60px !important; color: var(--text-secondary); font-style: italic; }
      `}</style>
    </div>
  )
}
