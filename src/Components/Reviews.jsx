import React, { useContext, useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { reviewsRef,db } from '../firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Reviews = ({id, prevRating,userRated}) => {
    // const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const useAppstate = useContext(Appstate);
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(false);
    const[reviewsLoading, setReviewsLoading] = useState(false);
    const [form, setForm] = useState(""); 
    const [data,setData] = useState([]);
    const [update,changeUpdate] = useState(0)

    const sendReview = async ()=>{
        
        setLoading(true);
        try{
            if(useAppstate.login){
            await addDoc(reviewsRef,{
                movieid: id,
                name:useAppstate.userName,
                rating: rating,
                thought:form,
                timestamp:new Date().getTime()
            })

            const ref = doc(db, "movies", id);
            await updateDoc(ref, {
                rating:prevRating + rating,
                rated: userRated+1
            })

            swal({
                title: "Review sent successfully",
                icon:"success",
                buttons:false,
                timer:3000
              })
            }
            else
            {
                navigate("/Login");
            }
        }
        catch(error){
            swal({
                title: error.message,
                icon:"error",
                buttons:false,
                timer:3000
              })
        }
        setLoading(false);
        setForm("")
        setRating(0)
        changeUpdate(update+1);
    }

    useEffect(()=>{
        async function getData(){
            setReviewsLoading(true);
            let quer = query(reviewsRef, where('movieid', '==', id))
            const querySnapshot = await getDocs(quer);
            
            setData([]);
            querySnapshot.forEach((doc)=>{
                setData((prev) =>[...prev, doc.data()])
            })
            setReviewsLoading(false);
        }
        getData();
    },[update])

  return (
    <div className='mt-4 w-full border-t-2'>
        <ReactStars
          size={30}
          value={rating}
          half={true}
          onChange={(rate) =>setRating(rate)}
        />
         <input placeholder='Enter your thoughts' value={form} onChange={(e)=>{setForm(e.target.value)}} className='w-full p-2 outline-none header'/>
         <button onClick={sendReview} className='bg-green-600 flex justify-center w-full p-2'>
          {loading ? <ThreeDots height={20}/> : 'Share'}   
         </button>

         {reviewsLoading ? <div className='mt-10 flex justify-center'> <ThreeDots height={15} color="white"/></div> :
                      
            <div className='mt-4 p-2'>
                {
                    data.map((e,i)=>{
                        return(
                            <div className='bg-gray-900 p-2 w-full mt-2' key={i}>
                                <div className='flex items-center'>
                                    <p className='text-blue-200'>{e.name}</p>
                                    <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                                </div>
                                <ReactStars
                                   size={20}
                                   value={e.rating}
                                   half={true}
                                   edit={false}

                                />

                                <p>{e.thought}</p>
                            </div>
                        )
                    })
                }
            </div>
         }

    </div>
  )
}

export default Reviews