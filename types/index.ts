import React from "react";

export interface loginButtonProps{
    children:React.ReactNode,
    mode?:"redirect" | "modal",
    asChild?:boolean
}
export interface CardWrapperProps{
    children:React.ReactNode,
    headerTitle?:string,
    headerDes?:string,
    backButtonLabel?:string,
    backButtonHref?:string,
    social?:boolean
}

export interface BackButtonProps{
    label?:string
    href?:string
}