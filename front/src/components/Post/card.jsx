import React from "react";
import { useEffect, useState } from "react";
import Like from "./like.jsx";
import ModifyPost from "./modify.jsx";
import DeletePost from "./delete.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

//choix du format de l'affichage de la date, puis on parse num et on recupère la date au bon format avec la bonne timezone
function dateParser(num) {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
    
      let timestamp = Date.parse(num);
      let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
      return date.toString();
}

const Card = ({ post, role }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showModify, setShowModify] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [showGestion, setShowGestion] = useState(false);
    const [userView, setUserView] = useState(true);

    

    function modifyToggle() {
        const userId = localStorage.getItem("userId");
        if (post.userId === userId || role === "admin") {
            if (showModify === true) {
                setShowModify(false)
            } else 
                setShowModify(true)
            
        } else {
            setShowModify(false)
        }
    }

    function deleteToggle() {
        const userId = localStorage.getItem("userId");
        if (post.userId === userId || role === "admin") {
            setDeleted(true)
        } else {
            setDeleted(false)
        }
    }

    function isUserAdmin() {
        if (role === "admin") {
            setUserView(false)
        }
    }

    function showingGestion(post) {
        const userId = localStorage.getItem("userId");
        if (post.userId === userId || role === "admin") {
            setShowGestion(true)
        } else {
            setShowGestion(false)
        }
    }

    useEffect(() => {
        post && setIsLoading(false)
        showingGestion(post)
        isUserAdmin()
    }, [post])

    return (
        <div className="card-wrapper" key={post._id}> 
            {isLoading ? ( 
                <i className="fas fa-spinner fa-spin"></i>
                ) : (
                <div className="card">
                    <div className='cardHeader'>
                        <p className='postName'>{post.userName}</p>
                        <p className='date'>{dateParser(post.date)}</p>
                    </div>
                    <div className="postContent-wrapper">
                        {post.text ? (<h3 className="card-text">{post.text}</h3>) : null}
                        {post.imageUrl ? (<img className="card-image" src={post.imageUrl} alt={post.imageUrl} />) : null}
                    </div>
                    <div className="postAction">
                        { userView ? <Like post={post} /> : null}
                        {showGestion ? (
                            <div className="postGestion-wrapper">
                                <FontAwesomeIcon icon={faPenToSquare} className="modifyBtn action-btn" onClick={modifyToggle}/>
                                    { showModify ? <ModifyPost post={post} /> : null }
                                <FontAwesomeIcon icon={faTrash} className="deleteToggle action-btn" onClick={deleteToggle} />
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
