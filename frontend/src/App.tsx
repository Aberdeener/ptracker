import React from 'react';
import {Routes, Route, Link, Navigate} from 'react-router-dom';

import Login from './components/Login/Login';
import Homepage from "./components/Homepage"
import GoogleButton from "react-google-button";

import LoginSuccess from "./app/containers/LoginSuccess";
import axios from "axios";

function App() {

    const fetchAuthUser = async () => {
        const response = await axios.get('http://localhost:9000/user', { withCredentials: true })
            .catch(error => console.log(error));

        console.log('getting user', response);
        if (response && response.data) {
            console.log(response.data);
        }
    }

    const redirectToGoogleSSO = async () => {
        let timer: NodeJS.Timer | null = null;
        const googleLoginURL = 'http://localhost:9000/auth/google';
        const newWindow = window.open(googleLoginURL, '_blank', 'width=500,height=600');

        if (newWindow) {
            timer = setInterval(() => {
                if (newWindow.closed) {
                    if (timer) {
                        clearInterval(timer);
                    }
                    fetchAuthUser();
                    window.location.reload();
                }
            }, 500);
        }
    }

    return (
        <div className="App">

            <Routes>
                <Route path="/" element={<Homepage />}/>
                <Route path="/login" element={
                    <GoogleButton onClick={redirectToGoogleSSO}/>
                }/>
                <Route path="/login/error" element={
                    <p>error logging in!</p>
                }/>
                <Route path="/login/success" element={
                    <Navigate to={"/"} />
                }/>
                <Route path="/logout" element={
                    <Navigate to={"/login"} />
                }/>
                <Route path="/calendar" element={
                    <h1>Hi there</h1>
                }/>
            </Routes>

        </div>
    );
}

export default App;
