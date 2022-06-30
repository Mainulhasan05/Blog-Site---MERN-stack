import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Home/Navbar';
import "./CreatePost.css"
import CKEditor from "./CKEditor"
import { UserContext } from '../../App';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
const END_POINT = 'https://mernblog05.herokuapp.com'
const UpdatePost = () => {
    const { id } = useParams();
    const [isChecked, setIsChecked] = useState(true);
    const user = useContext(UserContext);
    const navigate = useNavigate()
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [post, setPost] = useState({});
    useEffect(async () => {
        if (!user) {
            navigate("/login")
        }
        const res = await fetch(`${END_POINT}/post/getPostDetails/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title)
                setDescription(data.description)
                setIsChecked(data.isChecked)

            })
    }, []);

    const updatePost = async () => {
        const res = await fetch(`${END_POINT}/post/updatePost/${id}`, {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ title, description ,isChecked})
        })
            .then(res => res.json())
            .then(data => {
                navigate(`/detailview/${id}`)
            })

    }
    return (
        <div>
            <Navbar />
            <div className="background">

            </div>

            {/* checkbox starts here */}
            <div className="checkboxDiv d-md-flex  justify-content-center my-4">
                <div className=" mx-4 custom-control custom-radio custom-control-inline">
                    <input checked={isChecked} type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input " onChange={() => setIsChecked(!isChecked)} />
                    <label className="custom-control-label mx-1" for="customRadioInline1"> Make This Blog Visible to others</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                    <input checked={!isChecked} type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" onChange={() => setIsChecked(!isChecked)} />
                    <label className="custom-control-label mx-1" for="customRadioInline2"> Keep it private</label>
                </div>
            </div>
            {/* checkbox ends here */}

            <div className='container  my-3'>
                <div className='d-flex justify-content-between'>
                    <label className=''><h3>Title</h3></label>
                    <button onClick={updatePost} className='btn btn-success my-2' type="submit">Update</button>

                </div>

                <input className="postTitleInput" onChange={(e) => setTitle(e.target.value)} value={title} type="text" className='form-control' />
            </div>
            <CKEditor description={description} setDescription={setDescription} />
        </div>
    )
};

export default UpdatePost;
