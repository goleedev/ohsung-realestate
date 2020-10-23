import React from 'react'
import { authService } from "fbase";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Navigation from 'components/Navigation';
import './Admin.css';

const Admin = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    return (
        <>
            <Navigation />
            <div className="admin container row">
                <h3 className="col-12">
                    <FontAwesomeIcon icon={faUserCog} /> ADMIN
                </h3>
                <span className="col-12 logout" onClick={onLogOutClick}>
                    Log Out
                </span>
                <div className="admin-box col-md-6">
                    <Link to="/login/upload">
                        <h4>매물 업로드</h4>
                    </Link>
                </div>
                <div className="admin-box col-md-6">
                    <Link to="/login/manage">
                        <h4>매물 관리</h4>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Admin
