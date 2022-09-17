import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div onClick={redirect}>
            <p>Logout + logo</p>
        </div>
    );
};

export default Logout;