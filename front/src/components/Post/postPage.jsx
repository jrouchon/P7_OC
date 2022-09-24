import React from "react";
import GetPosts from '../../components/Post/getPosts.jsx';
import CreatePost from '../../components/Post/createPost.jsx';
import { useEffect,useState } from 'react';
import {useLocation} from 'react-router-dom';

const PostPage = () => {
    const [getBool, updateGetBool] = useState(true);
    const [createBool, updateCreateBool] = useState(false);
    const [userView, setUserView] = useState(true);
    const location = useLocation();
    const role = location.state;

    function isUserAdmin(role) {
        if (role === "admin") {
            setUserView(false)
        }
    }

    useEffect(() => {
        isUserAdmin(role)
    }, [role])

    const switchPart = (e) => { 
        if(e.target.id === "getPart") {
            updateGetBool(true);
            updateCreateBool(false);
        } else if (e.target.id === "createPart") {
            updateGetBool(false);
            updateCreateBool(true);
        }
    }

    return (
        <div className="postsPage-wrapper">
            <ul>
                <li onClick={switchPart} id="getPart" className={(getBool ? "postsPage-btn postsPage-btn-on" : "postsPage-btn postsPage-btn-off")}>Fil d'actualité</li>
                { userView ? <li onClick={switchPart} id="createPart" className={(createBool ? "postsPage-btn postsPage-btn-on" : "postsPage-btn postsPage-btn-off")}>Créer un post</li> : null }
                
            </ul>
            { getBool && <GetPosts /> }
            { createBool && <CreatePost /> }
        </div>
    );
}

export default PostPage;