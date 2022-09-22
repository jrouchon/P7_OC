import React from 'react';
import './index.css';


import Logout from '../../components/Auth/LogoutPage.jsx';
import PostPage from '../../components/Post/postPage.jsx';

const Posts = () => {
    
    return (
        <div >
            <header>
                <div className="logo-container">
                    <p>logo groupomania</p>
                </div>
                <Logout />
                <p> ^ je suis un header </p>
            </header>
            <PostPage />
        </div>
    );
};

export default Posts