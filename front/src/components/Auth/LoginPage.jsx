import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector('.emailError');
    const passwordError = document.querySelector('.passwordError');
    
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
        if (res.status === 200) {
          // delete res.config.adapter.data; //besoin de supprimer les informations de connexion ?
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.name);
          //console.log("res", res);
          navigate('/posts');
          
        } else {
          emailError.innerHTML = "Identifiants incorrects";
          passwordError.innerHTML = "Identifiants incorrects";
        }
      })
      .catch((err) => {
        emailError.innerHTML = "Identifiants incorrects " + err; //enlever les err 
        passwordError.innerHTML = "Identifiants incorrects " + err; //enlever les err 
      })
  };

  return(
    <form action="" onSubmit={handleLogin} id="login-form">
      <div>
      <label htmlFor="email" >Email</label>
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required={true}
      />
      </div>
      <div className="emailError"></div>
      <div>
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required={true}
      />
      </div>
      <div className="passwordError"></div>
      <input  type="submit" value="Se connecter" />
    </form>
  );
}

export default LoginPage;