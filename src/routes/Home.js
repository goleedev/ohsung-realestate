import React from 'react';
import Header from 'components/Header';
import ProductCards from 'components/ProductCards';
import ProductRecommend from 'components/ProductRecommend';
import FooterLink from 'components/FooterLink';
import Navigation from 'components/Navigation';
import YoutubeCards from 'components/YoutubeCards';
import './Home.css'
import Footer from 'components/Footer';

const Home = ({isLoggedIn}) => {
    return (
        <div className="home">
            <div className="header-top">
                <Navigation isLoggedIn={isLoggedIn}/>
                <Header />
            </div>
            <ProductCards />
            <ProductRecommend />
            <YoutubeCards />
            <FooterLink />
            <Footer />
        </div>
    )
}

export default Home;
