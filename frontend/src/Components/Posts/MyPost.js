import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Navbar from '../Home/Navbar';
import PostTemplate from '../Home/PostTemplate';
const END_POINT='https://mernblog05.herokuapp.com'
const MyPost = () => {
    const userContext = useContext(UserContext);
    const [user, setUser] = useState(userContext);
    const [post, setPost] = useState([]);
    const [display, setDisplay] = useState([]);
    
    
    useEffect(async() => {
        const res=await fetch(`${END_POINT}/post/getPost/${user._id}`)
        .then(res=>res.json())
        .then(data=>{
            setPost(data)
            
        })
     }, []);
    const imgLinks=[
        "https://i.ibb.co/Nx64qnr/denys-nevozhai-z0n-Vqfr-Oq-WA-unsplash.jpg",
        "https://i.ibb.co/37mYsFt/pablo-heimplatz-EAv-S-4-Kn-Grk-unsplash.jpg"
      ]
  return (
      <div>
          <Navbar/>  
        <div  className="background ">
          <img src={imgLinks[1]} alt="" />
        </div>




        <div className="reverse">
          {post.map((data,index)=>{
            return(
              <div className=''>
 <PostTemplate data={data} key={index}/>
              </div>
             
            )
          })}
          </div>
      </div>
  )
};

export default MyPost;
