'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {supabase} from '../../../lib/supabaseClient'  

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  // 🔵 Login con Google
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback', // Necesario para OAuth
      },
    })

    if (error) {
      setError('Error con Google: ' + error.message)
    }
  }

  // 🔵 Login con correo y contraseña
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
        
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard') // o donde quieras
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Iniciar Sesión</h2>

      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

      {/* Botón de Google */}
      <button
        type="button"
        onClick={signInWithGoogle}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" width="20" />
        Iniciar sesión con Google
      </button>

      <hr style={{ margin: '20px 0', borderColor: '#ccc' }} />

      {/* Formulario de correo y contraseña */}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#005fcc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Iniciar con correo
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        ¿No tienes cuenta?{' '}
        <a href="/register" style={{ color: '#005fcc' }}>
          Regístrate
        </a>
      </p>
    </div>
  )
}