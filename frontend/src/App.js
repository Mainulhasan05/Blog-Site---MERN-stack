import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Login from './Components/Authentications/Login';
import Signup from './Components/Authentications/Signup';
import Home from './Components/Home/Home';
import CreatePost from './Components/Posts/CreatePost';
import DetailView from './Components/Posts/DetailView';
import UpdatePost from './Components/Posts/UpdateView';
import MyPost from './Components/Posts/MyPost';
import Profile from './Components/Profile/Profile';
export const UserContext = createContext();

function App() {
  //   const [user, setUser] = useState({});
  //   useEffect(() => {
  //     setUser(JSON.parse(localStorage.getItem("User")));

  //  }, []);

  //   useEffect(() => {
  //     console.log(user);
  //   }, []);


  // addnew
  const [user, setUser] = useState([]);
  const myUser = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    if (myUser) {
      setUser(myUser);
    }
  }, [])

  // ending new

  const updateUser = (user) => {

    localStorage.setItem("User", JSON.stringify(user));
    setUser(myUser);
    console.log(user);
  }
  return (
    <div className="App">


      <UserContext.Provider value={JSON.parse(localStorage.getItem("User"))}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} updateUser={updateUser} />} />
          <Route path="/signup" element={<Signup updateUser={updateUser} />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/detailview/:id" element={<DetailView />} />
          <Route path="/updateview/:id" element={<UpdatePost />} />
          <Route path="/mypost" element={<MyPost />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
