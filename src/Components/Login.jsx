import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import {query, where, getDocs} from 'firebase/firestore'
import { usersRef } from "../firebase/firebase";
import { Appstate } from "../App";
import bcrypt from 'bcryptjs'
import swal from "sweetalert";

const Login = () => {
    const navigate = useNavigate();
    const useAppstate = useContext(Appstate);
    const [htmlForm, sethtmlForm] = useState({
        mobile: "",
        password: "",

    })
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
          const quer = query(usersRef, where('mobile', '==', htmlForm.mobile))
          const querySnapshot = await getDocs(quer);
    
          querySnapshot.forEach((doc) => {
            const _data = doc.data();
            const isUser = bcrypt.compareSync(htmlForm.password, _data.password);
            if(isUser) {
              useAppstate.setLogin(true);
              useAppstate.setUserName(_data.name);
              swal({
                title: "Logged In",
                icon: "success",
                buttons: false,
                timer: 3000
              })
              navigate('/')
            } else {
              swal({
                title: "Invalid Credentials",
                icon: "error",
                buttons: false,
                timer: 3000
              })
            }
          })
        } catch (error) {
          swal({
            title: error.message,
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
        setLoading(false);
      }
    


    return (
        <div className="w-full flex flex-col mt-10 justify-center items-center">
            <h1 className='text-xl font-bold'>Login</h1>
            <div className="p-2 md:w-1/3 w-full">
                <div className="relative">
                    <label className="leading-7 text-sm text-gray-300">Phone number</label>
                    <input type="number" name="mobile" value={htmlForm.mobile} onChange={(e) => { sethtmlForm({ ...htmlForm, mobile: e.target.value }) }} className="w-full rounded border border-gray-300  focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out"></input>
                </div>
            </div>
            <div className="p-2 md:w-1/3 w-full">
                <div className="relative">
                    <label className="leading-7 text-sm text-gray-300">Password</label>
                    <input bg-gray-400 type="password" name="password" value={htmlForm.password} onChange={(e) => { sethtmlForm({ ...htmlForm, password: e.target.value }) }} className="w-full rounded border border-gray-300  focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out"></input>
                </div>
            </div>
            <div className="p-2 w-full">
                <button onClick={login}  className="flex mx-auto text-black bg-gray-400 border-0 py-2 px-8 focus:outline-none hover:bg-green-500 hover:text-white rounded  text-2xl">
                    {loading ? <TailSpin height={25} color="black" /> : 'Login'}
                </button>
            </div>
            <div>
                <p>Do not have account?<Link to={"/Signup"}><span className='text-blue-500'>Sign Up</span></Link></p>
            </div>
        </div>
    )
}

export default Login