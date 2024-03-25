import React from 'react'
import { GiConfirmed } from "react-icons/gi";
const FormSuccess = ({ message }: { message?: string }) => {
    if(!message){
        return null;
    }
    return (
        <div className="bg-emerald-500/15 text-emerald-500 flex items-center rounded-md gap-x-2">
            <GiConfirmed />
            <p>
                {message}
            </p>
        </div>
    )
}

export default FormSuccess