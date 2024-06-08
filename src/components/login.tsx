"use client"

import {useAuth} from "@/contexts/AuthContext";

const Login = () =>{

    const { user, login, logout } = useAuth()
    return(
        <>
            {
                user ?
                    <>
                        {user.displayName}
                        <button onClick={logout}>Logout</button>
                    </>
                    :
                    <>
                        <button onClick={login}>Login</button>
                    </>
            }
        </>
    )
}

export default Login;