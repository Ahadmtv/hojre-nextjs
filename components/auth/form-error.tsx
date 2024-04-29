import React from 'react'
import { MdErrorOutline } from "react-icons/md";
const FormError = ({ message }: { message?: string }) => {
    if(!message){
        return null;
    }
    return (
        <div className="bg-destructive/15 text-destructive flex  items-center rounded-md gap-x-2 ">
            <MdErrorOutline />
            <p>
                {message}
            </p>
        </div>
    )
}

export default FormError