'use client'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function LicenseModal({ isOpen, onClose, onSave, license, tableName }) {
  const [formData, setFormData] = useState({
    machine_id: '',
    identifier: '',
    name: '',
    email: '',
    whatsapp: '',
    plan: 'TRIAL',
    status: 'ATIVO',
    expiration: ''
  })

  useEffect(() => {
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
  }, [license, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content glass fade-in">
        <header className="modal-header">
          <h2>{license ? 'Editar Licença' : 'Nova Licença'}</h2>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Machine ID</label>
              <input 
                className="input-field" 
                value={formData.machine_id} 
                onChange={(e) => setFormData({...formData, machine_id: e.target.value})}
                required 
              />
            </div>
            <div className="form-group">
              <label>CPF / CNPJ</label>
              <input 
                className="input-field" 
                value={formData.identifier} 
                onChange={(e) => setFormData({...formData, identifier: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Nome / Razão Social</label>
            <input 
              className="input-field" 
              value={formData.name} 
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
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>WhatsApp</label>
              <input 
                className="input-field" 
                value={formData.whatsapp} 
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Plano</label>
              <select 
                className="input-field" 
                value={formData.plan} 
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
                value={formData.status} 
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
              value={formData.expiration} 
              onChange={(e) => setFormData({...formData, expiration: e.target.value})}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
            <button type="submit" className="btn-primary">Salvar Licença</button>
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
      `}</style>
    </div>
  )
}
