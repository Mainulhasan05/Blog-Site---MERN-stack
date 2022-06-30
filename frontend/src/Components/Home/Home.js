import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import PostTemplate from './PostTemplate';
import "./Home.css"
import Navbar from './Navbar';
const END_POINT='https://mernblog05.herokuapp.com'
const Home = () => {
    const userContext = useContext(UserContext);
    const [user, setUser] = useState(userContext);
    const [post, setPost] = useState([]);
    const [post1, setPost1] = useState([]);
    // useEffect(() => {
    //   setUser(userContext);
    // }, []);
    useEffect(async() => {
       const res=await fetch(`${END_POINT}/post/getPost`)
       .then(res=>res.json())
       .then(data=>{
         setPost1(data)
        setPost(data)
       })
    }, []);
    const imgLinks=[
      "https://i.ibb.co/Nx64qnr/denys-nevozhai-z0n-Vqfr-Oq-WA-unsplash.jpg",
      "https://i.ibb.co/37mYsFt/pablo-heimplatz-EAv-S-4-Kn-Grk-unsplash.jpg"
    ]
    const [search, setSearch] = useState('');
    const searchKeyword=(e)=>{
        // console.log(e.target.value);
        setSearch(e.target.value);
        
        const filteredArray=post.filter(data=>{
            if(data.title.toLowerCase().includes(e.target.value.toLowerCase())||data.author.first.toLowerCase().includes(e.target.value.toLowerCase())){
                return true;
            }
            else{
                return false;
            }
        })
         setPost1(filteredArray);
    }
  return (
      <div>
        
        <Navbar/>  
        <div  className="background ">
          <img src={imgLinks[1]} alt="" />
        </div>
       <Link to="/createPost"><button style={{"border":"1px solid grey"}} className='btn btn-primary'>Create New Post</button></Link>
        <div className="container-fluid row">
{/* JSON.parse(localStorage.getItem("User")) */}
       
          <h3>Hello</h3>
          {user&&<p className='col-sm-3'>{user.email}</p>}
          {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolore est fugiat, quo minima iusto, officiis perferendis aut sed amet velit blanditiis quibusdam, repellat obcaecati ad eveniet aliquam dicta itaque?</p>
           */}
          </div>
          <div className="form-outline mb-4 container">
  <input onChange={searchKeyword} value={search}  placeholder='Search blogs by title, author' type="search" className="form-control bg-dark text-white" id="datatable-search-input"/>
  <label className="form-label">Search</label>
</div>
          <div className="reverse">
          {post1.map((data,index)=>{
            return(
              <div className='' key={index}>
 {data.isChecked && <PostTemplate data={data} key={index}/>}
              </div>
             
            )
          })}
          </div>
          
          
          
      </div>
  )
};

export default Home;
