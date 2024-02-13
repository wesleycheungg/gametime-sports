import React from 'react';
import GameCard from './gameCard';



class GameCards extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount () { 
        this.props.fetchAllGames()                  
    }

    render () {
        const games = this.props.games
        const sortedGames = games.sort(function(a, b) {
            let keyA = new Date(a.start_time)
            let keyB = new Date(b.start_time);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
            });

        return (
            <div className="outer-grid">
                { sortedGames.map(game => {
                  if (game.home_score === -1){
                    return null
                  } else {
                    // return <GameCard clearBetErrors={this.props.clearBetErrors} game={game} key={game._id} />
                    return <GameCard game={game} key={game._id} />
                  }
                })}
            </div>
        )
    }
}

export default GameCards;