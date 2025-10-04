'use client'

import { createContext, useContext, ReactNode, useEffect, useState, useCallback } from 'react'
import { rootUser } from '@/data/users'

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Helper functions para cookies
  const setCookie = useCallback((name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`
  }, [])

  const getCookie = useCallback((name: string): string | undefined => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift()
    }
    return undefined
  }, [])

  const deleteCookie = useCallback((name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`
  }, [])

  const checkAuth = useCallback(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    const token = getCookie('auth-token')
    
    if (token) {
      setUser(rootUser)
    } else {
      setUser(null)
    }
    setLoading(false)
  }, [getCookie])

  useEffect(() => {
    checkAuth()
  }, [checkAuth]) // Agregar checkAuth como dependencia

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === 'admin@rebuhr.com' && password === 'password123') {
      const fakeToken = 'fake-jwt-token-' + Date.now()
      setCookie('auth-token', fakeToken, 1)
      
      setUser(rootUser)
      return true
    }
    
    return false
  }

  const logout = () => {
    deleteCookie('auth-token')
    setUser(null)
    window.location.href = '/auth/login'
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}