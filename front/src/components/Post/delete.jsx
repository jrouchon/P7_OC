import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";

function deletePost(id, token) {
    return new Promise((resolve) => {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/posts/${id}`,
        withCredentials: false,
        headers: { Authorization : "Bearer " + token, },
        
    })
        .then((res) => {return res.status})
        .then(resolve)
        .catch(console.error);
    });
  }

const DeletePost = ({ post }) => {
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState("")

    useEffect(() => {
        deletePost(post._id, token)
            .then((res) => res === 200
                ?
                (setStatus("Publication supprimée !"), setTimeout(() => {
                    document.location.reload()
                }, 2000))
                : null)
            .catch(setTimeout(() => {
                document.location.reload()
            }, 2000))
            .finally(setIsLoading(false))
    }, [post._id, token])

    return (
        <div>
             {
                isLoading
                    ? <i className="fas fa-spinner fa-spin"></i>
                    : <p className='statusMessage' style={{fontSize: "15px"}}>{status}</p>

            }

        </div>
    );
};

export default DeletePost;