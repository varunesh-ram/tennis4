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

        if (player1Score === 0 && player2Score <= Constants.MAX_LOOKUP_INDEX)
            return this.getScoreFromLookUp();
        if (player1Score <= Constants.MAX_LOOKUP_INDEX && player2Score === 0)
            return this.getScoreFromLookUp();
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