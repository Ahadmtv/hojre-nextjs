'use client'
import React from 'react'
import Navbar from '../_components/navbar'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { RoleGate } from '@/components/auth/role-gate'
interface ProtectedLayoutProps {
    children: React.ReactNode
}

const AdminLayout = ({ children }: ProtectedLayoutProps) => {
    const user = useCurrentUser();
    return (

        <>
            <RoleGate allowedUser={user?.role}>
            <Navbar />
                {children}
            </RoleGate>
        </>
    )
}

export default AdminLayout