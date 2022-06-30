import React, { useContext, useState } from 'react';
import Navbar from '../Home/Navbar';
import "./Profile.css"
import { UserContext } from '../../App';
const Profile = () => {
    const userContext = useContext(UserContext);
    const [user, setUser] = useState(userContext);
  return (
      <div>
          <Navbar/>
          <div className="card profileBody">
              <div className="proImage">
                  <div style={{"maxWidth":"200px"}}>
                      {/* <img src={user.imageUrl} alt="" /> */}
                  </div>
                  <div className="bio container">
                      <div style={{"float":"right"}}>
                          <button className='btn bg-light deleteAccount'>Delete Account</button>
                      </div>
                      <div className='bio'>
                          <h3>Name: {user.first}</h3>
                          <h4>Email: {user.email}</h4>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
};

export default Profile;
