'use client'
import React from 'react'
import axios from "axios"
import { createContext, useContext, useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { cookies } from 'next/headers';

const AuthContext = createContext({
    userid: null as number | null,
    username: null as string | null,
    isAuthenticated: false,
    login: (data: object) => { },
    logout: () => { },
});

// const AuthContext = createContext<any>(null);


// Context Provider komponens
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState<string | null>(null);
    const [userid, setUserid] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userAccessToken, setUserAccessToken] = useState<string | null>(null)
    const [userRefreshToken, setUserRefreshToken] = useState<string | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [firstName, setFirstName] = useState<string | null>(null)
    const [lastName, setLastName] = useState<string | null>(null)
    const [userEvents, setUserEvents] = useState<string | null>(null)
    const [questScore, setQuestScore] = useState<string | null>(null)
    const [hostScore, setHostScore] = useState<string | null>(null)

    // Ellenőrzi, hogy van-e token a LocalStorage-ban
    useEffect(() => {
        const token = localStorage.getItem('refreshToken');
        const storedUserid = localStorage.getItem('userid');
        const storedUsername = localStorage.getItem('username');
        if (token && storedUsername) {
            setUsername(storedUsername);
            setUserid(Number(storedUserid))
            setIsAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);


    const login = (data: object) => {
        console.log(data)
        setUserid(data.user.pk);
        setUsername(data.user.username);
        setIsAuthenticated(true)
        setUserAccessToken(data.access)
        setUserRefreshToken(data.refresh)
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.access);
        localStorage.setItem('userid', data.user.pk);
        localStorage.setItem('username', data.user.username);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
    }

    const logout = () => {
        setUsername(null);
        setIsAuthenticated(false);
        // setUserToken(null)
        localStorage.removeItem('authToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        delete axios.defaults.headers.common['Authorization'];
    }

    return (
        <AuthContext.Provider value={{ userid, username, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};


// A felhasználói adatokat a szerver oldalon betöltöd
export async function getServerSideProps(context) {
    const session = await getSession(context);
    const user = session ? session.user : null;

    return {
        props: {
            user,
        },
    };
}






// // Bejelentkezés és tokenek megszerzése
// async function login(username, password) {
//   try {
//     const response = await axios.post('http://localhost:8000/api/token/', {
//       username,
//       password,
//     });

//     const { access, refresh } = response.data;

//     // Tokenek tárolása (localStorage vagy cookie)
//     localStorage.setItem('accessToken', access);
//     localStorage.setItem('refreshToken', refresh);

//     return access;
//   } catch (error) {
//     console.error('Bejelentkezési hiba:', error);
//     return null;
//   }
// }

// // API kérés küldése JWT tokennel
// async function fetchData() {
//   const token = localStorage.getItem('accessToken');

//   try {
//     const response = await axios.get('http://localhost:8000/api/your-endpoint/', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log('Adatok:', response.data);
//   } catch (error) {
//     console.error('API kérés hiba:', error);
//     // Ha az access token lejárt, próbáld meg frissíteni
//     if (error.response.status === 401) {
//       const refreshed = await refreshToken();
//       if (refreshed) {
//         await fetchData(); // Újra próbáld meg a lekérést
//       }
//     }
//   }
// }

// // Refresh tokennel új access token megszerzése
// async function refreshToken() {
//   const refreshToken = localStorage.getItem('refreshToken');

//   try {
//     const response = await axios.post('http://localhost:8000/api/token/refresh/', {
//       refresh: refreshToken,
//     });

//     const { access } = response.data;
//     localStorage.setItem('accessToken', access);
//     return true;
//   } catch (error) {
//     console.error('Token frissítési hiba:', error);
//     return false;
//   }
// }