import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";


import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';

// 파라미터로 props 전달 
function AppRouter({ isLoggedIn, userObj }) {
    return (
       <Router>
           {/* isLoggedIn이 True 면 Navigation 이 존재.  */}
           {isLoggedIn && <Navigation />}
           <Switch>
            {isLoggedIn ? (
            <>
                <Route exact path="/">
                    <Home userObj={userObj} />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Redirect from="*" to="/" />
            </> 
            ): ( 
            <>
                <Route exact path="/">
                    <Auth />   
                </Route>
                <Redirect from="*" to="/" />
            </>
            )}
           </Switch>
       </Router>
    )
}

export default AppRouter

