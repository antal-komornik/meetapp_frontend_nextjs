"use client";

import React from 'react';
import { Image } from "@nextui-org/react";
import { useRouter } from 'next/navigation'


const Card = (props: any) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/events/${props.id}`);
    };

    return (
        <div key={props.id} className="card card-normal bg-base-100 w-96 shadow shadow-slate-400 cursor-pointer" onClick={handleClick}>
            <div className="card-body">
                <h2 className="card-title">{props.title}</h2>
                <p>{new Date(props.starting_time).toLocaleString()}</p>
            </div>
            <figure>
                <Image
                    src={props.image || "/placeholder.png"}
                    width={200}
                    height={200}
                    className="max-w-sm rounded-lg shadow-2xl"
                    alt={props.title}
                />
            </figure>
        </div>
    );
};

export default Card;
