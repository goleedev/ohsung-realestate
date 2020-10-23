import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { authService, firebaseInstance } from 'fbase';
import Navigation from "components/Navigation";
import './Auth.css';

const Auth = ({ isLoggedIn }) => {

    const onSocialClick = async (event) => {
        const { target: { name }, } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        await authService.signInWithPopup(provider);
    };
    return (
        <>
        <div className="container">
            <Navigation /> 
            <div className="login">
                <h3>
                    <FontAwesomeIcon icon={faUserCog} /> ADMIN
                </h3>
                <button onClick={onSocialClick} name="google" className="btn btn-lg">
                    Google로 로그인 <FontAwesomeIcon icon={faGoogle} />
                </button>
            </div>
        </div>
        </>
    );
};

export default Auth;
