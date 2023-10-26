import React, { useEffect, useState,useContext } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars'
import {getDocs} from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

const Cards = () => {
    const useAppstate = useContext(Appstate);
    const [data, setData] = useState([])
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        async function getData(){
            setLoading(true);
            const _data = await getDocs(moviesRef);
            _data.forEach((doc)=>{
                setData((prevData)=>
                    [...prevData,{...doc.data(), id:doc.id}]
                 )
            })
            setLoading(false);
        }
        getData();
    },[])

    return (
        <div className='flex flex-wrap justify-between items-center px-3 mt-2'>
            {loading ? <div className='w-full flex justify-center items-center h-96'> <ThreeDots/> </div>:
                data.map((elem, index) => {
                    return (
                        <div key={index} className='card shadow-lg p-2 hover:-translate-y-3 font-medium md:mt-0 mt-6 transition-all duration-500 mr-1 mb-1'>
                            <img className='md:h-60 md:w-60 h-49 w-49' src={elem.image} alt="" />
                            <h1> {elem.title}</h1>
                            {/* {console.log(elem.title)} */}
                            <h1 className='flex items-center'>
                              <ReactStars 
                                size={20}
                                half={true}
                                value={elem.rating/elem.rated}
                                edit={false}
                              />
                            </h1>
                            <h1><span>Year: </span>  {elem.year}</h1>
                            <Link className='cursor-pointer hover:underline ' to={`/details/${elem.id}`}><button className='text-blue-500'>view details</button></Link>
                        </div>
                    )
                })
           }
        </div>
    )
}

export default Cards