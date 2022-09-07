import React from "react";

const SignUpPage = () => {

    return(
    <form action="" id="login-form">
        <div>
            <label for="name" >Nom d'utilisateur</label>
            <input
                type="text"
                name="name"
                id="name"
            />
        
        </div>
        <div>
            <label for="email" >Email</label>
            <input
                type="text"
                name="email"
                id="email"
            />
        
        </div>
        <div>
            <label for="password" >Mot de passe</label>
            <input
                type="password"
                name="password"
                id="password"
            />
        
        </div>
        <input  type="submit" value="S'inscrire" />
    </form>
    );
}

export default SignUpPage;