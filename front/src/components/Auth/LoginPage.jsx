import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      withCredentials: false,
      data: {
        email: email,
        password: password,
      },
    })
      
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = "Identifiants incorrects" + res.status;
          passwordError.innerHTML = "Identifiants incorrects" + res.status;
        } else {
          //todo token and all
          console.log("res", res)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return(
    <form action="" onSubmit={handleLogin} id="login-form">
      <div>
      <label for="email" >Email</label>
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required={true}
      />
      </div>
      <div className="email error"></div>
      <div>
      <label for="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required={true}
      />
      </div>
      <div className="password error"></div>
      <input  type="submit" value="Se connecter" />
    </form>
  );
}

export default LoginPage;