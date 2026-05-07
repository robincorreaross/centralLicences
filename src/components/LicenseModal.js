'use client'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function LicenseModal({ isOpen, onClose, onSave, license, tableName }) {
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (tableName === 'streaming_tv') {
      if (license) {
        setFormData({
          telefone: license.telefone || '',
          nome: license.nome || '',
          email: license.email || '',
          aplicativo: license.aplicativo || '',
          plano: license.plano || 'Mensal',
          cod_recarga: license.cod_recarga || '',
          inicio: license.inicio ? license.inicio.split('T')[0] : '',
          vencimento: license.vencimento ? license.vencimento.split('T')[0] : '',
          valor: license.valor || ''
        })
      } else {
        setFormData({
          telefone: '',
          nome: '',
          email: '',
          aplicativo: '',
          plano: 'Mensal',
          cod_recarga: '',
          inicio: '',
          vencimento: '',
          valor: ''
        })
      }
    } else {
      if (license) {
        setFormData({
          machine_id: license.machine_id || '',
          identifier: license.identifier || '',
          name: license.name || '',
          email: license.email || '',
          whatsapp: license.whatsapp || '',
          plan: license.plan || 'TRIAL',
          status: license.status || 'ATIVO',
          expiration: license.expiration ? license.expiration.split('T')[0] : ''
        })
      } else {
        setFormData({
          machine_id: '',
          identifier: '',
          name: '',
          email: '',
          whatsapp: '',
          plan: 'TRIAL',
          status: 'ATIVO',
          expiration: ''
        })
      }
    }
  }, [license, isOpen, tableName])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Limpar campos de data vazios (evitar erro de timestamptz do Supabase)
    const dataToSubmit = { ...formData }
    if (tableName === 'streaming_tv') {
      if (!dataToSubmit.inicio) dataToSubmit.inicio = null
      if (!dataToSubmit.vencimento) dataToSubmit.vencimento = null
    } else {
      if (!dataToSubmit.expiration) dataToSubmit.expiration = null
    }

    onSave(dataToSubmit)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content glass fade-in">
        <header className="modal-header">
          <h2>{license ? 'Editar Registro' : 'Novo Registro'}</h2>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          {tableName === 'streaming_tv' ? (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Nome do Cliente</label>
                  <input 
                    className="input-field" 
                    value={formData.nome || ''} 
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>E-mail</label>
                  <input 
                    type="email"
                    className="input-field" 
                    value={formData.email || ''} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Telefone / WhatsApp</label>
                  <input 
                    className="input-field" 
                    value={formData.telefone || ''} 
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Aplicativo (ex: UniTV)</label>
                  <input 
                    className="input-field" 
                    value={formData.aplicativo || ''} 
                    onChange={(e) => setFormData({...formData, aplicativo: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Plano</label>
                  <select 
                    className="input-field" 
                    value={formData.plano || 'Mensal'} 
                    onChange={(e) => setFormData({...formData, plano: e.target.value})}
                  >
                    <option value="Mensal">Mensal</option>
                    <option value="Semestral">Semestral</option>
                    <option value="Anual">Anual</option>
                    <option value="Vitalício">Vitalício</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Código de Recarga</label>
                  <input 
                    className="input-field" 
                    value={formData.cod_recarga || ''} 
                    onChange={(e) => setFormData({...formData, cod_recarga: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data de Início</label>
                  <input 
                    type="date"
                    className="input-field" 
                    value={formData.inicio || ''} 
                    onChange={(e) => setFormData({...formData, inicio: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Data de Vencimento</label>
                  <input 
                    type="date"
                    className="input-field" 
                    value={formData.vencimento || ''} 
                    onChange={(e) => setFormData({...formData, vencimento: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Valor (R$)</label>
                <input 
                  className="input-field" 
                  value={formData.valor || ''} 
                  placeholder="30,00"
                  onChange={(e) => setFormData({...formData, valor: e.target.value})}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Machine ID</label>
                  <input 
                    className="input-field" 
                    value={formData.machine_id || ''} 
                    onChange={(e) => setFormData({...formData, machine_id: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>CPF / CNPJ</label>
                  <input 
                    className="input-field" 
                    value={formData.identifier || ''} 
                    onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Nome / Razão Social</label>
                <input 
                  className="input-field" 
                  value={formData.name || ''} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>E-mail</label>
                  <input 
                    type="email"
                    className="input-field" 
                    value={formData.email || ''} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>WhatsApp</label>
                  <input 
                    className="input-field" 
                    value={formData.whatsapp || ''} 
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Plano</label>
                  <select 
                    className="input-field" 
                    value={formData.plan || 'TRIAL'} 
                    onChange={(e) => setFormData({...formData, plan: e.target.value})}
                  >
                    <option value="TRIAL">TRIAL</option>
                    <option value="MENSAL">MENSAL</option>
                    <option value="SEMESTRAL">SEMESTRAL</option>
                    <option value="ANUAL">ANUAL</option>
                    <option value="VITALICIO">VITALICIO</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select 
                    className="input-field" 
                    value={formData.status || 'ATIVO'} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="ATIVO">ATIVO</option>
                    <option value="INATIVO">INATIVO</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Data de Expiração</label>
                <input 
                  type="date"
                  className="input-field" 
                  value={formData.expiration || ''} 
                  onChange={(e) => setFormData({...formData, expiration: e.target.value})}
                />
              </div>
            </>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
            <button type="submit" className="btn-primary">Salvar Registro</button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          width: 100%;
          max-width: 600px;
          padding: 32px;
          border: 1px solid var(--glass-border);
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }
        .btn-secondary {
          background: transparent;
          border: 1px solid var(--border-color);
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
        }
        select.input-field {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2390A4AE' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 16px;
        }

        @media (max-width: 768px) {
          .modal-content {
            padding: 24px 16px;
            margin: 16px;
            border-radius: 16px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
