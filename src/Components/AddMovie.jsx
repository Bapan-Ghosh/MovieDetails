import React, { useContext, useState } from 'react'
import {TailSpin} from "react-loader-spinner";
import {addDoc} from "firebase/firestore"
import { moviesRef } from '../firebase/firebase';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const navigate = useNavigate();
    const useAppstate = useContext(Appstate);
    const [htmlForm, sethtmlForm] = useState({
        title:"",
        year:"",
        description:"",
        image:"",
        rated:0,
        rating:0
    })
    const [loading, setLoading] = useState(false);

    const addMovie =async ()=>{
        setLoading(true);
         try{
            if(useAppstate.login){
             await addDoc(moviesRef,htmlForm);
             swal({
               title: "Successfully Added",
               icon:"success",
               buttons:false,
               timer:3000
             })
             sethtmlForm({
                title:"",
                year:"",
                description:"",
                image:""
         })
        }
        else{
              navigate("/Login");
        }   
         }catch(err){
            swal({
                title: err,
                icon:"error",
                buttons:false,
                timer:3000
              })
         }
          setLoading(false);
    }

    return (
        <div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-8 mx-auto">
                    <div className="flex flex-col text-center w-full mb-4">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Add new movie</h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-300">Name</label>
                                    <input type="text" id="title" name="title" value={htmlForm.title} onChange={(e)=>{sethtmlForm({...htmlForm ,title: e.target.value})}} className="w-full  rounded border border-gray-300  focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-300">Year</label>
                                    <input type="email" id="email" name="year" value={htmlForm.year} onChange={(e)=>{sethtmlForm({...htmlForm ,year: e.target.value})}} className="w-full  rounded border border-gray-300  focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-300">Image link</label>
                                    <input id="message" name="image" value={htmlForm.image} onChange={(e)=>{sethtmlForm({...htmlForm ,image: e.target.value})}} className="w-full rounded border border-gray-300  focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out"></input>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-300">About movie</label>
                                    <textarea id="message" name="description" value={htmlForm.description} onChange={(e)=>{sethtmlForm({...htmlForm ,description: e.target.value})}} className="w-full rounded border border-gray-300  focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={addMovie} className="flex mx-auto text-black bg-white border-0 py-2 px-8 focus:outline-none hover:bg-red-400 hover:text-white rounded text-lg">
                                    {loading ?<TailSpin height={25} color="black"/> : 'Add'}
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddMovie