import React, { useState } from "react";
import axios from "axios";


const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = (e) => {
    let signUpStatus = document.querySelector(".signup-status");
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
      withCredentials: false,
      data: {
        name: name,
        email: email,
        password: password,
      },
    })
      .then(() => {
        signUpStatus.textContent =
          "Inscription réussie ! Essayez de vous connecter !";
      })
      .catch(
        (err) =>
          (signUpStatus.textContent = `Oups ! Une erreur est survenue : ${err}`)
      );
  };

    return(
    <form action="" onSubmit={handleSignup} id="login-form">
        <div>
            <label for="name" >Nom d'utilisateur</label>
            <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required={true}
            />
        
        </div>
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
        <div>
            <label for="password" >Mot de passe</label>
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required={true}
            />
        
        </div>
        <input  type="submit" value="S'inscrire" />
        <div className="signup-status"></div>
    </form>
    );
}

export default SignUpPage;