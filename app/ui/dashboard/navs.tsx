'use client';
import React from 'react';
import Image from 'next/image';
import NavLinks from './nav-links';

export default function Navigation() {

    return (
        <>
            <div className="navbar bg-base-100 shadow-lg flex justify-between items-center">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">MeetApp</a>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                alt="user"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <NavLinks includeLogout={true} includeSignin={true} />
                    </ul>
                </div>
                {/* <div className="flex gap-2">
                    <NavLinks includeAuth={true} />
                </div> */}

            </div>

            {/* Bottom navigation for small screens */}
            <div className="btm-nav fixed bottom-0 left-0 w-full bg-base-100 md:hidden">
                <NavLinks includeLogout={false} includeSignin={true} />
            </div>
        </>
    );
}