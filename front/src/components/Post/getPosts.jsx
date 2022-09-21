import React from "react";
import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import Card from "./card.jsx"

function fetchPost(token) {
    return new Promise((resolve) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}api/posts`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => res.data)
          .then(resolve)
          .catch(console.error)
      });
}

const GetPosts = () => {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("token");
    //console.log("token", token);
    if(!token) {
      window.location = "/";
    }
    const location = useLocation();
    const role = location.state;
    //console.log("role getpost :", role);
    //console.log("role location.state :", location.state);

    useEffect(() => {
        fetchPost(token)
        .then((res) => setPosts(res))

      }, [token])

    return (
        <div id="postsContainer">
            <h2>Pages de Posts : fil </h2>
            <div>
                {posts.reverse().map((post) => {
                    return (
                    <Card post={post} key={post._id} role={role} />
                    )
                })}
            </div>
        </div>
    );
}

export default GetPosts;