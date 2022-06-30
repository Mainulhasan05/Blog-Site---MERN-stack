import React, { useContext, useEffect, useState } from 'react';
import "./Login.css"
import Navbar from '../Home/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
const END_POINT = 'https://mernblog05.herokuapp.com'

// firebase starts






// firebase ends
const Login = ({ updateUser, setUser }) => {
  const userContext = useContext(UserContext);
  const [user, setUser1] = useState(userContext);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, []);

  const handleSignIn = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })

  }
  const submitLogin = async () => {
    const res = await fetch(`${END_POINT}/auth/login`, {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(login)
    })
      // .then(res => res.json())
      // .then(data => {
      //   // setUser(data)
      //   updateUser(data)
      //   console.log("kaj to korloi");
      // })
      if(res.status===500){
        setError(true);
      }
      else if(res.status===200){
        const res2=res.json().then(data=>{
          setUser(data)
          updateUser(data)
          navigate("/")
        })
      }
    // navigate("/")
  }
  return (
    <>
    <div>
    <Navbar />
    </div>
      
      <div className='container-fluid loginContainer'>
        {error && <div class="alert alert-danger" role="alert">
          <h5>Invalid Login</h5>
        </div>}
        <div style={{ "height": "30px" }}>
          <i className="fas fa-lock lockIcon" />
        </div>

        <div className='mb-4 my-3'>
          <h1>Sign in</h1>
        </div>
        <div className="">
          <input onChange={(e) => handleSignIn(e)} name='email' type="email" className='form-control mb-4 inputFields' placeholder='Email*' autoComplete='email' />
          <input onChange={(e) => handleSignIn(e)} name='password' type="password" className='form-control inputFields' placeholder='Password*' />
        </div>


        <button onClick={submitLogin} className='btn btn-primary my-3 inputFields mb-3'>Sign in</button>

        <Link to="/signup">Forgot Password?</Link>
        {/* <a className='my-2' href=""></a> */}
        <Link to="/signup">Don't have an account? Sign up</Link>





      </div>
    </>
  )
};

export default Login;
