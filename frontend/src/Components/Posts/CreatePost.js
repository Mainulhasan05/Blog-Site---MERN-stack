import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Home/Navbar';
import "./CreatePost.css"
import CKEditor from "./CKEditor"
import { UserContext } from '../../App';
import { Navigate, useNavigate } from 'react-router-dom';
const END_POINT = 'https://mernblog05.herokuapp.com'
const CreatePost = () => {
    const [isChecked, setIsChecked] = useState(true);
    const user = useContext(UserContext);
    const navigate = useNavigate()
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, []);

    const publishPost = async () => {
        const res = await fetch(`${END_POINT}/post/createPost`, {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ author: user._id, title, description,isChecked })
        })
            .then(res => res.json())
            .then(data => {
                navigate("/")
            })

    }
    return (
        <div>
            <Navbar />
            <div className="background">

            </div>
            {/* checkbox starts here */}
            <div style={{"fontWeight":"bold"}} className="checkboxDiv d-md-flex  justify-content-center my-4">
                <div className=" mx-4 custom-control custom-radio custom-control-inline">
                    <input checked={isChecked} type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input " onChange={()=>setIsChecked(!isChecked)}/>
                    <h5 className="custom-control-label mx-1" for="customRadioInline1"> Make This Blog Visible to others (Public)</h5>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                    <input checked={!isChecked} type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" onChange={()=>setIsChecked(!isChecked)} />
                    <label className="custom-control-label mx-1" for="customRadioInline2"> Keep it private</label>
                </div>
            </div>
            {/* checkbox ends here */}

            <div className='container  my-3'>
                <div className='d-flex justify-content-between'>
                    <label className=''><h3>Title</h3></label>
                    <button onClick={publishPost} className='btn btn-success my-2' type="submit">Publish</button>

                </div>

                <input className="postTitleInput" onChange={(e) => setTitle(e.target.value)} value={title} type="text" className='form-control' />
            </div>
            <CKEditor setDescription={setDescription} />
        </div>
    )
};

export default CreatePost;
