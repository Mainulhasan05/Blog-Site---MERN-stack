import React, { useContext, useEffect, useState } from 'react';
import "./DetailView.css"
import Navbar from '../Home/Navbar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import Comments from './Comments';
const END_POINT = 'https://mernblog05.herokuapp.com'
const DetailView = () => {
    let { id } = useParams();
    const navigate=useNavigate();
    const userContext = useContext(UserContext);
    const [user, setUser] = useState(userContext);
    const [post, setPost] = useState({});
    useEffect(async () => {
      
        const res = await fetch(`${END_POINT}/post/getPostDetails/${id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data)
                setDate(new Date(data.createdAt).toDateString());
                
            })
    }, []);
    const deletePost = async () => {
        
        await fetch(`${END_POINT}/post/deletePost/${id}`)
        .then(res=>res.json())
        .then(data=>{
            
            navigate("/");
        })
        
    
          
    
      }
    const [date, setDate] = useState();
    return (
        <div>
            <Navbar />

            <div className="detailtile container">
               {user && post.author && post.author._id===user._id?  <div className='editdeleteicons'>
               <Link to={`/updateview/${post._id}`}><img className='mx-3' src="https://img.icons8.com/windows/26/ffffff/edit--v1.png" alt='edit'/></Link>
                     <img data-toggle="modal" data-target="#exampleModaldel" src="https://img.icons8.com/plasticine/32/000000/filled-trash.png" alt='delete'/>
                </div>:null }
                <h1 className='detailTitle'>{post.title}</h1>
                <p className='' style={{ "float": "left" }}>Author: {post.author && post.author.first + " " + post.author.last}</p>
                <p style={{ "float": "right", "color": "yellowgreen" }}>Posted: {post.createdAt && date}</p>



            </div>

            <div className="detailDescription container my-4">
                <h3>{post.title}</h3>
                <p  contentEditable='false' dangerouslySetInnerHTML={{ __html: post.description }}></p>
            </div>

<br />
            <Comments postId={post._id}/>
             {/* Post delete warning modal starts here */}



      <div className="modal fade" id="exampleModaldel" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
  
    <div className="modal-content" style={{"textAlign":"center"}} >
    
      {/* <div className="modal-header" > */}
        <div className="d-flex justify-content-center">
        <img src="https://img.icons8.com/ios/100/FF0000/cancel.png"/>
        
        </div>

      {/* </div> */}
      <div className="modal-body">
      <h3 >Are you sure?</h3>   
      <br />
      <p style={{"color":'gray'}}>Do you really want to delete these records? This process cannot be undone.</p>
      </div>
      
      <div className="modal-footer d-flex justify-content-center">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button onClick={deletePost} type="button" data-dismiss="modal" className="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>

      {/* Post delete warning modal ends here */}





        </div>
    )
};

export default DetailView;
