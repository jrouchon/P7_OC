import React from "react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons"



const CreatePost = () => {
    const [file, setFile] = useState("");
    const statusMessage = document.querySelector(".statusMessage");

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");

        const myForm = document.getElementById("form");
        const formData = new FormData(myForm);
        formData.set("name", name);
        if(file !== null)
            formData.append("imageUrl", file);
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/posts`,
            withCredentials: false,
            data: formData,
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data",
            },
          })

          .then(() => {
            setTimeout(() => {
                statusMessage.innerHTML = "Post créé !"
              }, 1000);
              setTimeout(() => { window.location.reload(); }, 2000)
            })

          .catch((err) => {
            statusMessage.innerHTML = `Une erreur est survenue : ${err}`;
          });
    }

    return (
        <div>
            <h2>Pages de Posts : création </h2>
            
            <form action="" id="form" onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label htmlFor="text" className="labelText"> Votre texte :</label>
                    <textarea rows="4" name="text" id="text" maxLength= "500" />
                    <label htmlFor="image" className="labelImage"> Votre image : <FontAwesomeIcon icon={faImage}/>
                    <input
                        type="file"
                        src=""
                        alt=""
                        name="image"
                        id="image"
                        onChange={(e) => setFile(e.target.files[0].name)}
                    />
                    </label>
   
                </div>
                <input className="form-btn" type="submit" value="publier" />
                <div className="statusMessage"></div>
         </form>
        </div>
    );
}

export default CreatePost;