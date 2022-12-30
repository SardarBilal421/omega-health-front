import React, {useState} from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
const ImageGallery = () => {
    const [imagegal, setImage] = useState([])
   useEffect(()=>{
    const img = localStorage.getItem('Images')
    setImage(JSON.parse(img))
   },[])
   //console.log(compareStrings(str1.toUpperCase(), str2.toUpperCase()));
   function compareStrings(s1, s2){
   
    if(s1 == s2){
        return true;
    }
    
    return false;
}

  return (
    <>
    <div className="h-screen w-full"
    style={{
        backgroundColor:'#F4F4F4'
    }}>
      <h1 className="text-black font-bold text-3xl md:text-1xl
      text-center
      lg:text-2xl p-10 lg:mb-14 font-poppins">
        Hospital Images<span className='text-secondary'>.</span>
      </h1>

      {!imagegal ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-5 
        md:grid-cols-2 xl:grid-cols-3 pb-20 m-5 lg:container items-center justify-center lg:ml-10">
          {imagegal.map((image) => (
             <div className="p-5 rounded-3xl shadow-md bg-white ">
               <img
                 src={ `assets/public/img/hospital/${image}`}
                 className="h-52 object-fit object-cover w-full lg:h-80 
                 transition duration-200 ease-in hover:opacity-80
                 rounded-3xl"
               />
       
              </div>
          ))}
        </section>
      )}
    </div>
    </>
  )
}

export default ImageGallery
