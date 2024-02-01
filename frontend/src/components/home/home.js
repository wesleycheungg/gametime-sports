import React, { useState } from 'react';
import NavBarContainer from '../navbar/navbar_container';
// import GameIndexContainer from '../games/game_index_container';
// import BetModalContainer from '../bet_modal/bet_modal_container';
// import ScrollBarContainer from '../scroll_bar/scroll_bar_container';
// import Toast from '../toast/toast';
// import checkIcon from '../../images/check.svg'
// import checkIcon from '../../images/success.png'



class Home extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        // modalOpen: false,
      }

  }

  render() {
    // var today = new Date();
    //   var dd = String(today.getDate()).padStart(2, '0');
    //   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    //   var yyyy = today.getFullYear();
    //   today = mm.slice(1) + '/' + dd + '/' + yyyy;
    return (
      <div className="main">
        <div className="main-nav">
          <NavBarContainer/>
        </div>
        {/* <div className="scroll-bar-container">
          <ScrollBarContainer />
        </div> */}
        


        <div className="all-games">
            <div>hello world</div>
          {/* <h1 className="main-header">Today's Games</h1>
          <div className="main-header-date">{today}</div> */}
          {/* <button onClick={() => this.setState({modalOpen: true})} className="make-bet">Make Bet</button> */}
          {/* <GameIndexContainer /> */}
          {/* <div className="footer-container">
            <div class="dropup">
              <button class="dropbtn">LinkedIn</button>
              <div class="dropup-content">
                <a href="https://www.linkedin.com/in/cheungwesley/" target="_blank">Wesley Cheung</a>
              </div>
            </div>

            <div class="dropup">
              <button class="dropbtn-github">GitHub</button>
              <div class="dropup-content">
                <a href="https://github.com/wesleycheungg" target="_blank">Wesley Cheung</a>
                <a href="https://github.com/rytmercado/nba-bets" target="_blank">GitHub Project</a>
              </div>
            </div>
          </div> */}
          
          {/* <footer className="main-footer">
            Copyright &copy; 2024 GameTime Sports
          </footer> */}
        </div>
        {/* <BetModalContainer onClose={() => this.setState({modalOpen: false})} modalOpen={this.state.modalOpen} /> */}
      </div>
    );
  }
}

export default Home;
