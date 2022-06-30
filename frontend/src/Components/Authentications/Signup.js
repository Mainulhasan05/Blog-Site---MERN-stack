import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Signup.css"

const END_POINT='https://mernblog05.herokuapp.com'
const Signup = ({updateUser}) => {
  const navigate=useNavigate();
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("User"))){
      navigate("/");
    }
  }, []);
  
  const [sign,setSign]=useState({
    first:"",
    last:"",
    email:"",
    password:""
  }) 
  const handleSignIn=(e)=>{
    setSign({...sign,[e.target.name]:e.target.value})
  }
  const submitSignup=async()=>{
    const[first,last,email,password]=sign
    if(first && last && email && password){
      const res=await fetch(`${END_POINT}/auth/register`,{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify(sign)
      })
      .then(res=>res.json())
      .then(data=>updateUser(data))
    }
    else{
      alert("Please fill all the fields")
    }

  }
  return (
    <div className='container-fluid loginContainer'>
    <div style={{"height":"30px"}}>
    <i  className="fas fa-lock lockIcon"/>
    </div>
    
    <div className='mb-3 my-3'>
    <h1>New User</h1>
    </div>
    <div className="">
      <div className='nameFields mb-4'>
    <input onChange={(e)=>handleSignIn(e)} value={sign.first} type="text" placeholder='First Name' name='first' className="form-control userName" />    
    <input onChange={(e)=>handleSignIn(e)} value={sign.last} type="text" placeholder='Last Name' name='last' className="form-control userName" />    
      </div>
    <input onChange={(e)=>handleSignIn(e)} value={sign.email} name='email' type="email" className='form-control mb-4 inputFields' placeholder='Email*' autoComplete='email'/>
    <input onChange={(e)=>handleSignIn(e)} value={sign.password} name='password' type="password" className='form-control inputFields' placeholder='Password*'/>
    <input type="file" name="" id="" />
    </div>

    
      <button onClick={submitSignup} className='btn btn-primary my-3 inputFields mb-3'>Sign up</button>

      {/* <Link to="/">Forgot Password?</Link> */}
      {/* <a className='my-2' href=""></a> */}
      <Link to="/login">Already have an account? Sign in</Link>
        
      
    
    

  </div>
  )
};

export default Signup;
