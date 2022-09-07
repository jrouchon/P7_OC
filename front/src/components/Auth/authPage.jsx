import React from "react";
import { useState } from 'react';
import LoginPage from "./LoginPage.jsx";
import SignUpPage from "./SignUpPage.jsx";

//Login = classe(schema pour faire objet de type Login)
const Login = () => { 
    //state signBool avec updateSignBool comme méthode = state par defaut set à true
    const [signBool, updateSignBool] = useState(true);
    const [logBool, updateLogBool] = useState(false);

    //lambda qui écoute un event et set le booleen au besoin
    const switchPart = (e) => { 
        if(e.target.id === "signUpPart") {
            updateSignBool(true);
            updateLogBool(false);
        } else if (e.target.id === "loginPart") {
            updateSignBool(false);
            updateLogBool(true);
        }
    }

    return (
        <div>
            <ul>
                <li onClick={switchPart} id="signUpPart" >S'inscrire</li>
                <li onClick={switchPart} id="loginPart" >Se connecter</li>
            </ul>
            { logBool && <LoginPage /> }
            { signBool && <SignUpPage /> }
        </div>
    );
}

export default Login;