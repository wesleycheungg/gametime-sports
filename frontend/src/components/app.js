import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

// Components
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container'; 
import HomeContainer from './home/home_container';
// import SplashForm from './splash/splash_form';
// import ProfileContainer from './profile/profile_container';
// import ShowGameContainer from './games/show_game_container';

import './reset.css'
import './home/home.css'
import './session/login_form.css';
import './session/signup_form.css';
import '../components/gameCard/gameCard.css';
import './bets/bet_modal.css'
// import './splash/splash.css'
// import './nav/navbar.css'
// import './profile/profile.css'
// import './games/game_index_item.css'
// import './games/show_game.css'
// import './comments/comments.css'
// import './toast/toast.css'
// import './scroll_bar/scroll_bar.css'

// import './games/games_list.css'

import { fetchUser } from '../util/session_api_util';
// import './tutorial/tutorial.css'


const App = () => (
  <div>
    <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        {/* <ProtectedRoute exact path="/game/show/:id" component={ShowGameContainer} /> */}
        {/* <ProtectedRoute exact path="/profile" component={ProfileContainer} /> */}
        <ProtectedRoute exact path="/home" component={HomeContainer} />
        {/* <Route path="/" component={SplashForm} /> */}
        
        
    </Switch>
  </div>
);

export default App;