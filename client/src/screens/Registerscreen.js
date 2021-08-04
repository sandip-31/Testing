import React, { useState, useEffect } from 'react'
import Loader from "../components/Loader"
import Error from "../components/Error"
import Success from "../components/Success"
import axios from "axios"

function Registerscreen() {

    const [name, setname] = useState(' ')
    const [email, setemail] = useState(' ')
    const [password, setpassword] = useState(' ')
    const [cpassword, setcpassword] = useState(' ')
    const [loading, setloading] = useState()
    const [error, seterror] = useState()
    const [success, setsuccess] = useState()
    async function register() {
        if (password == cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            };
            try {
                setloading(true);
                const result = await axios.post("/api/users/register", user).data;
                setloading(false)
                setsuccess(true)


                setname(' ')
                setemail(' ')
                setpassword(' ')
                setcpassword(' ')

            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(true)
            }

        }
        else {
            alert("password don't matched")
        }
    }

    return (
        <div >

            {loading && (<Loader />)}
            {error && (<Error />)}

            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {success && (<Success message="Registation Sucessfull" />)}
                    <div className="bs">
                        <h2>Register</h2>
                        <label >Name</label>
                        <input type="text" className="form-control input" placeholder="name" value={name} onChange={(e) => { setname(e.target.value) }} />
                        <label >Email</label>
                        <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <label >Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <label >Conform Password</label>
                        <input type="password" className="form-control" value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />


                        <button className="btn btn-primary mt-3" onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registerscreen
