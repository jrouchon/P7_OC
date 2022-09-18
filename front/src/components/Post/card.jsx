import React from "react";
import { useEffect, useState } from "react";
import Like from "./like.jsx";
import ModifyPost from "./modify.jsx";
import DeletePost from "./delete.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

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
    const [showModify, setShowModify] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [showGestion, setShowGestion] = useState(false);



    function modifyToggle() {
        const userId = localStorage.getItem("userId");
        if (post.userId === userId) {
            setShowModify(true)
        } else {
            setShowModify(false)
        }
    }

    function deleteToggle() {
        const userId = localStorage.getItem("userId");
        if (post.userId === userId) {
            setDeleted(true)
        } else {
            setDeleted(false)
        }
    }

    function showingGestion(post) {
        const userId = localStorage.getItem("userId");
        if (post.userId === userId) {
            setShowGestion(true)
        } else {
            setShowGestion(false)
        }
    }

    useEffect(() => {
        post && setIsLoading(false)
        showingGestion(post)
    }, [post]);

    return (
        <div className="cardContainer" key={post._id}> 
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
                        {showGestion ? (
                            <div className="postGestion">
                                <FontAwesomeIcon icon={faPenToSquare} className="modifyBtn btn-action" onClick={modifyToggle} />
                                    { showModify ? <ModifyPost post={post} /> : null }
                                <FontAwesomeIcon icon={faTrash} className="deleteToggle btn-action" onClick={deleteToggle} />
                                    { deleted ? <DeletePost post={post} /> : null }
                            </div>
                        ) : null }
                        

                    </div>
                </div>
             )}
            
        </div>
    )
}

export default Card;
