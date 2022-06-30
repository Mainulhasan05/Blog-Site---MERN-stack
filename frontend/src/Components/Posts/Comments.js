import React, { useContext, useEffect, useState } from 'react';
import "./Comments.css"
import { UserContext } from '../../App';
const END_POINT = 'https://mernblog05.herokuapp.com'
const Comments = ({postId}) => {
    const userContext = useContext(UserContext);
    const [user, setUser1] = useState(userContext);
    
    const [postComment, setpostComment] = useState("");
    const [comment, setComment] = useState([]);

    useEffect(async() => {
        if(postId){
            const res=await fetch(`${END_POINT}/post/getComment/${postId}`)
            .then(res=>res.json())
            .then(data=>{
                setComment(data)  
                
            })
        }

     }, [postId]);

     const deleteComment=async(commentId)=>{
        console.log("hello")
        if(commentId){
            const res=await fetch(`${END_POINT}/post/deleteComment/${commentId}`)
            .then(res=>res.json())
            .then(data=>{
                setComment(data)  
                
            })
        }
     }
    const publishComment=async()=>{
        const res = await fetch(`${END_POINT}/post/makecomment`, {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({postComment,postId,author:user._id})
          })
          .then(res=>res.json())
          .then(data=>{
            setpostComment("")         
            setComment(data)
              
            })
    }

  return (
      <div className='container my-4'>
          <h5>Comments</h5>
          { comment.map((data,index)=>{
              return(
                  <div key={index}>
                    <p><b>{ data.author.first+" "+data.author.last}    </b> {new Date(data.createdAt).toDateString()} {user && <span>{data.author._id==user._id?<img onClick={()=>deleteComment(data._id)} style={{"cursor":"pointer"}} src="https://img.icons8.com/plasticine/25/000000/filled-trash.png" alt='delete'/>:null}</span>} </p>
                    <p className='comment'>{data.postComment}</p>
                  </div>
              )
          })}
          {/* comments ends */}
          <div className="md-form">
  <textarea value={postComment} onChange={(e)=>{setpostComment(e.target.value)}} className="md-textarea form-control" rows="3"></textarea>
  <label className='my-2'><button onClick={publishComment} className='btn btn-success'>Publish</button></label>
</div>
      </div>
  )
};

export default Comments;
