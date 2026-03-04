'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message || 'Credenciais inválidas ou erro no servidor.')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card glass fade-in">
        <h1 className="login-title">Ross License Manager</h1>
        <p className="login-subtitle">Acesso Restrito ao Administrador</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>E-mail</label>
            <input 
              type="email" 
              className="input-field" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              className="input-field" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {error && <p className="error-text">{error}</p>}
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Entrando...' : 'Acessar Central'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .login-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: radial-gradient(circle at center, #1E3A5F 0%, #0A1628 100%);
        }
        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 48px;
          text-align: center;
        }
        .login-title {
          font-size: 28px;
          font-weight: 800;
          color: var(--accent-blue);
          margin-bottom: 8px;
        }
        .login-subtitle {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 32px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .error-text {
          color: var(--error);
          font-size: 13px;
          text-align: center;
        }
        .btn-primary {
          margin-top: 10px;
          font-size: 15px;
        }
      `}</style>
    </div>
  )
}
