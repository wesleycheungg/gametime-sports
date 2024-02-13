import React from 'react';
import { Link } from 'react-router-dom';

import nba_logo from '../../images/nba-logo.png';

import BetModalContainer from '../bets/bet_modal_container';
// import TutorialContainer from '../tutorial/tutorial_container';


class GameCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            helpModalOpen: false, 
        }

        this.handleClose = this.handleClose.bind(this);
        this.convertGMTtoPST = this.convertGMTtoPST.bind(this);
    }

    handleClose(e){
        e.preventDefault();
        this.setState({modalOpen: false});
        // this.props.clearBetErrors();
    }

    convertGMTtoPST(gmtTime) {
        const date = new Date(gmtTime);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${month}/${day} ${hours}:${minutes} ${ampm}`;
    }

    render() {
        let game = this.props.game;

        let betLocked
        if (game.away_score > 0 || game.home_score > 0){
            betLocked = <button className="game-bet-btn-locked">Bets Locked!</button>
        } else {
            betLocked = <button className="game-bet-btn" onClick={() => this.setState({modalOpen: true})}>Place Bet</button>
        }

        console.log(game)

        let status = game.status.long;
        if (game.status.long === "Finished"){
            status = "Final"
        } else if (game.status.long === "In Play") {
            status = "Live"
        }
        
        let homeScore = game.home_score.points;
        let awayScore = game.away_score.points;
        if (homeScore === null && awayScore === null) {
            homeScore = 0;
            awayScore= 0;
        }

        let homeLogo = game.home_team.logo;
        let awayLogo = game.away_team.logo;

        let homeCode = game.home_team.code;
        let awayCode = game.away_team.code;

        let odds = game.odds;
        let home_spread_odds = game.odds === undefined ? null : odds.markets[1].outcomes[1].price;
        let away_spread_odds = game.odds === undefined ? null : odds.markets[1].outcomes[0].price;

        let gameTime = this.convertGMTtoPST(new Date(game.start_time));

        let gameStartTime = (status === "Live") ?
            null : <div className="game-period">
                <strong>{gameTime}</strong>
            </div>;

        let currentGameQuarter;
        if (game.quarter.current > 0) {
            currentGameQuarter = 'Q' + game.quarter.current + ' ';
        }

        return (
                <div className="game-card-container">
                    <div className="game">
                        <div className="game-header">
                            {/* <button className="game-alert-bt" onClick={() => this.setState({helpModalOpen: true})}>Help</button> */}
                            <div className="nba-game-logo">
                                <img src={nba_logo} className="img-nba" alt="nba-logo-img"/>
                            </div>
                            {/* <Link to={`/game/show/${game._id}`}><button className="game-log-btn">View Game Log</button></Link> */}
                        </div>
                        
                        <div className="game-content">
                            <div className="column">
                                <div className="team team--away">
                                    <div>
                                        <img src={awayLogo} className="team-logo" alt="away-logo"/>
                                    </div>
                                    <p className="team-away-home">AWAY</p>
                                    <h2 className="game-team-name">{awayCode}</h2>
                                    <button className="game-bet-odds">{away_spread_odds}</button>
                                </div>
                            </div>

                            <div className="column">
                                <div className="game-details">
                                    {gameStartTime}
                                    <div className="game-period">{currentGameQuarter}{game.status.clock}</div>
                                    <div className="game-score">
                                        <span className="game-score-number game-score-number--leading" >{awayScore}</span>
                                        <span className="game-score-divider">:</span>
                                        <span className="game-score-number">{homeScore}</span>
                                    </div>
                                    <div className={(awayScore !== 0 || homeScore !== 0 ? "game-status": "game-status-hidden")}>Live</div>
                                    {/* <div className={(game.status.long != "Finished" && (awayScore !=  null || homeScore != null) ? "game-status-hidden" : "game-status")}>{status}</div>  */}
                                    <div className={(status === "Final") ? "game-status-final": "game-status-final-hidden"}>Final</div> 
                                    <div className="game-bet">
                                        {betLocked}
                                    </div>
                                    <div>
                                        
                                    </div>
                                </div>
                            </div>


                            <div className="column">
                                <div className="team team--home">
                                    <div className="team-logo">
                                        <img src={homeLogo} className="team-logo" alt="home-logo"/>
                                    </div>
                                    <p className="team-away-home">HOME</p>
                                    <h2 className="game-team-name">{homeCode}</h2>
                                    <button className="game-bet-odds">{home_spread_odds}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <TutorialContainer onClose={() => this.setState({helpModalOpen: false})} modalOpen={this.state.helpModalOpen} home_team={game.home_team} away_team={game.away_team} home_odds={h_odds} away_odds={a_odds}/> */}
                    <BetModalContainer onClose={this.handleClose} modalOpen={this.state.modalOpen} h_team={homeCode} a_team={awayCode} h_odds={home_spread_odds} a_odds={away_spread_odds} game_id={game._id}/>
                </div>
        )
    }
}

export default GameCard;