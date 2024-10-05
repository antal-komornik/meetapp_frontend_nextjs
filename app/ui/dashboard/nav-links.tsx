'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { FaHouse } from "react-icons/fa6"
import { FaHeart, FaUserAlt, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react"


const publicLinks = [
    { name: 'Felfedezés', href: '/', icon: FaHouse },
];

const privateLinks = [
    { name: 'Albumok', href: '/wishlists', icon: FaHeart },
    { name: 'Események', href: '/events', icon: MdEventNote },
    { name: 'Profil', href: '/account-settings', icon: FaUserAlt },
];

const logoutLink = { name: 'Kijelentkezés', href: '/api/auth/signout', icon: FaSignOutAlt };
const loginLink = { name: 'Bejelentkezés', href: '/api/auth/signin', icon: FaSignInAlt };

export default function NavLinks({ includeLogout = false, includeSignin = false }) {
    const { data: session } = useSession()
    const pathname = usePathname();



    let allLinks = [...publicLinks];
    if (session) {
        allLinks = [...allLinks, ...privateLinks];
        if (includeLogout) allLinks.push(logoutLink);
    } else if (includeSignin) {
        allLinks.push(loginLink);
    }

    return (
        <>
            {allLinks.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex items-center justify-start gap-2 p-2 text-sm font-medium w-full',
                            {
                                'bg-gray-200 text-gray-900': pathname === link.href,
                                'hover:bg-gray-100': pathname !== link.href,
                            }
                        )}
                    >
                        <LinkIcon className="w-5 h-5" />
                        <span>{link.name}</span>
                    </Link>
                );
            })}
        </>
    );
}