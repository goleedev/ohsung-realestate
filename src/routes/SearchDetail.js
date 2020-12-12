import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft,faWonSign, faMapMarkerAlt, faBuilding, faLayerGroup, faHome, faStore, faSnowplow, faIndustry, faHouseUser, faPhoneSquareAlt, faObjectGroup } from "@fortawesome/free-solid-svg-icons";
import Linkify from 'react-linkify';
import Navigation from 'components/Navigation';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import Loading from 'components/Loading';
import downPic from '../images/down.png';
import soldPic from '../images/sold.png';
import './SearchDetail.css';

const SearchDetail = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();
    const data = props.history.location.state;
    useEffect(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
        <Navigation/>
        { isLoaded
        ? 
        <>        
        <div data-aos="fade-up" key={data.id} className="container">
            <p className="detail-goback" onClick={() => history.goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} /> 뒤로가기
            </p>
            <h3 className="detail-number col-lg-12">매물번호-{data.number}</h3>
            <h1 className="detail-title col-lg-12">{data.title}</h1>
            { data.down && <img src={downPic} className="detail-down" />}
            { data.sold === "완료" && <img src={soldPic} className="detail-sold" alt="sold" /> }
            <div className="detail-container">
                <div className="detail-full-img">
                    <div className="detail-list row">
                        <span className="detail-type col-lg-3">
                            { data.type === "주택"
                            ? <FontAwesomeIcon icon={faHome} /> 
                            : data.type === "상가건물"
                            ? <FontAwesomeIcon icon={faStore} /> 
                            : data.type === "토지"
                            ? <FontAwesomeIcon icon={faSnowplow} />    
                            : data.type === "공장창고"
                            ? <FontAwesomeIcon icon={faIndustry} />    
                            : data.type === "전원주택"
                            ? <FontAwesomeIcon icon={faHouseUser} />    
                            : data.type === "아파트"
                            ? <FontAwesomeIcon icon={faBuilding} /> 
                            : "Error"                                                                                
                        } {data.type}</span>
                        <span className="detail-structure col-lg-4">
                            { data.structure === "문의"
                            ? <FontAwesomeIcon icon={faPhoneSquareAlt} />
                            : <FontAwesomeIcon icon={faObjectGroup} />} {data.structure}
                        </span>
                        <span className="detail-size upload-size col-lg-5">
                            <FontAwesomeIcon icon={faLayerGroup} /> {data.size}
                        </span>
                    </div>
                    <img className="detail-img" src={data.attachmentUrl} alt="product-pic"/>
                </div>
                <div className="detail-content-bottom row">
                    <p className="detail-won col-lg-12">
                        <span className="col-lg-12"><FontAwesomeIcon icon={faWonSign} /> 금액</span>
                        <span className="col-lg-12">{data.price}</span>          
                    </p>
                    <p className="detail-location col-lg-12">
                        <span className="col-lg-12"><FontAwesomeIcon icon={faMapMarkerAlt} /> 주소</span>
                        <span className="col-lg-12">{data.region}</span>          
                    </p>
                    <p className="detail-item col-lg-12">추가설명</p>
                    <p className="detail-content col-lg-12">
                        <Linkify>{data.content}</Linkify>                
                    </p>
                </div>
            </div>
        </div>
        </>
        : <Loading />}
        <FooterLink/>
        <Footer/>        
        </>    
    );
};

export default SearchDetail;