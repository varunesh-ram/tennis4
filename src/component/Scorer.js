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

        if (player1Score === 0 && player2Score === 3)
            return Constants.PLAYER2_SCORED_THRICE;
        if (player1Score === 0 && player2Score === 2)
            return Constants.PLAYER2_SCORED_TWICE;
        if (player1Score === 0 && player2Score === 1)
            return Constants.PLAYER2_SCORED_ONCE;
        if (player1Score <= Constants.MAX_LOOKUP_INDEX && player2Score === 0)
            return Constants.SCORE_LOOKUP[player1Score] + Constants.COMMA_LOVE;
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