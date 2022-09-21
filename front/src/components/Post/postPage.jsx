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
        <div>
            <h2>Pages de Posts : index</h2>
            <ul>
                <li onClick={switchPart} id="getPart" >Fil d'actualité</li>
                { userView ? <li onClick={switchPart} id="createPart" >Créer un post</li> : null }
                
            </ul>
            { getBool && <GetPosts /> }
            { createBool && <CreatePost /> }
        </div>
    );
}

export default PostPage;