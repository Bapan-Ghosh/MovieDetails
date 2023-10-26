import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { ThreeDots } from 'react-loader-spinner';
import Reviews from './Reviews'

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating:0,
    rated: 0
  })

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "movies", id)
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, [])

  return (
    <div className='p-4 mt-4  flex flex-col md:flex-row items-center w-full justify-center'>
      {loading ? <div className='w-full flex justify-center items-center h-96'> <ThreeDots /> </div> :
       <>
        <img className='h-96 block md:sticky top-1' src={data.image} alt="not found ok bro" />
        <div className='md:ml-4 ml-0 w-full md:w-1/2'>
          <h1 className='text-2xl font-bold text-gray-500'>{data.title} <span className='text-xl'>({data.year})</span></h1>
          <ReactStars
            size={20}
            half={true}
            value={data.rating/data.rated}
            edit={false}
          />

          <p className='mt-3'>{data.description}</p>
          <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>
        </div>
      </>
      }
    </div>
  )
}

export default Detail