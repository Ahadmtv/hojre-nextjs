
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { BackButtonProps } from '@/types'

const BackButton = ({label,href}:BackButtonProps) => {
  return (
    <Button variant={"link"} className='text-center'>
        <Link href={href}>{label}</Link>
    </Button>
  )
}

export default BackButton