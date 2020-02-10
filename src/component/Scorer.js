import React from 'react';
import { Constants } from '../constants/Constants';
import PropTypes from 'prop-types';

export default class Scorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { scoreText: Constants.INITIAL_SCORE };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.player1Score !== this.props.player1Score)
            this.setState({ scoreText: this.updateScore() });
    }

    updateScore = () => {
        if (this.props.player1Score === 1)
            return Constants.PLAYER1_SCORED_ONCE;
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
    player1Score: PropTypes.number.isRequired
}
