import React from "react";
import { useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

function modifyPost(id, data, token) {
    return new Promise((resolve) => {
        axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/posts/${id}`,
            data: data,
            withCredentials: false,
            headers: { Authorization : "Bearer " + token,  "Content-Type": "multipart/form-data" },
            
        })
            .then((res) => {return res})
            .then(resolve)
            .catch(console.error);
      });
}

const ModifyPost = ({ post }) => {
    const token = localStorage.getItem("token");
    const [file, setFile] = useState(post.imageUrl);
    const [text, setText] = useState(post.text);
    const [statusMessage, setStatusMessage] = useState("");

    function handleSubmit() {
        const newFormData = new FormData(document.getElementById("modifyingPost"));
        if(file !== null || text !== null) {
            if(file !== null)
                newFormData.append("imageUrl", file);
            if(text !== null)
                newFormData.set("text", text);

            modifyPost(post._id, newFormData, token)
            .then(() => {
                setStatusMessage("Modification en cours !");
                setTimeout(() => {
                    document.location.reload()
                }, 2000)
            }
            )
            .catch(() => {
                setStatusMessage("Modification échouée : vous n'êtes pas le propriétaire de ce post.")
            }
            );
        } else {
            setStatusMessage("Modification échouée : vous devez mettre au minimum du texte ou une image")
        }
        
    }

    return (
        <div style={{ transition: "all 0.3s", zIndex: "2" }}>
            <form id="modifyingPost" encType="multipart/form-data" className="modify-form">
                <label htmlFor="newText">Nouveau text: </label>
                <textarea rows="2" name="text" id="text" maxLength= "500" onChange={(e) => setText(e.target.value)}/>
                <label htmlFor="newImage" className='modifiedImage'>Nouvelle image : <FontAwesomeIcon icon={faImage} /></label>
                <input type="file" name="image" onChange={(e) => setFile(e.target.files[0].name)} />
                <button type="submit" id="submit" onClick={(e) => { e.preventDefault(); handleSubmit()}}>
                    envoyer
                </button>
                <p className="modif-message" style={{fontSize: "15px"}}>{statusMessage}</p>
            </form>

        </div>
    );
};

export default ModifyPost;