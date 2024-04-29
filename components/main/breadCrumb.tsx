import Link from 'next/link';
import React, { FC } from 'react'
interface Iprops {
    path: string[]
}
const BreadCrumb:FC<Iprops> = ({path}) => {

    let pathLinks = "";
    return (
        <>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <div>
                        <li className="inline-flex items-center">
                            <Link href="/" className="inline-flex items-center text-lg font-medium text-gray-800 hover:text-amber-400 font-vazir-thin">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                خانه
                            </Link>
                        </li>
                    </div>

                    {path.map((p, i) => {
                        const isLast = i === path.length - 1;
                        !isLast ? pathLinks += `/${p}` : pathLinks = pathLinks
                        return (
                            <div key={i}>
                                {!isLast &&
                                    <li aria-current="page">
                                        <Link href={pathLinks} className="inline-flex items-center text-lg font-medium text-gray-800 hover:text-amber-400 font-vazir-thin">
                                            <div className="flex items-center">
                                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                                </svg>
                                                {p}
                                            </div>
                                        </Link>
                                    </li>
                                }
                                {isLast &&
                                    <li aria-current="page">
                                        <div className="flex items-center">
                                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                            <span className=" text-lg font-medium text-gray-500 dark:text-gray-400 font-vazir-thin">{p}</span>
                                        </div>
                                    </li>
                                }
                            </div>
                        )
                    })}
                </ol>
            </nav>
        </>
    )
}

export default BreadCrumb