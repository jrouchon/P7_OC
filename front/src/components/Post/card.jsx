import React from "react";
import { useEffect, useState } from "react";
import Like from "./like.jsx";

function dateParser(num) {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
    
      let timestamp = Date.parse(num);
      let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
      return date.toString();
}

function getOnePost() {
    // might delete this if not implemented
    //changer li pour div 
}

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        post && setIsLoading(false)
    }, [post]);

    return (
        <div className="cardContainer" key={post._id} onClick={getOnePost}> 
            {isLoading ? ( 
                <i className="fas fa-spinner fa-spin"></i>
                ) : (
                <div>
                    <div className='cardHeader'>
                        <p className='postName'>{post.userName}</p>
                        <p className='date'>{dateParser(post.date)}</p>
                    </div>
                    <div className="postContent">
                        {post.text ? (<h2>{post.text}</h2>) : null}
                        {post.imageUrl ? (<img className="cardImage" src={post.imageUrl} alt={post.imageUrl} />) : null}
                    </div>
                    <div className="postAction">
                        <Like post={post} />
                        

                    </div>
                </div>
             )}
            
        </div>
    )
}

export default Card;
