import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from '../ui/button';
const Social = () => {
    return (
        <div className='flex w-full items-center gap-x-4'>
            <Button className='w-full' variant="outline" size="lg">
                <FcGoogle className='h-5 w-5' />
            </Button>
            <Button className='w-full' variant="outline" size="lg">
                <FaGithub className='h-5 w-5' />
            </Button>
        </div>
    )
}

export default Social