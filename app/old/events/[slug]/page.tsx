"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getEventDetails } from '@/app/lib/data';
import { countParticipants } from '@/app/lib/actions'
import { Event } from '@/app/lib/definitions';
import Image from 'next/image'
import { useAuth } from '@/app/context/AuthProvider';
import { addEventRegistraion, addEventWishlist } from "../../../lib/data"

export default function Page() {
    const slug = useParams();
    const { userid, isAuthenticated } = useAuth()
    const [eventData, setEventData] = useState<Event>()
    const [memberCounted, setMemberCounted] = useState<number>()

    useEffect(() => {
        if (slug) {
            const fetchData = async () => {
                const data = await getEventDetails(slug);
                const members = await countParticipants(data.max_participants, data.event_registration)
                setMemberCounted(members)
                setEventData(data);
            }
            fetchData();
        }
    }, [slug]);


    if (!eventData) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col ">
                {/* Ha van kép, akkor azt jelenítjük meg, különben csak egy placeholder */}

                <h1 className="text-5xl font-bold hidden md:flex">{eventData.title}</h1>

                <Image
                    src={eventData.image || "/placeholder.png"}
                    width={200}
                    height={200}
                    className="max-w-sm rounded-lg shadow-2xl"
                    alt={eventData.title}
                />
                <div>
                    <h1 className="text-5xl font-bold flex md:hidden">{eventData.title}</h1>

                    {eventData.description != "" ?
                        <p className="py-2"><strong>Description:</strong>{eventData.description}</p>
                        :
                        <p className="py-2"><strong>Description:</strong>Not specified</p>
                    }
                    {eventData.location !== "" ?
                        <p><strong>Location:</strong> {eventData.location}</p>
                        :
                        <p><strong>Location:</strong> Not specified</p>
                    }
                    <p><strong>Starting Time:</strong> {new Date(eventData.starting_time).toLocaleString()}</p>
                    <p><strong>Number of places:</strong> {memberCounted}/{eventData.max_participants}</p>
                    {/* <p className="mt-4">
                        <a href={eventData.owner} className="text-blue-500 underline">View Owner</a>
                    </p> */}


                </div>
                <div className="join join-vertical md:join-horizontal gap-5">
                    {isAuthenticated && userid != null
                        ?
                        <>
                            {memberCounted > 0 ?
                                <button className="btn join-item  shadow shadow-slate-400" onClick={() => {
                                    addEventRegistraion(userid, eventData.id)
                                }}>Jelentkezés</button>
                                : <button className="btn join-item disabled  shadow shadow-slate-400">Betelt</button>
                            }
                            <button className="btn join-item  shadow shadow-slate-400" onClick={() => addEventWishlist(userid, eventData.id)}>Mentés</button>
                        </>
                        :
                        <h3>jelentkezz be a csatlakozáshoz</h3>
                    }
                </div>
            </div>
        </div>

    )
}
