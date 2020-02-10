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
            },
            isGameOver: false
        }
    }

    incrementScore = player => {
        this.setState((prevState) => (
            player === prevState.player1.name ? {
                player1: { ...prevState.player1, score: prevState.player1.score + 1 }
            } : {
                    player2: { ...prevState.player2, score: prevState.player2.score + 1 }
                }));
    }

    notifyGameOver = () => {
        this.setState((prevState, props) => ({
            isGameOver: !prevState.isGameOver
        }));
    }

    render() {
        const { player1, player2 } = this.state;
        return (
            <div>
                <div className="playerContainer">
                    <div className="leftContainer">
                        <Player name={player1.name} onUpdateScore={this.incrementScore} isGameOver={this.state.isGameOver} />
                    </div>
                    <Player name={player2.name} onUpdateScore={this.incrementScore} isGameOver={this.state.isGameOver} />
                </div>
                <Scorer player1Score={player1.score} player2Score={player2.score} onGameOver={this.notifyGameOver} />
            </div>);
    }
}