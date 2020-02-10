import React from 'react';
import { Constants } from '../constants/Constants';
import PropTypes from 'prop-types';

export default class Scorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { scoreText: Constants.INITIAL_SCORE };
    }

    componentDidUpdate(prevProps) {
        if (this.isPropsChanged(prevProps))
            this.setState({ scoreText: this.updateScore() });
    }

    isPropsChanged = (prevProps) => {
        return prevProps.player1Score !== this.props.player1Score || prevProps.player2Score !== this.props.player2Score;
    }

    updateScore = () => {
        const { player1Score, player2Score } = this.props;

        if (player1Score !== player2Score) {
            if (player1Score > Constants.MAX_LOOKUP_INDEX) {
                if (player1Score - player2Score === 1)
                    return Constants.ADVANTAGE_PLAYER1;
            }
            if (player2Score > Constants.MAX_LOOKUP_INDEX) {
                if (player2Score - player1Score === 1)
                    return Constants.ADVANTAGE_PLAYER2;
            }
            if (player1Score <= Constants.MAX_LOOKUP_INDEX && player2Score <= Constants.MAX_LOOKUP_INDEX)
                return this.getScoreFromLookUp();
        }
        if (player1Score === player2Score) {
            if (this.isDeuce()) {
                return Constants.DEUCE;
            }
            return this.getAllScoreFromLookUp();
        }
    }

    isDeuce = () => {
        return this.props.player1Score >= Constants.MAX_LOOKUP_INDEX;
    }

    getAllScoreFromLookUp = () => {
        return Constants.SCORE_LOOKUP[this.props.player1Score] + Constants.ALL;
    }

    getScoreFromLookUp = () => {
        return Constants.SCORE_LOOKUP[this.props.player1Score] +
            Constants.COMMA + Constants.SCORE_LOOKUP[this.props.player2Score];
    }

    render() {
        return (
            <div>
                <h5>{Constants.SCORER_HEADER}</h5>
                <label>{this.state.scoreText}</label>
            </div>
        );
    }
}

Scorer.propTypes = {
    player1Score: PropTypes.number.isRequired,
    player2Score: PropTypes.number.isRequired
}