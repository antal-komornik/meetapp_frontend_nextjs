import { log } from 'console';
import React from 'react'
import { useState, useContext } from 'react';
import { handleUserLogin } from '../lib/data';
import { useAuth } from '../context/AuthProvider';


const UserLogin = (props: any) => {
    const { login } = useAuth()
    const [formusername, setFormusername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const loginData = {
            username: formusername,
            password: password,
        }

        try {
            const result = await handleUserLogin(loginData);
            if (result) {
                login(result)
                props.setShowLoginModal(false)
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <>
            <div className="modal modal-open z-50" >
                <div className="modal-box " >
                    <h3 className="font-bold text-lg">Bejelentkezés</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                className="input input-bordered"
                                value={formusername}
                                onChange={(e) => setFormusername(e.target.value)}
                            />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="submit">Bejelentkezés</button>
                            <button className="btn" onClick={() => props.setShowLoginModal(false)}>Mégse</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserLogin