import axios from "axios"
import {
    User, Event, Registration, Wish, EventType, Search
} from "./definitions"
import { useAuth } from "../context/AuthProvider";

export const baseUrl = 'https://api.komornikantal.hu/'




// axios.defaults.withCredentials = true;

// axios.interceptors.request.use(async (config) => {
//   const csrfToken = await getCsrfToken();
//   config.headers['X-CSRFToken'] = csrfToken;
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

export async function getCsrfToken() {
    const response = await axios.get(baseUrl +'get_csrf_token/', {
      withCredentials: true
    });
    return response.data.csrf_token;
  }

export async function fetchEvents(): Promise<Event[]> {
    try {
        const response = await axios.get(baseUrl+ 'events/', 
            {
              withCredentials: true,
            });
        // const events: Event[] = response.data.results;
        // return events;
        return response.data.results;
    } catch (error) {
        console.log('Error fetching events:', error);
        throw error;
        // Ha hibát szeretnénk dobni, például ha a felhívó függvény kezelni szeretné a hibát
        // throw new Error('Failed to fetch events');
    }
}

export async function getEventDetails(id:any){
    try{
        id = Object.values(id);
        const response  = await  axios.get(baseUrl+`events/${id}/`,{
         withCredentials: true,
        });
        return response.data
    }
    catch(error){
        console.error(error)
        throw error; 
    }
}

export async function addEventWishlist(userid: number, eventid: number) {
    try {
      // const csrfToken = await getCsrfToken();
      const response = await axios.post(baseUrl+ "wishlist/",{
        "user_id":userid,
        "event_id": eventid
      }, 
      // {
      //     headers: {
      //         'X-CSRFToken': csrfToken,
      //     },
      //     withCredentials: true,
      // }
  );
  
      if (response.status >= 200 && response.status < 300) {
          console.log('Success:', response.status);
          console.log(response)
          return response.data;
      } else {
          console.log('Failed:', response.status);
          throw new Error('Request failed with status ' + response.status);
      }
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
  }

export async function addEventRegistraion(userid: number, eventid: number) {
    try {
      const response = await axios.post(baseUrl+"eventsregister/",{
        "user_id":userid,
        "event_id": eventid
      });
  
      if (response.status >= 200 && response.status < 300) {
          console.log('Success:', response.status);
          console.log(response)
          return response.data;
      } else {
          console.log('Failed:', response.status);
          throw new Error('Request failed with status ' + response.status);
      }
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
  }

export async function getWishedEvents(id: any){
    try{
        
        const response  = await  axios.get(baseUrl+`user/${id}/events/`,{
         withCredentials: true,

        });
        // console.log("data")
        // console.log(response.data.results)
        // const allwished: object = await response.data.results
        // console.log(allwished)
        return response.data.results
    }
    catch(error){
        console.error(error)
        throw error; 
    }
}



  
  export async function handleUserLogin(data: object) {
    try {
      //   const csrfToken = await getCsrfToken();
        const response = await axios.post(baseUrl+ "auth/login/", data);
  
        if (response.status >= 200 && response.status < 300) {
            const { access, refresh } = response.data;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            console.log('Success:', response.status);
            return response.data;
        } else {
            console.log('Failed:', response.status);
            throw new Error('Request failed with status ' + response.status);
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  }
  