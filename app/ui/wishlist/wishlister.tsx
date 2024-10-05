import React from 'react';
import { Image } from "@nextui-org/react";
import { getWishedEvents } from '@/app/lib/data'
import Wishcard from './wishcard';



export default async function WishLister(props: any) {
    const id = localStorage.getItem('userid')
    const event = await getWishedEvents(id);
    console.log("lister")
    console.log(event)

    return (
        <div>
            <h1>hello</h1>
            <Wishcard />
        </div >
    )
}


