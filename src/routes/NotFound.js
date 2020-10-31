import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import './NotFound.css';
    
const NotFound = () => {
    return (
        <>           
        <div className="container not-found">
            <div className="row">
                <div className="error-template">
                    <h1 data-aos="flip-down">
                        Oops!
                    </h1>
                    <h2>
                        404 Not Found
                    </h2>
                    <div className="error-details">
                        해당 페이지를 찾을 수 없습니다.<br/> 
                        웹 주소가 올바른지 확인하거나 다른 링크를 사용해 원하는 페이지로 이동해 보세요.
                    </div>
                    <div className="error-actions">
                        <Link to="/" className="btn btn-lg">
                            <FontAwesomeIcon icon={faUndo} color={"#0275d8"} size="1x" /> 돌아가기
                        </Link>
                        <Link to="/contact" className="btn btn-default btn-lg">
                            <FontAwesomeIcon icon={faEnvelopeOpenText} color={"#0275d8"} size="1x" /> 문의하기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default NotFound;
