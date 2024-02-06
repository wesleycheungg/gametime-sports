import React from 'react';
import { Link } from 'react-router-dom';

import nba_logo from '../../images/nba-logo.png';

// import BetModalContainer from '../bet_modal/bet_modal_container';
// import TutorialContainer from '../tutorial/tutorial_container';


class GameCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            helpModalOpen: false, 
        }

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(e){
        e.preventDefault();
        // this.setState({modalOpen: false});
        // this.props.clearBetErrors();
    }


    render() {
        let game = this.props.game;

        // let h_odds;
        // let a_odds;
        // if(game.home_odds > 0){
        //     h_odds = "+" + game.home_odds ;
        // } else {
        //     h_odds = game.home_odds;
        // }
        // if(game.away_odds > 0){
        //     a_odds = "+" + game.away_odds;
        // } else {
        //     a_odds = game.away_odds;
        // }

        // let betLocked
        // if (game.away_score > 0 || game.home_score > 0){
        //     betLocked = <button className="game-bet-btn-locked">Bets Locked!</button>
        // } else {
        //     betLocked = <button className="game-bet-btn" onClick={() => this.setState({modalOpen: true})}>Place Bet</button>
        // }

        console.log(game)

        let status = ""
        if(game.status.long === "Finished"){
            status = "Final"
        } else {
            status = "Live"
        }

        return (
                <div className="game-card-container">
                    <div className="game">

                        <div className="game-header">
                            {/* <button className="game-alert-bt" onClick={() => this.setState({helpModalOpen: true})}>Help</button> */}
                            <div className="nba-game-logo">
                                <img src={nba_logo}></img>
                                National Basketball League
                            </div>
                            {/* <Link to={`/game/show/${game._id}`}><button className="game-log-btn">View Game Log</button></Link> */}
                        </div>
                        
                        <div className="game-content">
                            <div className="column">
                                <div className="team team--away">
                                    <div className="team-logo">
                                        {game.away_team.logo}
                                    </div>
                                    <p className="team-away-home">AWAY</p>
                                    <h2 className="game-team-name">{game.away_team.name}</h2>
                                    {/* <button className="game-bet-odds">{a_odds}</button> */}
                                </div>
                            </div>

                            <div className="column">
                                <div className="game-details">
                                    <div className="game-period">
                                        <strong>{game.start_time}</strong>
                                    </div>
                                    <div className="game-period">{game.status.clock}</div>
                                    <div className="game-score">
                                        <span className="game-score-number game-score-number--leading" >{game.away_score.points}</span>
                                        <span className="game-score-divider">:</span>
                                        <span className="game-score-number">{game.home_score.points}</span>
                                    </div>
                                    {/* <div className={(game.away_score > 0 || game.home_score > 0 ? "game-status": "game-status-hidden")}>Live</div>  */}
                                    <div className={(game.status != "Finished" && (game.away_score > 0 || game.home_score > 0) ? "game-status": "game-status-hidden")}>{status}</div> 
                                    {/* <div className={(game.status === "Final") ? "game-status-final": "game-status-final-hidden"}>Final</div>  */}
                                    {/* <div className="game-bet">
                                        {betLocked}
                                    </div> */}
                                    <div>
                                        
                                    </div>
                                </div>
                            </div>


                            <div className="column">
                                <div className="team team--home">
                                    <div className="team-logo">
                                    {game.home_team.logo}
                                    </div>
                                    <p className="team-away-home">HOME</p>
                                    <h2 className="game-team-name">{game.home_team.name}</h2>
                                    {/* <button className="game-bet-odds">{h_odds}</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <TutorialContainer onClose={() => this.setState({helpModalOpen: false})} modalOpen={this.state.helpModalOpen} home_team={game.home_team} away_team={game.away_team} home_odds={h_odds} away_odds={a_odds}/>
                    <BetModalContainer onClose={this.handleClose} modalOpen={this.state.modalOpen} h_team={game.home_team} a_team={game.away_team} h_odds={h_odds} a_odds={a_odds} game_id={game._id}/> */}
                </div>
        )
    }
}

export default GameCard;