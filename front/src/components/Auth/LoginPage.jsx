import React from "react";

const LoginPage = () => {

    return(
<form action="" id="login-form">
      <div>
      <label for="email" >Email</label>
        <input
          type="text"
          name="email"
          id="email"
        />
        
      </div>
      <div>
      <label for="password">Mot de passe</label>
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

export default LoginPage;