// tipus definiciók
export type User = {
    id: number,
    username: string,
    url: string,
    last_name: string,
    first_name: string,
    email: string,
    host_rating: number,
    quest_rating: number,
    events: string[]
}

export type Event ={
    id: number,
    url: string,
    title: string,
    date: string,
    description: string,
    starting_time: string,
    max_participants: number,
    image: string | null,
    owner: string,
    location: string,
    type: string,
    event_registration: {url: string, id: number}
}

export type Registration = {
    id: number,
    url: string,
    user: string, 
    event: string,
    registration_date: string
}


export type Wish =[

    id: number,
    url: string,
    user: string, 
    event: string,
]


export type EventType ={
    name: string
}

export type Search ={
    text: string
}
