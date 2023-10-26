import React, { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { Appstate } from '../App';

const Header = () => {
  const useAppstate = useContext(Appstate);
  return (
    <div className='sticky header top-0 text-3xl flex justify-between items-center text-blue-500 font-bold p-3 border-b-2 border-gray-500'>
       <Link to={"/"}> <span>Filmy<span className='text-white'>World</span></span> </Link>
        {  useAppstate.login ? 
        <h1 className='text-lg items-center cursor-pointer'>
         <Link to={"/addmovie"}>  <Button ><AddIcon className='mr-2' color='inherit'/><span className='text-white'>Add New</span></Button></Link>
        </h1>
        :
         <h1 className='text-lg bg-green-500 items-center cursor-pointer'>
         <Link to={"/login"}>  <Button ><span className='text-white'>Login</span></Button></Link>
         </h1>
        }
    </div>
  )
}

export default Header 