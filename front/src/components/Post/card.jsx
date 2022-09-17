import React from "react";
import { useEffect, useState } from "react";

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

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        post && setIsLoading(false)
    }, [post]);

    return (
        <li className="cardContainer" key={post._id}>
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
                
                </div>
             )}
            
        </li>
    )
}

export default Card;
