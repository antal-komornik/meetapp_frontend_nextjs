"use client"
import React, { useEffect, useState } from 'react'
// import { useAuth } from '@/app/context/AuthProvider'
import { useAuth } from "@/app/context/AuthProvider"
import { useContext } from 'react';
import { getWishedEvents } from '@/app/lib/data'

const Wishcard = () => {
    // const { username, userid } = useAuth()
    const [wishes, setWishes] = useState()

    const user = useAuth();

    useEffect(() => {
        console.log(user.userid)
        if (user) {
            const res = getWishedEvents(user.userid)
            console.log(res)
        }
    }, [user]);

    return (
        <>
            <div>das</div>
            {/* <div>{username}</div>
            <div>{userid}</div> */}

        </>

    )
}

export default Wishcard