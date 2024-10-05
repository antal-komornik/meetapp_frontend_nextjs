import React from 'react'

const UserRegister = (props: any) => {
    return (
        <>
            <div className="modal modal-open z-50">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Regisztráció</h3>
                    <form>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Email" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Jelszó</span>
                            </label>
                            <input type="password" placeholder="Jelszó" className="input input-bordered" />
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="submit">Regisztráció</button>
                            <button className="btn" onClick={() => props.setShowRegisterModal(false)}>Mégse</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserRegister