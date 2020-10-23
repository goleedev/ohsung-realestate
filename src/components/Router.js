import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../routes/Home';
import About from 'routes/About';
import Contact from 'routes/Contact';
import Youtube from 'routes/Youtube';
import Search from 'routes/Search';
import Manage from 'routes/Manage';
import Upload from 'routes/Upload';
import Auth from 'routes/Auth';
import NotFound from 'routes/NotFound';
import Footer from './Footer';
import Admin from 'routes/Admin';

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <>
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/youtube" component={Youtube}/>
                <Route exact path="/search" component={Search}/>
                <Route exact path="/contact" component={Contact}/>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/login">
                            <Admin userObj={userObj}/>
                        </Route>    
                        <Route exact path="/login/manage">
                            <Manage userObj={userObj}/>        
                        </Route>
                        <Route exact path="/login/upload">
                            <Upload userObj={userObj}/>
                        </Route>     
                    </>        
                ) : (  
                    <Route exact path="/login" component={Auth} />
                )}
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </Router>
        </>
    )
}

export default AppRouter;
