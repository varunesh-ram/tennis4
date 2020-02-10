import React from 'react';
import Player from './Player';
import Scorer from './Scorer';

export default class TennisGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: {
                name: "Player 1",
                score: 0
            },
            player2: {
                name: "Player 2",
                score: 0
            }
        }
    }

    incrementScore = () => {
        this.setState((prevState) => ({ player1: { ...prevState.player1, score: prevState.player1.score + 1 } }));
    }

    render() {
        const { player1, player2 } = this.state;
        return (
            <div>
                <div className="playerContainer">
                    <div className="leftContainer">
                        <Player name={player1.name} onUpdateScore={this.incrementScore} />
                    </div>
                    <Player name={player2.name} />
                </div>
                <Scorer player1Score={player1.score} />
            </div>);
    }
}