import React from "react";

const SignUpPage = () => {

    return(
    <form action="" id="login-form">
        <div>
            <label>Nom d'utilisateur</label>
            <input
                type="text"
                name="name"
                id="name"
            />
        
        </div>
        <div>
            <label>Email</label>
            <input
                type="text"
                name="email"
                id="email"
            />
        
        </div>
        <div>
            <label>Mot de passe</label>
            <input
                type="password"
                name="password"
                id="password"
            />
        
        </div>
        <input  type="submit" value="Se connecter" />
    </form>
    );
}

export default SignUpPage;