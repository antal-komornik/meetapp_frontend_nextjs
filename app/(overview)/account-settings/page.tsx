'use client'
import React from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import AuthWrapper from '@/app/ui/AuthWrapper'

export default function Page() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin")
        }
    }, [status, router])

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (!session) {
        return null
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {session.user.username}</p>
        </div>
    )
}

