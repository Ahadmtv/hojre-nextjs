import { logOut } from '@/actions/logout'
import React from 'react'
interface Props {
    children: React.ReactNode
}
const LogOutButton = ({ children }: Props) => {
    const onclick = () => {
        logOut();
    }
    return (
        <span onClick={onclick} className="cursor-pointer">
            {children}
        </span>
    )
}

export default LogOutButton