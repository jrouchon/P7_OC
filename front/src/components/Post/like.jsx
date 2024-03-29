import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";



function like( post) {
    const token = localStorage.getItem("token");
    return new Promise((resolve) => {
        axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
            data: { like: 1 },
            withCredentials: false,
            headers: { Authorization : "Bearer " + token },
            
        })
          .then((res) => {return res})
          .then(resolve)
          .catch(console.error);
      });
}



const Like = ({ post }) => {
    const userId = localStorage.getItem("userId");
    const [liked, setLiked] = useState(false);
    const [postNum, setPostNum] = useState(post.likes);

    useEffect(() => {
        if(post.usersLiked.includes(userId)) {
            setLiked(true);
        }
    }, [post, setLiked, userId]
    )

    
    return (
        <div className="likeButton-wrapper">
            <div className="likeButton">
                <i className="fas fa-solid fa-heart" onClick={() => { 
                    like(post)
                        .then(() => {liked ? setLiked(false) : setLiked(true)})
                        .then(() => {liked ? setPostNum(postNum - 1) : setPostNum(postNum + 1)})
                }} style={ liked ? { color: "#fd2d01" } : { color: "#4e5166"}}></i>
                <p className="likeNum" style={{fontSize : "15px"}}>{postNum}</p>
            </div>
        </div>
    )
}

export default Like;