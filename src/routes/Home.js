import React from 'react';
import Header from 'components/Header';
import ProductCards from 'components/ProductCards';
import ProductRecommend from 'components/ProductRecommend';
import FooterLink from 'components/FooterLink';
import Navigation from 'components/Navigation';
import YoutubeCards from 'components/YoutubeCards';
import './Home.css'

const Home = ({isLoggedIn}) => {
    return (
        <div className="home">
            <Navigation isLoggedIn={isLoggedIn}/>
            <Header />
            <ProductCards />
            <ProductRecommend />
            <YoutubeCards />
            <FooterLink />
        </div>
    )
}

export default Home;
