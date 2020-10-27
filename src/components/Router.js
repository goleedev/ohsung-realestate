import React, {Suspense} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import About from 'routes/About';
import Auth from 'routes/Auth';
import Admin from 'routes/Admin';
import Manage from 'routes/Manage';
import Upload from 'routes/Upload';
import YoutubeUpload from 'routes/YoutubeUpload';
import Search from 'routes/Search';
import Youtube from 'routes/Youtube';
import Contact from 'routes/Contact';
import Loading from 'components/Loading';
import NotFound from 'routes/NotFound';

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <>
        <Router>
        <Suspense fallback={<Loading />}>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/youtube" component={Youtube}/>
                <Route exact path="/search">
                    <Search userObj={userObj}/>    
                </Route>
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
                        <Route exact path="/login/youtube">
                            <YoutubeUpload />
                        </Route>     
                    </>        
                ) : (  
                    <Route exact path="/login" component={Auth} />
                )}
                <Route component={NotFound} />
            </Switch>
        </Suspense>
        </Router>
        </>
    )
}

export default AppRouter;
