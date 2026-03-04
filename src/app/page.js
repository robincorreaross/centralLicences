'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [router])

  return (
    <div className="bg-deep flex items-center justify-center h-screen">
      <p className="text-secondary">Redirecionando...</p>
    </div>
  )
}
