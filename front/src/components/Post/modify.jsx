import React from "react";
import { useState } from 'react';
import axios from "axios";

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
        newFormData.append("imageUrl", file);
        newFormData.set("text", text);
        console.log("text :", text);
        console.log("file name :", file);
        modifyPost(post._id, newFormData, token)
            .then(
                setStatusMessage("Publication modifiée !"),
                setTimeout(() => {
                    document.location.reload()
                }, 2000)
            )
            .catch(
                setStatusMessage("Modification échouée : vous n'êtes pas le propriétaire de ce post."),
                setTimeout(() => {
                    setStatusMessage(" ");
                }, 2000)
            );
    }

    return (
        <div>
            <form id="modifyingPost" encType="multipart/form-data" >
                <label htmlFor="newText">Nouveau text: </label>
                <input type="text" onChange={(e) => setText(e.target.value)} />
                <label htmlFor="newImage" className='modifiedImage'>Nouvelle image :</label>
                <input type="file" name="image" onChange={(e) => setFile(e.target.files[0].name)} />
                <button type="submit" id="submit" onClick={(e) => { e.preventDefault(); handleSubmit()}}>
                    envoyer
                </button>
                <p className="modif-message" style={{fontSize: "15px", color: "blue", borderRadius: "5px", boxShadow: "0px 0px 20px 3px blue"}}>{statusMessage}</p>
            </form>

        </div>
    );
};

export default ModifyPost;