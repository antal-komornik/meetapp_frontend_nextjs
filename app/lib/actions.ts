/* eslint-disable react-hooks/rules-of-hooks */
// componens műveletek
// eseményekre jelentkezettek.
import axios from "axios"
import {
    User, Event, Registration, Wish, EventType, Search
} from "./definitions"
import { baseUrl, getCsrfToken } from "./data";



export async function countParticipants(max: number, array: object[]): Promise<number> {
    try {
        const participantsCount = array.length;
        return max - participantsCount;
    } catch (error) {
        console.error(error);
        throw error; 
    }
} 


