import React from 'react';
import './index.css';
import logo from '../../assets/logo.svg';
import Logout from '../../components/Auth/LogoutPage.jsx';
import PostPage from '../../components/Post/postPage.jsx';

const Posts = () => {
    
    return (
        <div >
            <header>
                <img src={logo} alt="Groupomania logo" className='logo' />
                <Logout />
            </header>
            
            <PostPage />
        </div>
    );
};

export default Posts