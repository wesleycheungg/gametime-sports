import { connect } from 'react-redux';
// import { getGames } from '../../actions/game_actions';
import { logout, fetchUser } from '../../actions/session_actions';
// import { getBets } from '../../actions/bet_actions'

import Home from './home';


const mSTP = state => ({
  loggedIn: state.session.isAuthenticated,
  userId: state.session.user._id
});

const mDTP = dispatch => ({
    // fetchAllGames: () => dispatch(getGames()),
    logout: () => dispatch(logout()),
    // getBets: (userId) => dispatch(getBets(userId)),
    // fetchUser: (userId) => dispatch(fetchUser(userId))
  });

export default connect(mSTP, mDTP)(Home);