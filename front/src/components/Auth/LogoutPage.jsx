import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';

const Logout = () => {
    const navigate = useNavigate();

    function redirect() {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
        })
        .then(() => {
            localStorage.clear();
            navigate('/');
        })
        .catch(err => alert('Une erreur est survenue : ' + err))
    }
    return (
        <div onClick={redirect} className="logout-wrapper">
            <p>Logout</p>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className='logout-icon' />
        </div>
    );
};

export default Logout;