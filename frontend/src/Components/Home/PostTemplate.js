import React from 'react';
import "./PostTemplate.css"
import { Link } from 'react-router-dom';
const PostTemplate = ({data,index,status}) => {
    
  return (
    
      <div key={index} className=''>
          <div className="postBox container d-md-flex d-sm-flex justify-content-between my-3">
              <div className="postTitle p-2">
              <Link style={{textDecoration:'none',color:'inherit'}} to={`/detailview/${data._id}`}> <h2>{data.title}</h2></Link>
                  <p>Author: {data.author.first+" "+data.author.last}</p>
                {!data.isChecked && <p style={{"color":"tomato"}}>Status:  Private</p>}
                {data.isChecked && <p style={{"color":"green"}}>Status:  Public</p>}
                
                {/* {user && post.author && post.author._id===user._id &&<p style={{"color":"tomato"}}>Status:  Private</p>} */}
                  <p className='viewdescription' contentEditable='false' dangerouslySetInnerHTML={{ __html: data.description }}></p>
                 
               <Link to={`/detailview/${data._id}`}>  <button className='btn btn-dark'>Read More</button></Link>
                 
              </div>
              
                  <img  src="https://i.ibb.co/jJyfXM9/absolutvision-82-Tp-Eld0-e4-unsplash.jpg" alt="" />
              

          </div>
      </div>
  )
};

export default PostTemplate;
