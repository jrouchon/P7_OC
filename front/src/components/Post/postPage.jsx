import React from "react";
import GetPosts from '../../components/Post/getPosts.jsx';
import CreatePost from '../../components/Post/createPost.jsx';
import { useState } from 'react';

const PostPage = () => {
    const [getBool, updateGetBool] = useState(true);
    const [createBool, updateCreateBool] = useState(false);

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
                <li onClick={switchPart} id="createPart" >Créer un post</li>
            </ul>
            { getBool && <GetPosts /> }
            { createBool && <CreatePost /> }
        </div>
    );
}

export default PostPage;