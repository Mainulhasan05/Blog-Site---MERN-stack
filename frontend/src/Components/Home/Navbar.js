import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import "./Navbar.css"
const Navbar = () => {
    
    const user= useContext(UserContext);
    const [userState, setUserState] = useState(user);
    let navigate=useNavigate();
    const deleteStorage=()=>{
      localStorage.removeItem("User");
      
      user=null;
      setUserState({});
      navigate('/login');
    }
    useEffect(() => {
      
      setUserState(user);
    }, [user])
  return (
      <div >
          <nav className=" text-uppercase navbar navbar-expand-lg navbar-light col-12 py-0 mb-0  p-4">
  <Link className="navbar-brand" to="/">Rifat's Blog</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse mr-6" id="navbarNav">
    <ul className="navbar-nav ml-auto ">
      <li className="nav-item mx-2 active">
      <Link className="nav-link" to="/">Home</Link>
      </li>
      {
        userState?
        <li className="nav-item mx-2">
      <Link className="nav-link" to="/mypost">MyPost</Link>
      </li> : <></>
      }
      
      {/* <li className="nav-item mx-2">
      <Link className="nav-link" to="/events">Events</Link>
      </li> */}
     {userState ?  <li className="nav-item mx-2">
      <Link to="/" className="nav-link" onClick={deleteStorage}>Signout</Link>
      </li>: <li className="nav-item mx-2">
      <Link className="nav-link" to="/login">Signin</Link>
      </li>}
      {/* <li className="nav-item mx-2">
      <Link className="nav-link" to="/admin">Admin</Link>
      </li> */}
      {userState?<li className="nav-item mx-2">
      <Link className="nav-link" to="/profile">Profile</Link>
      </li>:null}
      {/* <li className="nav-item mx-2">
      <Link className="nav-link" to="/contact">Contact</Link>
      </li> */}
    </ul>
  </div>

</nav>
      </div>
  )
};

export default Navbar;
